import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  buyProduct,
  sellProduct,
  resetPurchases,
  INITIAL_BALANCE,
} from "../../../redux/spendMoneySlice";
import "./SpendMoney.css";

const formatMoney = (amount) =>
  "$" + amount.toLocaleString("en-US");

const SpendMoney = () => {
  const dispatch = useDispatch();
  const { balance, products } = useSelector(
    (state) => state.spendMoney
  );

  const purchasedProducts = products.filter(
    (product) => product.quantity > 0
  );

  const totalSpent = INITIAL_BALANCE - balance;

  return (
    <div className="spend-app">
      <header className="spend-header">
        <div className="spend-avatar">💸</div>
        <h1>Spend Bill Gates' Money</h1>
        <p>
          You have $100 billion. What would you buy?
        </p>
      </header>

      <div className="spend-balance">
        {formatMoney(balance)}
      </div>

      <div className="spend-products">
        {products.map((product) => (
          <div className="spend-product" key={product.id}>
            <div className="spend-product-emoji">
              {product.emoji}
            </div>

            <h3>{product.name}</h3>

            <p className="spend-price">
              {formatMoney(product.price)}
            </p>

            <div className="spend-actions">
              <button
                className="spend-sell"
                disabled={product.quantity === 0}
                onClick={() =>
                  dispatch(sellProduct(product.id))
                }
              >
                Sell
              </button>

              <span className="spend-quantity">
                {product.quantity}
              </span>

              <button
                className="spend-buy"
                disabled={balance < product.price}
                onClick={() =>
                  dispatch(buyProduct(product.id))
                }
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      <section className="spend-receipt">
        <h2>Your Receipt</h2>

        {purchasedProducts.length === 0 ? (
          <p className="spend-empty">
            You haven't purchased anything yet.
          </p>
        ) : (
          <>
            {purchasedProducts.map((product) => (
              <div className="spend-receipt-item" key={product.id}>
                <span>{product.name}</span>
                <span>x{product.quantity}</span>
                <strong>
                  {formatMoney(
                    product.price * product.quantity
                  )}
                </strong>
              </div>
            ))}

            <div className="spend-receipt-total">
              <strong>TOTAL SPENT</strong>
              <strong>{formatMoney(totalSpent)}</strong>
            </div>

            <button
              className="spend-reset"
              onClick={() => dispatch(resetPurchases())}
            >
              Reset Purchases
            </button>
          </>
        )}
      </section>
    </div>
  );
};

export default SpendMoney;