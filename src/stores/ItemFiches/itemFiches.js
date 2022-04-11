import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_URL } = process.env

const url = REACT_APP_API_URL + "ItemFiches"


export const fetchItemFiches = createAsyncThunk(
    "itemFiches/fetchItemFiches",
    async () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const response = await axios.get(url, { headers });
        return response.data;
    }
);


const initialState = {
    pending: false,
    error: "",
    itemFiches: []
};

const itemFichesSlice = createSlice({
    name: "itemFiches",
    initialState,
    reducers: {
        removeErrors: state => {
			state.error = ""
		}
    },
    extraReducers: {
        // GET
        [fetchItemFiches.pending]: (state) => {
            return { ...state, pending: true }
        },
        [fetchItemFiches.fulfilled]: (state, { payload }) => {
            return { ...state, pending: false, itemFiches: payload, };
        },
        [fetchItemFiches.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },
        
    },
});

export const getAllItemFiches = (state) => state.itemFiches.itemFiches;
export const { removeErrors } = itemFichesSlice.actions

export default itemFichesSlice.reducer;