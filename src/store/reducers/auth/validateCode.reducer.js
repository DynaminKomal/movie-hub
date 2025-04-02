import * as authAction from '../../actions/auth/auth.actions'

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
        case authAction.RESET_VALIDATE_CODE.SUCCESS:
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
        case authAction.VALIDATE_CODE.REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                failure: false,
            };
        case authAction.VALIDATE_CODE.SUCCESS:
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

        case authAction.VALIDATE_CODE.FAILURE:
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