'use client'
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <form action="">
        <input type="text" placeholder="Enter your Expense" />
        <input type="number" placeholder="Enter $" />
        <button type="submit">+</button>
      </form>
    </div>
  );
}
