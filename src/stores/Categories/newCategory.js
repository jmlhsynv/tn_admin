import { createSlice } from '@reduxjs/toolkit'

export const newCategory = createSlice({
	name: 'newCategory',
	initialState: {
		modal: false
	},
	reducers: {
		setNewModal: (state) => {
			state.modal = !state.modal
		}
	}
})

export const { setNewModal } = newCategory.actions

export default newCategory.reducer