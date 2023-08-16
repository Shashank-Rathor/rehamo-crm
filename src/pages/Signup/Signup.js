import React, { useContext, useState } from 'react'
import classes from "./Signup.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';
import { addDoc, collection } from "firebase/firestore"; 
import { db } from '../../firebase';

const Signup = () => {
    const [error,setError] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    

    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const getFormattedDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleSignup= (e) => {
        e.preventDefault();
        if(!name || !email || !password){
            setError(true);
        }

        createUserWithEmailAndPassword (auth, email, password)
        .then((res) => {
          // Signed in 
          const user = res.user;
          updateProfile(user,{
            displayName: name,
          })
          console.log(user)
          dispatch({type:"LOGIN", payload:user})
          handleAdd();
          navigate("/login")
        })
        .catch((error) => {
          setError(true)
        });
    }
    const handleAdd = async() => {
      
      try{
          const res = await addDoc(collection(db, "users"), {
                  Date: getFormattedDate(),
                  Name: name,
                  Email: email,
                  Role: "crm",
            })
      }
      catch(err){
          console.log(err)
      }
  }

  return (
    <div className={classes.login}>
        <form className={classes.loginForm} onSubmit={handleSignup}> 
            <input type="text" placeholder="name" onChange={e=>setName(e.target.value)}/>
            <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
            <button type="submit">Sign Up</button>
            {error && <span style={{color: "red"}}>Fill all the details</span>}
            <span>Already have a account? <a href="/login">Login</a></span>
        </form>
    </div>
  )
}

export default Signup;