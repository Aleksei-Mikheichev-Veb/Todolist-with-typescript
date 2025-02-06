import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {getTodoListsThunk} from "../state/todoListReducer";
import actions from "../state/actions";

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
    // return bindActionCreators(getTodoListsThunk, dispatch)
}
