import axios from "axios"
import { USER_DATA } from "../constants"

export const UserActions = () => async (dispatch) => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users")
    console.log(res.data)
    
    return dispatch({
        type: USER_DATA,
        payload: res.data
    })
}