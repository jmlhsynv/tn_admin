import { createSlice } from '@reduxjs/toolkit'

export const newItem = createSlice({
	name: 'newItem',
	initialState: {
		modal: false
	},
	reducers: {
		setNewModal: (state) => {
			state.modal = !state.modal
		}
	}
})

export const { setNewModal } = newItem.actions

export default newItem.reducer