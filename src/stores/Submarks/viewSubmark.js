import { createSlice } from '@reduxjs/toolkit'

export const viewSubmark = createSlice({
	name: 'viewSubmark',
	initialState: {
		modal: false,
        detail: []
	},
	reducers: {
		setViewModal: (state, action) => {
			state.modal = !state.modal
            state.detail = action.payload
		}
	}
})

export const { setViewModal } = viewSubmark.actions

export default viewSubmark.reducer