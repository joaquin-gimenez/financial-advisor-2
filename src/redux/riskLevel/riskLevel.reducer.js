
import initialState from '../initialState'; 

const riskLevelReducer = (state = initialState, action) => {
    switch (action.type) { 
        case 'SELECT_RISK_LEVEL':
            return {
                ...state,
                level: action.payload
            }
        default:
            return state;
    }
};

export default riskLevelReducer;