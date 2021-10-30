import { createSlice } from '@reduxjs/toolkit'

export const category = createSlice({
	name: 'category',
	initialState: {
		categories: []
	},
	reducers: {
		getCategories: (state, {payload}) => {
            return {categories: [...state.categories, ...payload]}
        }
	}
})

export const { getCategories } = category.actions

export default category.reducer