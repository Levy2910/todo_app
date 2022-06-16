import React, { useState, useCallback, useEffect } from "react";

function App() {
  const TODO_APP_STORAGE_KEY = "TODO_APP";
  // hooks
  const [newAct, setNewAct] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storageTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageTodoList) {
      setItems(JSON.parse(storageTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // change input value
  const changeInputValue = useCallback((e) => {
    setNewAct(e.target.value);
  }, []);

  // helper functions

  const addActivity = useCallback(() => {
    const newItemObject = {
      id: Math.floor(Math.random() * 100),
      value: newAct,
    };
    setItems([newItemObject, ...items]);
    setNewAct("");
  }, [newAct, items]);

  const deleteItem = useCallback(
    (id) => {
      const newArray = items.filter((item) => item.id !== id);
      setItems(newArray);
    },
    [items]
  );

  const crossItem = useCallback((id) => {
    const crossedItem = document.getElementById(`${id}`);
    crossedItem.classList.toggle("crossed");
  }, []);
  // local storage

  // react will render this
  return (
    <div className="content">
      <h3>Make Every Day a Better Day</h3>
      {/* input form */}
      <div className="form">
        <input
          type="text"
          placeholder="What's your priority?"
          value={newAct}
          onChange={changeInputValue}
        />
        <button
          className="add"
          disabled={!newAct ? true : false}
          onClick={addActivity}
        >
          Add
        </button>
      </div>
      {/* list of activities */}
      {items.map((item) => (
        <li key={item.id} id={item.id}>
          {item.value}

          <button
            className="delete"
            onClick={() => {
              deleteItem(item.id);
            }}
          >
            <i class="fa-solid fa-trash-can"></i>
          </button>
          <button
            className="tick"
            onClick={() => {
              crossItem(item.id);
            }}
          >
            <i class="fa-solid fa-check-double"></i>
          </button>
        </li>
      ))}
    </div>
  );
}

export default App;
