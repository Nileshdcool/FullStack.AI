import { combineReducers } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice';


const rootReducer = combineReducers({
  example: exampleReducer,
});

export default rootReducer;