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
    <div>

      <form action="">
        <input value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} type="text" placeholder="Enter your Expense" />
        <input value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} type="number" placeholder="Enter $" />
        <button type="submit" onClick={addItem}>+</button>
      </form>
      <ul className="flex flex-col">
        {items.map((item, id) => (
          <li key={id} className="flex justify-between w-full">
            <div className="flex p-4 w-full justify-between gap-4">
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
            <button onClick={()=> deleteItem(item.id)} className="ml-8 w-16 p-4 bg-slate-600">X</button>
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
