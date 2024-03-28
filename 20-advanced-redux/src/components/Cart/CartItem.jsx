import { useDispatch } from "react-redux";

import { cartActions } from "../../store/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const {
    itemId,
    name: title,
    quantity,
    totalPrice: total,
    price,
  } = props.item;

  const dispatch = useDispatch();
  const cartPlusHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: itemId,
        price,
        quantity,
        totalPrice: total,
        name: title,
      })
    );
  };
  const cartMinusHandler = () => {
    dispatch(cartActions.removeItemFromCart(itemId));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={cartMinusHandler}>-</button>
          <button onClick={cartPlusHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
