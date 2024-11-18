import * as fetchBanner from '../../actions/movies/fetchBanner.action'

const initialState = {
    loading: false,
    success: false,
    failure: false,
    status:'',
    message:'',
    data:[]
}

export default function returnstate(state = initialState, action) {

    switch (action.type) {
        case fetchBanner.FETCH_BANNER.REQUEST:
            return {
                ...state,
                loading: true,
                success: false,
                failure: false,
            };
        case fetchBanner.FETCH_BANNER.SUCCESS:     
        return {
                ...state,
                loading: false,
                success: true,
                failure: false,
                status:action.payload.status,
                message:action.payload.message,
                data:action.payload.data
            };

        case fetchBanner.FETCH_BANNER.FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                failure: true,
                status:action.payload.status,
                message:action.payload.message,
                data:action.payload.data
            };
        default: return state
    }
}