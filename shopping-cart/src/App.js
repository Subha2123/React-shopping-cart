import "./styles.css";

import { Button } from "react-bootstrap";
import { useState } from "react";

export default function App() {
  const [costItem, setCostItem] = useState(0);
  const [stock, setStock] = useState([
    { name: "Jackets", inStock: 5, price: 100 },
    { name: "Pants", inStock: 4, price: 50 },
    { name: "Scarf", inStock: 2, price: 200 },
    { name: "Pajamas", inStock: 5, price: 100 },
    { name: "Shirt", inStock: 6, price: 100 }
  ]);
  const [shopping, setShopping] = useState([
    { name: "Jackets", inStock: 0, price: 100 },
    { name: "Pants", inStock: 0, price: 50 },
    { name: "Scarf", inStock: 0, price: 200 },
    { name: "Pajamas", inStock: 0, price: 100 },
    { name: "Shirt", inStock: 0, price: 100 }
  ]);

  const moveToCart = (e) => {
    let isStock = true;
    let [name, number] = e.target.innerHTML.split(":");
    // console.log(name);

    const newList = stock.map((item, index) => {
      if (item.name === name) {
        if (item.inStock > 0) item.inStock--;
        else {
          isStock = false;
          alert("Oops! the item is out of stock");
        }
      }
      return item;
    });
    console.log(newList);

    const newCart = shopping.map((item, index) => {
      if (item.name === name && isStock) {
        item.inStock++;
        setCostItem(costItem + item.price);
      }
      return item;
    });
    // const cost = [];
    // const total = newCart.map((item, index) => {
    //   const Price = newCart[index].price;
    //   if (item.name === name) item.inStock * Price;
    //   cost.push(item.inStock * Price);
    //   // console.log(cost);

    //   const a = cost[0];
    //   const b = cost[1];
    //   const c = cost[2];
    //   const d = cost[3];
    //   const res = a + b + c + d;
    //   return res;
    // });
    // setStock(newList);
    // setShopping([...shopping]);
  };
  const minusCart = (e) => {
    let isStock = true;
    let [name, number] = e.target.innerHTML.split(":");
    const newCart = shopping.map((item, index) => {
      if (item.name === name && item.inStock > 0) {
        item.inStock--;
        setCostItem(costItem - item.price);
      }
      return item;
    });
    const newList = stock.map((item, index) => {
      if (item.name === name) {
        item.inStock++;
      }
      return item;
    });
  };

  const updatedlist = stock.map((item, index) => (
    <Button key={index} onClick={moveToCart}>
      {item.name}:{item.inStock}
    </Button>
  ));

  const updatedCart = shopping.map((item, index) => (
    <Button key={index} onClick={minusCart}>
      {item.name}:{item.inStock}
    </Button>
  ));

  return (
    <>
      <h1>Let's Shop</h1>
      <h2>Clothing List</h2>
      <ul>{updatedlist}</ul>
      <h2>Shopping Cart</h2>
      <ul>{updatedCart}</ul>
      <h3>
        Bill amount is <button>${costItem}</button>
      </h3>
    </>
  );
}
