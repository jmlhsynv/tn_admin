import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_URL } = process.env

const url = REACT_APP_API_URL + "Items"


export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const response = await axios.get(url, { headers });
        return response.data;
    }
);
export const postItem = createAsyncThunk(
    "items/postItem",
    async (postedData) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const res = await axios.post(url, postedData, { headers });
        console.log(postedData);
        console.log(res.data[0]);
        return {
            data: postedData,
            success: res.data[0]
        };
    }
);
export const deleteItem = createAsyncThunk(
    "items/deleteItem",
    async (id) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const res = await axios.delete(`${url}/${id}`, { headers });
        return {
            id: id,
            success: res.data
        };
    }
);

const initialState = {
    pending: false,
    error: "",
    items: [],
};

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        removeErrors: state => {
			state.error = ""
		}
    },
    extraReducers: {
        // GET
        [fetchItems.pending]: (state) => {
            return { ...state, pending: true }
        },
        [fetchItems.fulfilled]: (state, { payload }) => {
            return { ...state, pending: false, items: payload, };
        },
        [fetchItems.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },

        // POST
        [postItem.pending]: (state) => {
            return { ...state, pending: true }
        },
        [postItem.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                return { ...state, pending:false,  items: [...state.items, payload.success ] };
            } else {
                return { ...state, pending: false, error: payload.success }
            }
        },
        [postItem.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },
        
        // DELETE
        [deleteItem.pending]: (state) => {
            return { ...state, pending: true }
        },
        [deleteItem.fulfilled]: (state, { payload }) => {
            if(payload.success === true){
                return { ...state, pending: false, items: [...state.items.filter(e => e.ID !== payload.id)], error: "success" };
            }else if(payload.success === false){
                return {...state, pending: false, error: false}
            }else{
                return {...state, pending: false, error: "hasChild"}
            }
        },
        [deleteItem.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },
    },
});

export const getAllItems = (state) => state.units.units;
export const { removeErrors } = itemSlice.actions

export default itemSlice.reducer;


// "prices": [
//     {
//         "ID": 0,
//         "ITEM_ID": 0,
//         "PTYPE_": 1,
//         "PRICE": 10,
//         "EDV_TYPE": 1,
//         "EDV_PER": 18.0,
//         "SIZE_ID": 0,
//         "COLOR_ID": 0,
    // "COLOR_CODE":"" ,   
            // "SIZE_CODE":"" ,
//         "NOTE_": "121212",
//         "BEG_DATE": "2022-01-01",
//         "END_DATE": "2022-12-31",
//         "USER_ID": 1
//     }
// ]