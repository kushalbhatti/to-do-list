import { useState } from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import ToDoItems from './ToDoItems';
import './Css/ToDo.css'

let count = 0;

const Todo = () => {


  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([...todos, { no: count++, text: inputRef.current.value, display: "" }])
    inputRef.current.value = "";
    localStorage.setItem("todos_count",count);
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count")
  },[])

  useEffect(() => {

    setTimeout(() => {
      console.log(todos)
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 100);
  }, [todos])

  return (
    <div className='todo'>
      <div className="todo-header">To-do-List</div>
      <div className="todo-add">
        <input ref={inputRef} type="text" placeholder='Enter Your Text' className='todo-input' />
        <div onClick={() => { add() }} className="todo-add-btn">Add</div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return <ToDoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text} />
        })}
      </div>
    </div>
  )
}

export default Todo
