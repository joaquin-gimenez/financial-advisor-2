import { combineReducers } from 'redux';
import riskLevelReducer from './riskLevel/riskLevel.reducer';

export default combineReducers({
  riskLevel: riskLevelReducer
})