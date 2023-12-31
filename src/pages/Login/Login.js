import React, { useContext, useState } from 'react'
import classes from "./Login.module.css";
import { signInWithEmailAndPassword  } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/AuthContext';
import { DataContext } from '../../components/context/DataContext';

const Login = () => {
    const [error,setError] = useState(false);
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {checkAdmin} = useContext(DataContext);
    const {handleLoginData} = useContext(DataContext);

    const navigate = useNavigate()

    const {dispatch} = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword (auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user)
          dispatch({type:"LOGIN", payload:user})
          checkAdmin(email)
          handleLoginData();
          navigate("/")
        })
        .catch((error) => {
          setError(true)
        });
    }

  return (
    <div className={classes.login}>
        <form className={classes.loginForm} onSubmit={handleLogin}> 
            <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
            <button type="submit">Login</button>
            {error && <span>Wrong email or password</span>}
            <span style={{color: "black"}}>Don't have a account? <a href="/signup">Sign Up</a></span>
        </form>
    </div>
  )
}

export default Login