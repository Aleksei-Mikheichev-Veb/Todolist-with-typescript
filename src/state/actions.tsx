import * as TodoListReducer from "./todoListReducer";
import * as TaskReducer from "./taskReducer";

export default {
    ...TodoListReducer,
    ...TaskReducer
}