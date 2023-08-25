import React, { useContext } from 'react'
import { MyContext } from '../context/AuthContext';


const Home = () => {
const {state} = useContext(MyContext)
console.log(state)
    return (
        <div>
            <h1>Home</h1>
           <div>{state?.user?.name}</div>
            
        </div>
    )
}

export default Home
