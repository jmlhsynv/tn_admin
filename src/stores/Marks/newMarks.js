import { createSlice } from '@reduxjs/toolkit'

export const newMark = createSlice({
	name: 'newMark',
	initialState: {
		modal: false
	},
	reducers: {
		setNewModal: (state) => {
			state.modal = !state.modal
		}
	}
})

export const { setNewModal } = newMark.actions

export default newMark.reducer