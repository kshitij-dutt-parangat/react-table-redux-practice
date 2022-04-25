import { USER_DATA } from "../constants";

export const UserReducer = (state = [], action) => {
    switch (action.type) {
        case USER_DATA:
            return action.payload
        default:
            return state
    }
}