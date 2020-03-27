import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Signup = ({errorMessages, setErrorMessages, isLoggedIn, setIsLoggedIn}) => {

    const [userInput, setUserInput] = useState({
        username: "",
        password: ""
    });

    const handleChange = event => {
        setUserInput({...userInput, [event.target.name]: event.target.value})
    }

    const handleSubmit = event => {
        event.preventDefault();

        axios.post("http://localhost:3300/api/auth/register", userInput)
            .then(response => {

                setIsLoggedIn(true);
                setErrorMessages([]);
                localStorage.setItem("token", response.data.token);              
                console.log("registered.", response)
            })
            .catch(error => {
                setErrorMessages([...errorMessages, "registration error"])
                console.log("registration error.", error)
            })
    }
    return (
        <>
            <h2>Sign Up</h2>
            {
                isLoggedIn ? 
                <h3>You are already logged in!</h3>
                :
                <div>
                    <form name="signup">
                        <label htmlFor="username">Username: </label>
                        <input type="text" name="username" value={userInput.username} onChange={handleChange}/>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" value={userInput.password} onChange={handleChange}/>
                        <button onClick={handleSubmit}>Sign up</button>
                    </form>
                </div>
            }
        </>
    )
}

export default Signup;