import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_URL } = process.env

const url = REACT_APP_API_URL + "Units"


export const fetchUnits = createAsyncThunk(
    "units/fetchUnits",
    async () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const response = await axios.get(url, { headers });
        return response.data;
    }
);

export const postUnit = createAsyncThunk(
    "units/postUnit",
    async (postedData) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const res = await axios.post(url, postedData, { headers });
        return {
            data: postedData,
            success: res.data
        };
    }
);

export const editUnit = createAsyncThunk(
    "units/editUnit",
    async (edittedData) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const res = await axios.put(`${url}/${edittedData.ID}`, edittedData, { headers });
        return {
            data: edittedData,
            success: res.data[0]
        }
    }
);

export const deleteUnit = createAsyncThunk(
    "units/deleteUnit",
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
    units: []
};

const unitSlice = createSlice({
    name: "units",
    initialState,
    reducers: {
        removeErrors: state => {
			state.error = ""
		}
    },
    extraReducers: {
        // GET
        [fetchUnits.pending]: (state) => {
            return { ...state, pending: true }
        },
        [fetchUnits.fulfilled]: (state, { payload }) => {
            return { ...state, pending: false, units: payload, };
        },
        [fetchUnits.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },

        // POST
        [postUnit.pending]: (state) => {
            return { ...state, pending: true }
        },
        [postUnit.fulfilled]: (state, { payload }) => {
            if (payload.success) {
                return { ...state, pending:false,  units: [...state.units, {...payload.data, ID: payload.success}] };
            } else {
                return { ...state, pending: false, error: payload.success }
            }
        },
        [postUnit.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },


        // EDIT
        [editUnit.pending]: (state) => {
            return { ...state, pending: true }
        },
        [editUnit.fulfilled]: (state, { payload }) => {
            return {
                ...state, pending: false, units: [
                    ...state.units.map(e => e.ID === payload.data.ID ?
                         { ...e, AMOUNT: payload.data.AMOUNT, CODE: payload.data.CODE} 
                        : e)
                ]
            };
        },
        [editUnit.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },

        // DELETE
        [deleteUnit.pending]: (state) => {
            return { ...state, pending: true }
        },
        [deleteUnit.fulfilled]: (state, { payload }) => {
            if(payload.success === true){
                return { ...state, pending: false, units: [...state.units.filter(e => e.ID !== payload.id)], error: "success" };
            }else if(payload.success === false){
                return {...state, pending: false, error: false}
            }else{
                return {...state, pending: false, error: "hasChild"}
            }
        },
        [deleteUnit.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },
    },
});

export const getAllUnits = (state) => state.units.units;
export const { removeErrors } = unitSlice.actions

export default unitSlice.reducer;