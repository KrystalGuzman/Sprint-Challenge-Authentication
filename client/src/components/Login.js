import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;


const Login = ({errorMessages, setErrorMessages, isLoggedIn, setIsLoggedIn}) => {

    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
    });

    const handleChange = event => {
        setUserInput({...userInput, [event.target.name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios.post("http://localhost:3300/api/auth/login", userInput)
            .then(response => {

                setIsLoggedIn(true);
                setErrorMessages([]);

                localStorage.setItem("token", response.data.token);
                
                console.log("logged in.", response)
            })
            .catch(error => {
                setErrorMessages([...errorMessages, "login error"])
                console.log("login error.", error)
            })
    }

    return (
        
        <>
            <h2>Log In</h2>
            {
                isLoggedIn ? 
                <h3>You are already logged in!</h3>
                :              
                <div>
                    <form name="login">
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" value={userInput.username} onChange={handleChange}/>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" value={userInput.password} onChange={handleChange}/>
                        <button onClick={handleSubmit}>Log in</button>                      
                    </form>
                </div>
            }
        </>
    )
}

export default Login;