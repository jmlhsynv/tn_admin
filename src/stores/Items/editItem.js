import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_URL } = process.env

const url = REACT_APP_API_URL + "Items/"

export const getEditItem = createAsyncThunk(
    "items/getEditItem",
    async (id) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const response = await axios.get(url + id, { headers });
        return response.data[0];
    }
);

export const editItem = createSlice({
	name: 'editItem',
	initialState: {
		modal: false,
        pending: false,
        error: "",
        detail: null
	},
	reducers: {
		setEditModal: (state) => {
			state.modal = !state.modal
		}
	},
    extraReducers: {
        // GET
        [getEditItem.pending]: (state) => {
            return { ...state, pending: true }
        },
        [getEditItem.fulfilled]: (state, { payload }) => {
            return { ...state, pending: false, detail: payload, };
        },
        [getEditItem.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },
    },
})

export const { setEditModal } = editItem.actions

export default editItem.reducer