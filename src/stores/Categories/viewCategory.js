import { createSlice } from '@reduxjs/toolkit'

export const viewCategory = createSlice({
	name: 'viewCategory',
	initialState: {
		modal: false,
        detail: []
	},
	reducers: {
		setModal: (state, action) => {
			state.modal = !state.modal
            state.detail = action.payload
		}
	}
})

export const { setModal } = viewCategory.actions

export default viewCategory.reducer