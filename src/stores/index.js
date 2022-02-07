import { configureStore } from '@reduxjs/toolkit'

import authReducer from "./auth"
import siteReducer from "./site"

import categoryReducer from './Categories/category'
import viewCategoryReducer from './Categories/viewCategory'
import newCategoryReducer from './Categories/newCategory'
import editCategoryReducer from './Categories/editCategory'

import markReducer from './Marks/marks'
import newMarkReducer from './Marks/newMarks'
import editMarkReducer from './Marks/editMark'
import viewMarkReducer from './Marks/viewMark'

import submarkReducer from './Submarks/submarks'
import newSubmarkReducer from './Submarks/newSubmark'
import viewSubmarkReducer from './Submarks/viewSubmark'
import editSubmarkReducer from './Submarks/editSubmark'

import unitReducer from './Units/units'
import newUnitReducer from './Units/newUnit'
import viewUnitReducer from './Units/viewUnit'
import editUnitReducer from './Units/editUnit'

import itemReducer from './Items/items'
import viewItemReducer from './Items/viewItem'
 
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
		newMark: newMarkReducer,
		editMark: editMarkReducer,
		viewMark: viewMarkReducer,
		
		// Submarks
		submarks: submarkReducer,
		newSubmark: newSubmarkReducer,
		editSubmark: editSubmarkReducer,
		viewSubmark: viewSubmarkReducer,

		// Units
		units: unitReducer,
		newUnit: newUnitReducer,
		editUnit: editUnitReducer,
		viewUnit: viewUnitReducer,

		// Items
		items: itemReducer,
		viewItem: viewItemReducer,
	}
})