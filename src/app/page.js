'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, addDoc, getDoc, QuerySnapshot, query, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([
    // { name: 'Coffee', price: 4.96 },
    // { name: 'movie', price: 3.6 },
    // { name: 'Coffee', price: 4.96 },

  ])

  const [total, setTotal] = useState(0);
  const [newItem, setNewItem] = useState({
    name: '',
    price: ''
  });


  // ADD
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== '' && newItem.price !== '') {
      // setItems([...items, newItem]);
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      })
      setNewItem({ name: '', price: '' })
    }
  }


  // READ
  useEffect(() => {
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let itemsArr = []
      QuerySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id })
      })
      setItems(itemsArr)

      // Total
      const calculatedTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotal(totalPrice)
      }
      calculatedTotal()
      return () => unsubscribe()
    })
  }, [])

  // DELETE
  const deleteItem = async (id) => {
    cons
    await deleteDoc(doc(db, 'items', id));
  };




  return (
    <div className="min-h-screen flex justify-start flex-col items-center p-4 ">
      <div className="my-12">
        <h1 className="font-bold text-5xl">Expense Tracker</h1>
        <p className="text-center">(using Next js & firebase)</p>
      </div>
    <div className="bg-slate-900 p-4  h-full rounded-sm">

      <form className="grid grid-cols-6" action="">
        <input className="col-span-3  rounded-sm p-2" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} type="text" placeholder="Enter your Expense" />
        <input className="col-span-2 rounded-sm p-2 mx-2" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} type="number" placeholder="Enter $" />
        <button className="bg-green-500 p-4 text-xl" type="submit" onClick={addItem}>+</button>
      </form>
      <ul className="flex flex-col my-6 overflow-y-scroll scroll-smooth">
        {items.map((item, id) => (
          <li key={id} className="flex justify-between my-2 border-b border-[#5454544f] w-full">
            <div className="flex  p-4 w-full justify-between gap-4">
              <p>{item.name}</p>
              <p>${item.price}</p>
            </div>
            <button onClick={()=> deleteItem(item.id)} className="ml-8 w-16 p-4 bg-red-600">X</button>
          </li>
        ))}
      </ul>
      {
        items.length < 1 ? ('') : (
          <div className="flex p-4 w-full justify-between gap-4">
            <span>Total</span>
            <span>${total}</span>
          </div>
        )
      }
    </div>

    </div>
  );
}
