import React from 'react'
import MaterialTable from 'material-table';
import firebase from 'firebase'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import { fetchOrders } from '../actions'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = Math.random() * 16 | 0;
  return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
});

const mapStateToProps = state => ({
  ordersData: state.data.orders || []
})

export default connect(
  mapStateToProps,
  {fetchOrders}
)(({historicalData = false, ordersData, fetchOrders}) => {

  const columns = [
    { title: 'ID zamówienia', field: 'orderUUID' },
    { title: 'Imię i nazwisko', field: 'fullName' },
    { title: 'Kwota zamówienia', field: 'price', type: 'numeric' },
    { title: 'Kod promocyjny', field: 'promoCode'},
    { title: 'Status', field: 'status' }
  ]

  const classes = useStyles();

  fetchOrders();

  const options = historicalData ? {} : {
    paging: false,
    addRowPosition: "first"
  };

  return (
    <React.Fragment>
    {ordersData.length && <React.Fragment><MaterialTable
      title={historicalData ? "Historia zamówień" : "Zamówienia"}
      columns={columns}
      data={historicalData ? ordersData : ordersData.slice(0,15)}
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
        onRowAdd: newData => {
          const uuid = uuidv4()
          return firebase.database().ref(`orders/${uuid}`).set({
            orderUUID: uuid,
            status: newData.status,
            promoCode: newData.promoCode ? {
              code: newData.promoCode
            } : "none",
            items: [{
              initialPrice: Number.parseFloat(newData.price),
              quantity: 1
            }],
            orderingUser: {
              name: newData.fullName.split(" ")[0],
              surname: newData.fullName.split(" ")[1]
            }
          })
        },
        onRowUpdate: (newData, oldData) =>
          {
            firebase.database().ref('orders').push().set({
              status: newData.status,
              promoCode: {
                code: newData.promoCode
              },
              // items: [{
              //   initialPrice: newData.initialPrice
              // }],
              orderingUser: {
                name: newData.fullName.split(" ")[0],
                surname: newData.fullName.split(" ")[1]
              }
            })
          },
        onRowDelete: oldData => {
          debugger
          return firebase.database().ref('orders').remove(oldData.orderUUID)
        }
      }}
    />
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        Suma zamówień
      </Typography>
      <Typography component="p">{(ordersData.reduce((sum, current) => sum += current.price, 0)).toFixed(0)}</Typography>
    </Paper></React.Fragment>}
    {!ordersData.length && <CircularProgress className={classes.progress} />}
    </React.Fragment>
  );
})
