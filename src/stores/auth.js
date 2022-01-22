import { createSlice } from '@reduxjs/toolkit'

export const auth = createSlice({
	name: 'auth',
	initialState: {
		user: localStorage.getItem('token') ?? false,
		status: ""
	},
	reducers: {
		login: (state, action) => {
			localStorage.setItem('token', action.payload.token)
			state.user = action.payload.token
			state.status = action.payload.status
			console.log(state.status);
		},
		logout: state => {
			state.user = false
			state.status = ""
			localStorage.removeItem('token')
		}
	}
})

export const { login, logout } = auth.actions

export default auth.reducer