import { CHANGE_STATUS, FETCH_GET_DATA } from '../actions/actions';
import { chatDefaultState } from '../defaultState';

const chatReducer = (state = chatDefaultState, action) => {
    switch (action.type) {
        case CHANGE_STATUS: {
            return { status: action.status };
        }

        case FETCH_GET_DATA: {
            return {
                status: action.status,
                dialogs: action.dialogs
            };
        }

        default: {
            return state;
        }
    }
};

export default chatReducer;
