import * as Actions from '../actions';

const initialState = {
    listExample       : []
};

const notesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_LIST_EXAMPLE:
        {
            return {
                ...state,
                entities: action.payload
            };
        }
        case Actions.CREATE_SYSTEM:
        {
            return {
                ...state,
                entities:  state.entities
            };
        }
        default:
        {
            return state;
        }
    }
};

export default notesReducer;
