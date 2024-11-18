import { combineReducers } from 'redux'
import fetchBannerReducer from './fetchBannerImageForUser.reducer'

const movieReducers = combineReducers({
    fetchBannerReducer
})

export default movieReducers;