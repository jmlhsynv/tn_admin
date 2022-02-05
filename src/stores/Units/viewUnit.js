import { createSlice } from '@reduxjs/toolkit'

export const viewUnit = createSlice({
	name: 'viewUnit',
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

export const { setViewModal } = viewUnit.actions

export default viewUnit.reducer