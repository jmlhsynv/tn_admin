import { createSlice } from '@reduxjs/toolkit'

export const editMark = createSlice({
	name: 'editMark',
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

export const { setEditModal } = editMark.actions

export default editMark.reducer