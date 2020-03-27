import React, {useState, useEffect} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const Jokes = ({isLoggedIn, errorMessages, setErrorMessages}) => {

    const [jokes, setJokes] = useState([]);

    useEffect(() => {

        if (isLoggedIn)
        {
            axiosWithAuth().get("jokes")
            .then(response => {
                setJokes(response.data);

                console.log("jokes are", response.data);
            })
            .catch(error => {
                console.log("error getting jokes.", error)

                setErrorMessages("error getting jokes")
            })
        }

    }, [isLoggedIn])

    return (

        <>
        <h2>Dad Jokes</h2>

        {
            isLoggedIn ?
            <div>
                {jokes.map((jokeData, id) => <p>{jokeData.joke}</p>)}
            </div>
            :
            <h3>You must be logged in to view the jokes!</h3>        
        }
        </>
    )
}

export default Jokes;