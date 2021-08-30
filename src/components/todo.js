import React,{useState, useEffect} from 'react';
import '../App.css';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function Todo({ todo,removeTodo}){
return(
  <div className='todo'> 
  <span>{todo.name}</span>
    <div>
    <Link to={{pathname: `/list/${todo.id}`}}>
    <Button variant="outline-success" >view</Button>
    </Link>
    <Link to={{pathname: `/edit-todo/${todo.id}`}}>
      <Button variant="outline-success" >Edit</Button>{''}
    </Link>
      <Button variant="outline-danger" onClick={()=>removeTodo(todo)}>✕</Button>
    </div>
  </div>
)
}
function FormTodo({addTodo}){
  const [value,setValue] = useState("");

  const handleSubmit = e =>{
    e.preventDefault();
    if(!value) return;
    addTodo(value);
    setValue("");
  }
  return(
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>
            <b>Add Todo</b>
          </Form.Label>
          <Form.Control type="text" className="input" value={value} onChange={e=>setValue(e.target.value)} placeholder="Add new todo"/>
        </Form.Group>
        <Button variant="primary mb-3" type="submit">Submit</Button>
      </Form>
  )
}
function TodoHome() {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    fetchTodo();
  },[setTodos]);

  const fetchTodo = async() => {
    try{
      const res = await fetch("http://localhost:3000/todo");
      const json = await res.json();
      console.log("json",json);
      setTodos(json);
    }
    catch(err){
      console.log("err",err);
    }
  }

  const addTodo = async(addName) =>{
    console.log("addName",addName)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: addName })
  };
  await fetch('http://localhost:3000/todo', requestOptions)
      .then(() => console.log("addTodo added"));
  await fetchTodo();
  }

  const removeTodo = async(todo) =>{
   await fetch(`http://localhost:3000/list/deleteTodo/${todo.id}`, { method: 'DELETE' })
        .then(()=> console.log('task list Deleted successful'));
   await fetch(`http://localhost:3000/todo/${todo.id}`, { method: 'DELETE' })
        .then(()=> console.log('todo Deleted successful'));
   fetchTodo();
  }
  
  return (
    <div className="app">
    <div className="container">
      <h1 className="mb-4 text-center">Todo List</h1>
          <FormTodo addTodo={addTodo}/>
        <div>
          {todos.map((todo,index)=>(
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}/>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      </div>
  );
}

export default TodoHome;
