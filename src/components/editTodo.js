import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditTodo = () => {
 const { id } = useParams();
 console.log("id",id);

 const [value,setValue] = useState("");

 let history = useHistory();
    const goToPreviousPath = () => {
        history.goBack()
  }

 const handleSubmit = e =>{
  e.preventDefault();
  console.log("handleSubmit",value,id);
  if(!value) return;
 //  EditTodo(value);
  const requestOptions = {
   method: 'PUT',
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({ name : value })
 };
 fetch(`http://localhost:3000/todo/${id}`, requestOptions)
   .then(() => console.log("EditTodo updated"));
 setValue("");
}

 return (
  <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control type="text" className="input" value={value} onChange={e=>setValue(e.target.value)} placeholder="Add new todo"/>
        </Form.Group>
        <Button variant="primary mb-3" onClick={goToPreviousPath} type="submit">Submit</Button>
  </Form>
 )
}

export default EditTodo;