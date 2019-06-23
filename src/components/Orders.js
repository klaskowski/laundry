import React from 'react'
import MaterialTable from 'material-table';
import firebase from 'firebase'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

export default ({historyOfOrders = false}) => {
  let databaseRef = firebase.database().ref('orders')
  if(!historyOfOrders) {
    databaseRef = databaseRef.limitToLast(15)
  }
  databaseRef.once("value", snapshot => {
    setState({
      ...state,
      loading: false,
      data: Object.values(snapshot.val()).map(entry => ({
        ...entry,
        fullName: `${entry.orderingUser.name} ${entry.orderingUser.surname}`,
        price: entry.items.reduce((sum, item) => {
          return sum + item.initialPrice * item.quantity// + item.packing.price
        }, 0),
        promoCode: entry.promoCode.code || '-'
      }))
    })
  })

  const [state, setState] = React.useState({
    loading: true,
    columns: [
      { title: 'ID zamówienia', field: 'orderUUID' },
      { title: 'Imię i nazwisko', field: 'fullName' },
      { title: 'Kwota zamówienia', field: 'price', type: 'numeric' },
      { title: 'Kod promocyjny', field: 'promoCode'},
      { title: 'Status', field: 'status' }
    ],
    data: []
  });

  const classes = useStyles();

  const options = historyOfOrders ? {} : {
    paging: false,
    addRowPosition: "first"
  }

  const title = historyOfOrders ? "Historia zamówień" : "Zamówienia"

  return (
    <React.Fragment>
    {!state.loading && <React.Fragment><MaterialTable
      title={title}
      columns={state.columns}
      data={state.data}
      localization={{
        header: {
            actions: ''
        },
        body: {
            emptyDataSourceMessage: 'Brak zamówień spełniających wybrane kryteria',
            filterRow: {
                filterTooltip: 'Filter'
            },
            editRow: {
              saveTooltip: 'Zapisz',
              cancelTooltip: 'Anuluj'
            }
        },
        toolbar: {
          searchPlaceholder: "Szukaj",
          searchTooltip: "Szukaj",
        }
      }}
      options={options}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Suma zamówień
      </Typography>
      <Typography component="p">{(state.data.reduce((sum, current) => sum += current.price, 0)).toFixed(0)}</Typography>
    </Paper></React.Fragment>}
    {state.loading && <CircularProgress className={classes.progress} />}
    </React.Fragment>
  );
}
