import { CHANGE_STATUS } from '../actions/actions';
import { chatDefaultState } from '../defaultState';

const chatReducer = (state = chatDefaultState, action) => {
    switch (action.type) {
        case CHANGE_STATUS: {
            return { status: action.status };
        }

        default: {
            return state;
        }
    }
};

export default chatReducer;
