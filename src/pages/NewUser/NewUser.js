import React from 'react';
import classes from './NewUser.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState,useEffect } from 'react';
import { addDoc, collection, doc, serverTimestamp, setDoc,getDocs,updateDoc  } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const New = () => {
    
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        id:'',
        date: '',
        name: '',
        email:'',
        role: '',
    });

    
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            console.log(user)
        }

      },[]);

      const getFormattedDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      };


    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }


    const handleAdd = async(e) => {
        e.preventDefault();
        
        if(formData.date && formData.name )
        {
        try{
            const res = await addDoc(collection(db, "users"), {
                    Date: formData.date,
                    Name: formData.name,
                    Email: formData.email,
                    Role: formData.role,
              })
              .then(()=>{
                navigate("/users")
              })
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        alert("Enter all details")
    }

    }

  return (
    <div className={classes.new}>
        <Sidebar/>
        <div className={classes.newContainer}>
            <Navbar/>
             <div className={classes.top}>
             <h1>Add New User</h1></div>
             <div className={classes.bottom}>
                <form onSubmit={handleAdd}>
                    <div className={classes.formInput}>
                        <label>Date</label>
                        <input 
                        id ="date" 
                        type="datetime-local" 
                        placeholder='date'
                        required
                        value={formData.date}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Name</label>
                        <input 
                        id="name" 
                        type="text" 
                        placeholder='name'
                        value={formData.name}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Email</label>
                        <input 
                        id="email" 
                        type="email" 
                        placeholder='email'
                        value={formData.email}
                        onChange={handleInput}
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Role</label>
                        <select 
                        id="role" 
                        name="role"
                        value={formData.role}
                        onChange={handleInput}
                        >
                            <option value="default">Select</option>
                            <option value="admin">Admin</option>
                            <option value="crm">Crm</option>
                        </select>
                    </div>
                    <button type="submit" className={classes.sendButton}>Send</button>
                </form>
             </div>
        </div>
    </div>
  )
}

export default New