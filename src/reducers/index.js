import { combineReducers } from 'redux';
import GlobalReducer from './globalReducer';
import AdministratorsReducer from './administratorsReducer';
import FeedbacksReducer from './feedbacksReducer';
import ManagersReducer from './managersReducer';
import ModulesReducer from './modulesReducer';

export default combineReducers({
    global: GlobalReducer,
    administrators: AdministratorsReducer,
    feedbacks: FeedbacksReducer,
    managers: ManagersReducer,
    modules: ModulesReducer,
});