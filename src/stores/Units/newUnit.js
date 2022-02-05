import { createSlice } from '@reduxjs/toolkit'

export const newUnit = createSlice({
	name: 'newUnit',
	initialState: {
		modal: false
	},
	reducers: {
		setNewModal: (state) => {
			state.modal = !state.modal
		}
	}
})

export const { setNewModal } = newUnit.actions

export default newUnit.reducer