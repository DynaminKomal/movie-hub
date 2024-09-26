import { combineReducers } from 'redux'
import fetchBannerReducer from './fetchBannerImageForUser.reducer'

const userReducers = combineReducers({
    fetchBannerReducer
})

export default userReducers;