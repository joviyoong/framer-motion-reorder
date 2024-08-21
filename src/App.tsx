import "./styles.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { Item } from "./Item";

const initialItems = ["🍅 Tomato", "🥒 Cucumber", "🧀 Cheese", "🥬 Lettuce"];

export default function App() {
  const [items, setItems] = useState(initialItems);

  const shuffle = () => {
    const newItems = [...items];
    for (let i = 0; i < newItems.length; ++i) {
      const toIndex = Math.floor(Math.random() * (newItems.length - i)) + i;
      const temp = newItems[toIndex];
      newItems[toIndex] = newItems[i];
      newItems[i] = temp;
      setItems(newItems);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "e") {
        console.log("shuffling");
        shuffle();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <Reorder.Group axis="y" values={items} onReorder={() => {}}>
      <div>
        {items.map((item) => (
          <Item key={item} item={item} />
        ))}
      </div>
    </Reorder.Group>
  );
}
