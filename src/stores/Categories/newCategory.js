import { createSlice } from '@reduxjs/toolkit'

export const newCategory = createSlice({
	name: 'newCategory',
	initialState: {
		modal: false,
        detail: []
	},
	reducers: {
		setNewModal: (state) => {
			state.modal = !state.modal
		},
        setNewCategory: (state, action) => {
			state.modal = !state.modal
            state.detail = action.payload
		}
	}
})

export const { setNewModal } = newCategory.actions
export const { setNewCategory } = newCategory.actions

export default newCategory.reducer