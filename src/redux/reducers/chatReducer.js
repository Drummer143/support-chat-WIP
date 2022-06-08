import { chatDefaultState } from "../defaultState";
import { FETCH_GET_DATA_REQUEST, FETCH_GET_DATA_SUCCESS, CHANGE_STATUS } from "../actions/actions";

const chatReducer = (state = chatDefaultState, action) => {
    switch (action.type) {
/*         case FETCH_GET_DATA_REQUEST: {
            return {
                requesting: true,
                status: state.status
            }
        } */
        case FETCH_GET_DATA_SUCCESS: {
            return {
                dialogs: action.dialogs,
                status: action.status
            }
        }
        case CHANGE_STATUS: {
            return { status: action.status }
        }

        default: {
            return state;
        }
    }
}

export default chatReducer;