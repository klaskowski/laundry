import { ordersRef } from "../Firebase";
import { FETCH_ORDERS } from "./types";

export const addOrder = newOrder => async dispatch => {
  ordersRef.push().set(newOrder);
};

export const removeOrder = order => async dispatch => {
  ordersRef.child(order).remove();
};

export const fetchOrders = () => async dispatch => {
    ordersRef.once("value", snapshot => {
    dispatch({
      type: FETCH_ORDERS,
      payload: Object.values(snapshot.val()).map(entry => ({
        ...entry,
        fullName: `${entry.orderingUser.name} ${entry.orderingUser.surname}`,
        price: entry.items.reduce((sum, item) => sum + item.initialPrice * item.quantity, 0),
        promoCode: entry.promoCode.code || '-'
      }))
    });
  });
};