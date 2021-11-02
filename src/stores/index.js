import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth"
import siteReducer from "./site"
import categoryReducer from './category'
import viewCategoryReducer from './viewCategory'

export default configureStore({
	reducer: {
		auth: authReducer,
		site: siteReducer,
		categories: categoryReducer,
		viewCategory: viewCategoryReducer
	}
})