import { createSlice } from '@reduxjs/toolkit'

export const editUnit = createSlice({
	name: 'editUnit',
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

export const { setEditModal } = editUnit.actions

export default editUnit.reducer