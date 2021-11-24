import { createSlice } from '@reduxjs/toolkit'

export const editCategory = createSlice({
	name: 'editCategory',
	initialState: {
		modal: false,
        detail: []
	},
	reducers: {
		setEditModal: (state, action) => {
			state.modal = !state.modal
            state.detail = action.payload
		}
	}
})

export const { setEditModal } = editCategory.actions

export default editCategory.reducer