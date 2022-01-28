import { configureStore } from '@reduxjs/toolkit'

import authReducer from "./auth"
import siteReducer from "./site"

import categoryReducer from './Categories/category'
import viewCategoryReducer from './Categories/viewCategory'
import newCategoryReducer from './Categories/newCategory'
import editCategoryReducer from './Categories/editCategory'

import markReducer from './Marks/marks'
import newMarkReducer from './Marks/newMarks'

export default configureStore({
	reducer: {
		auth: authReducer,
		site: siteReducer,

		// categories
		categories: categoryReducer,
		viewCategory: viewCategoryReducer,
		newCategory: newCategoryReducer,
		editCategory: editCategoryReducer,

		// marks
		marks: markReducer,
		newMark: newMarkReducer
	}
})