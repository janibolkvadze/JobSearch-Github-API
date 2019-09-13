import '../actions/types';
import { SAVE_JOB, REMOVE_JOB } from '../actions/types';


const initialState = {
    savedJobs: []
};

const jobReducer = (state = initialState, action) => {
    switch(action.type) {
        case SAVE_JOB:
            return {
                ...state,
                savedJobs: [action.payload, ...state.savedJobs]
            }
        case REMOVE_JOB:
            return {
        
            }
        default:
            return state
    }
}

export default jobReducer;
