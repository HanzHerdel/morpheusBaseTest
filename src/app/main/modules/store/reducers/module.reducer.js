import * as Actions from '../actions';

const initialState = {
    entities       : [],
    searchText     : '',
    noteDialogId   : null,
    variateDescSize: true
};

const moduleReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_MODULE:
        {
            return {
                ...state,
                entities: action.payload
            };
        }
        case Actions.CREATE_MODULE:
        {
            return {
                ...state,
                entities: state.entities
            };
        }
        default:
        {
            return state;
        }
    }
};

export default moduleReducer;
