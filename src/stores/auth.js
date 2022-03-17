import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
const { REACT_APP_API_URL } = process.env

export const getStatus = createAsyncThunk(
	"auth/getStatus",
	async () => {
		const headers = {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + localStorage.getItem('token')
		}
		const userData = {
			Token: localStorage.getItem('token')
		}

		let data = null
		await axios.put(REACT_APP_API_URL + "Login", userData, {headers})
		.then(res => data = res.data[0])
		.catch(err => data = err.response.status)
		return data;
	}
);

export const auth = createSlice({
	name: 'auth',
	status: "",
	username: "",
	error: '',
	pending: false,
	initialState: {
		user: localStorage.getItem('token') ?? false,
	},
	reducers: {
		login: (state, action) => {
			localStorage.setItem('token', action.payload.token)
			state.user = action.payload.token
		},
		logout: state => {
			state.user = false
			localStorage.removeItem('token')
		},
		removeErrors: state => {
			state.error = ''
		}
	},
	extraReducers: {
		// GET
		[getStatus.pending]: (state) => {
			return { ...state, pending: true, error: '' }
		},
		[getStatus.fulfilled]: (state, { payload }) => {
			if (payload) {
				if (payload === 401) {
					return { ...state, pending: false, error: payload };
				}else{
					return { ...state, pending: false, status: payload.Status, username: payload.UserName, error: '' };
				}
			}else{
				return state
			}
		},
		[getStatus.rejected]: () => {
			console.log("Rejected!");
		},
	}
})

export const { login, logout, removeErrors } = auth.actions

export default auth.reducer