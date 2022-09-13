import { combineReducers } from 'redux';

import todoSlice from "./todo-slice";

export default combineReducers({
    todo: todoSlice.reducer,
})