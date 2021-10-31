import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth"
import siteReducer from "./site"
import categoryReducer from './category'


export default configureStore({
	reducer: {
		auth: authReducer,
		site: siteReducer,
		categories: categoryReducer,
	}
})