import React,{useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import '../App.css';
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function Todo({ todo,index,editTodo,markTodo,removeTodo}){
return(
  <div className='todo'> 
    <span style={{ textDecoration: todo.iscompleted ? "line-through" : "" }}>{todo.name}</span>
    <div>
    <Link to={{pathname: `/edit/${todo.id}`}}>
      <Button variant="outline-success" >Edit</Button>{''}
    </Link>
      <Button variant="outline-success" onClick={()=>markTodo(todo)}>✓</Button>{''}
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
            <b>Add Task</b>
          </Form.Label>
          <Form.Control type="text" className="input" value={value} onChange={e=>setValue(e.target.value)} placeholder="Add new task"/>
        </Form.Group>
        <Button variant="primary mb-3" type="submit">Submit</Button>
      </Form>
  )
}
function Home() {
  const [todos, setTodos] = useState([]);

  const { id } = useParams();
  console.log("id",id);

  useEffect(() => {
    fetchList();
  },[setTodos]);

  const fetchList = async() => {
    try{
      const res = await fetch(`http://localhost:3000/list/${id}`);
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
      body: JSON.stringify({ name: addName, todoId: id, iscompleted: false })
  };
  await fetch('http://localhost:3000/list', requestOptions)
      .then(() => console.log("addTodo added"));
  await  fetchList();
  }

  const editTodo = todo => {
    console.log("editTodo",todo);
  //   const requestOptions = {
  //     method: 'PUT',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ name: `{todo.name}` })
  // };
  // fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions)
  //     .then(response => response.json())
  }
  
  const markTodo = todo => {
    // const newTodos = [...todos];
    // setTodos(newTodos);
    
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ iscompleted : true })
  };
  fetch(`http://localhost:3000/list/${todo.id}`, requestOptions)
      .then(() => console.log("markTodo updated"));
  fetchList();
  };
  const removeTodo = async(todo) =>{

    await fetch(`http://localhost:3000/list/${todo.id}`, { method: 'DELETE' })
        .then(()=> console.log('Deleted successful'));
        fetchList();
  }
  
  return (
    <div className="app">
    <div className="container">
      <h1 className="mb-4 text-center">Task List</h1>
          <FormTodo addTodo={addTodo}/>
        <div>
          {todos.map((todo,index)=>(
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                editTodo={editTodo}
                markTodo={markTodo}
                removeTodo={removeTodo}/>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      </div>
  );
}

export default Home;
