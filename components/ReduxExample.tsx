import { RootState } from '@/stores';
import { decrement, increment } from '@/stores/exampleSlice';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ExampleComponent: React.FC = () => {
    const value = useSelector((state: RootState) => state.example.value);
    const dispatch = useDispatch();

    return (
        <div>
            <h1>{value}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
    );
};

export default ExampleComponent;