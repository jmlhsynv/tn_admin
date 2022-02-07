import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_URL } = process.env

const url = REACT_APP_API_URL + "Items/"

export const getDetailedItem = createAsyncThunk(
    "items/getDetailedItem",
    async (id) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const response = await axios.get(url + id, { headers });
        return response.data[0];
    }
);

export const viewItem = createSlice({
	name: 'viewItem',
	initialState: {
		modal: false,
        pending: false,
        error: "",
        detail: null
	},
	reducers: {
		setViewModal: (state) => {
			state.modal = !state.modal
		}
	},
    extraReducers: {
        // GET
        [getDetailedItem.pending]: (state) => {
            return { ...state, pending: true }
        },
        [getDetailedItem.fulfilled]: (state, { payload }) => {
            return { ...state, pending: false, detail: payload, };
        },
        [getDetailedItem.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },
    },
})

export const { setViewModal } = viewItem.actions

export default viewItem.reducer