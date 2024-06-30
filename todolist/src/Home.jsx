import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'

import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';

function Home(){
    const[todos, setTOdos]= useState([])
    useEffect(()=>{
        axios.get('http://localhost:3001/get')
        .then(result => setTOdos(result.data))
        .catch(err => console.log(err))
    }, [])
    const handlEdit = (id)=> {
        axios.put('http://localhost:3001/update/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id)=> {
        axios.delete('http://localhost:3001/delete/'+id)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    return(
        <div className='home'>
            <h2>ToDo List</h2>
            <Create />
            {
                todos.length === 0 
                ?
                <div className='create_form input'><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div className='task'>
                        <div className="checkbox" key={uuidv4()} onClick={() => handlEdit(todo._id)}>
                            {todo.done ?
                            <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                            : <BsCircleFill className="icon" />
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>

                        </div>
                        <div>
                            <span><BsFillTrashFill className="icon"
                                 onClick={() => handleDelete(todo._id)}/></span>
                        </div>                        
                    </div>
                ))
            }
        </div>
    )
}

export default Home