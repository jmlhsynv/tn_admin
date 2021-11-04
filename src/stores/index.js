import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./auth"
import siteReducer from "./site"
import categoryReducer from './Categories/category'
import viewCategoryReducer from './Categories/viewCategory'
import newCategoryReducer from './Categories/newCategory'

export default configureStore({
	reducer: {
		auth: authReducer,
		site: siteReducer,
		categories: categoryReducer,
		viewCategory: viewCategoryReducer,
		newCategory: newCategoryReducer

	}
})