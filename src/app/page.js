'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([
    { name: 'Coffee', price: 4.96 },
    { name: 'movie', price: 3.6 },
    { name: 'Coffee', price: 4.96 },

  ])

  const [total, setTotal] = useState(0)
  return (
    <div>
      <form action="">
        <input type="text" placeholder="Enter your Expense" />
        <input type="number" placeholder="Enter $" />
        <button type="submit">+</button>
      </form>
      <ul className="flex flex-col">
        {items.map((item,index) => (
          <li key={index} className="flex justify-between w-full">
          <div className="flex p-4 w-full justify-between gap-4">
          <p>{item.name}</p>
            <p>{item.price}</p>
          </div>
          <button className="ml-8 w-16 p-4 bg-slate-600">X</button>
          </li>
        ))}
      </ul>
      {
        items.length < 1 ? ('') : (
          <div>
            <span>Total</span>
            <span>${total}</span>
          </div>
        )
      }
    </div>
  );
}
