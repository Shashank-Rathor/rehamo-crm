import React from 'react';
import classes from './EditUser.module.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useState,useEffect } from 'react';
import { addDoc, collection, doc, setDoc,getDoc,updateDoc  } from "firebase/firestore"; 
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
    
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        id:'',
        date: '',
        name: '',
        email:'',
        role: '',
    });
    const [userId, setUserId] = useState("");
    var id='';


    useEffect(() => {

        const fetchData =  () => {
            var mainurl = document.location.href,
            params = mainurl.split('?')[1].split('&'),
            data = {},
            tmp
          for (var i = 0, l = params.length; i < l; i++) {
            tmp = params[i].split('=')
            data[tmp[0]] = tmp[1]
          }
          id = data.id
          setUserId(id)
          
          const docRef = doc(db, "users", id);
           
          return getDoc(docRef)
          .then((res) =>{
            if(res){
                setFormData({
                    name: res.data().Name,
                    date: res.data().Date,
                    email: res.data().Email,
                    role: res.data().Role,
                })
            }
          })
          }
          fetchData();

      },[]);



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
            const res = await updateDoc(doc(db, "users",userId), {
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
                        disabled
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Name</label>
                        <input 
                        id="name" 
                        type="text" 
                        placeholder='name'
                        value={formData.name}
                        disabled
                        />
                    </div>
                    <div className={classes.formInput}>
                        <label>Email</label>
                        <input 
                        id="email" 
                        type="email" 
                        placeholder='email'
                        disabled
                        value={formData.email}
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

export default EditUser