import React, { useContext, useState } from 'react'
import classes from "./Signup.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';

const Signup = () => {
    const [error,setError] = useState(false);
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

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
          navigate("/login")
        })
        .catch((error) => {
          setError(true)
        });
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