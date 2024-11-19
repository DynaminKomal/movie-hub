import * as login from '../../actions/auth/login.action'

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
        case login.LOGIN.REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                failure: false,
            };
        case login.LOGIN.SUCCESS:
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

        case login.LOGIN.FAILURE:
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