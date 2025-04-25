import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../redux/slice/counter.slice';

function Counter(props) {

    const dispatch = useDispatch();

    const handleIncrement = () => {     //1
        dispatch(increment());
    }

    const handleDecrement = () => {
        dispatch(decrement());
    }

    const c = useSelector(state => state.count);

    console.log(c); //4
    

    return (
        <div>
            <h1>Counter</h1>

            <Button onClick={handleIncrement}>+</Button>
            <span>{c.count}</span>
            <Button onClick={handleDecrement}>-</Button>
        </div>
    );
}

export default Counter;