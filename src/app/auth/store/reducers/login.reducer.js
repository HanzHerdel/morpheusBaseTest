import * as Actions from '../actions';

const initialState = {
    success: false,
    infoUser: {},
    statusCode: null,
    statusToken: false,
    tokens: {},
    error  : {
        username: null,
        password: null
    }
};

const login = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.LOGIN_SUCCESS:
        {
            return {
                ...initialState,
                success: true,
                infoUser: action.payload,
                statusCode: action.statusCode
            };
        }
        case Actions.LOGIN_ERROR:
        {
            return {
                success: false,
                error  : action.payload,
                statusCode: action.statusCode
            };
        }
        case Actions.TOKEN_SUCCESS:
        {
            return {
                tokens: action.payload,
                statusToken: action.statusToken
            };
        }
        case Actions.TOKEN_CLEAR:
        {
            return {
                success: false,
                infoUser: {},
                statusCode: null,
                statusToken: false,
                tokens: {},
            };
        }
        default:
        {
            return state
        }
    }
};

export default login;