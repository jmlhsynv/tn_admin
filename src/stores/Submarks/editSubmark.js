import { createSlice } from '@reduxjs/toolkit'

export const editSubmark = createSlice({
	name: 'editSubmark',
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

export const { setEditModal } = editSubmark.actions

export default editSubmark.reducer