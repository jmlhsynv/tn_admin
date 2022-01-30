import { createSlice } from '@reduxjs/toolkit'

export const viewMark = createSlice({
	name: 'viewMark',
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

export const { setViewModal } = viewMark.actions

export default viewMark.reducer