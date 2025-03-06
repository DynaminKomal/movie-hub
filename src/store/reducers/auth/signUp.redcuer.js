import * as signUp from '../../actions/auth/signup.action'

const initialState = {
    loading: false,
    success: false,
    failure: false,
    status: '',
    statusCode: '',
    message: '',
    data: []
}

export default function returnstate(state = initialState, action) {

    switch (action.type) {
        case signUp.RESET_SIGNUP.SUCCESS:
            return {
                ...state,
                loading: false,
                success: false,
                failure: false,
                status: '',
                statusCode: '',
                message: '',
                data: []
            };
        case signUp.SIGNUP.REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                failure: false,
            };
        case signUp.SIGNUP.SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                failure: false,
                status: action.payload.status,
                statusCode: action.payload.statusCode,
                message: action.payload.message,
                data: action.payload.data
            };

        case signUp.SIGNUP.FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                failure: true,
                status: action.payload.status,
                statusCode: action.payload.statusCode,
                message: action.payload.message,
                data: action.payload.data
            };
        default: return state
    }
}