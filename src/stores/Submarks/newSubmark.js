import { createSlice } from '@reduxjs/toolkit'

export const newSubmark = createSlice({
	name: 'newSubmark',
	initialState: {
		modal: false
	},
	reducers: {
		setNewModal: (state) => {
			state.modal = !state.modal
		}
	}
})

export const { setNewModal } = newSubmark.actions

export default newSubmark.reducer