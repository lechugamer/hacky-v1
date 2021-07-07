import { useHistory } from "react-router-dom";
import React, {useEffect} from 'react';

const Home = () => {

    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('devschooltoken'))
        {
            history.push('/dashboard')
        } else {
            history.push('/')
        }
    }, []);

    return (
        <div>
            <h1>Bienvenido al Dashboard</h1>
        </div>
    )
}

export default Home

