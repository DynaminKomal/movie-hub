import * as resetToken from '../../actions/auth/resetToken.action'

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
        case resetToken.RESET_RESET_TOKEN:
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
        case resetToken.RESET_TOKEN.REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                failure: false,
            };
        case resetToken.RESET_TOKEN.SUCCESS:
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

        case resetToken.RESET_TOKEN.FAILURE:
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