import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_URL } = process.env
const url = REACT_APP_API_URL + "Submarks"


export const fetchSubmarks = createAsyncThunk(
    "submarks/fetchSubmarks",
    async () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const response = await axios.get(url, { headers });
        return response.data;
    }
);

export const postSubmark = createAsyncThunk(
    "submarks/postSubmark",
    async (postedData) => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const res = await axios.post(url, postedData, { headers });
        console.log(res);
        return {
            data: postedData,
            success: res.data[0]
        };
    }
);

export const editSubmark = createAsyncThunk(
    "submarks/editSubmark",
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

export const deleteSubmark = createAsyncThunk(
    "submarks/deleteSubmark",
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
    submarks: []
};

const submarkSlice = createSlice({
    name: "submarks",
    initialState,
    reducers: {},
    extraReducers: {

        // GET
        [fetchSubmarks.pending]: (state) => {
            return { ...state, pending: true }
        },
        [fetchSubmarks.fulfilled]: (state, { payload }) => {
            return { ...state, pending: false, submarks: payload, };
        },
        [fetchSubmarks.rejected]: () => {
            console.log("Rejected!");
        },

        // POST
        [postSubmark.pending]: (state) => {
            return { ...state, pending: true }
        },
        [postSubmark.fulfilled]: (state, { payload }) => {
            console.log(payload);
            if (payload.success) {
                return {
                    ...state, pending: false, submarks: [...state.submarks,
                    {
                        ...payload.data,
                        ID: payload.success.ID, MARK_NAME: payload.success.MARK_NAME,
                        MARK_CODE: payload.success.MARK_CODE
                    }]
                };
            } else {
                return { ...state, pending: false, error: payload.success }
            }

        },
        [postSubmark.rejected]: () => {
            console.log("post Rejected!");
        },


        // EDIT
        [editSubmark.pending]: (state) => {
            return { ...state, pending: true }
        },
        [editSubmark.fulfilled]: (state, { payload }) => {
            return {
                ...state, pending: false, submarks: [
                    ...state.submarks.map(e => e.ID === payload.data.ID ?
                         { ...e, NAME_: payload.data.NAME_, CODE: payload.data.CODE, 
                            MARK_CODE: payload.success.MARK_CODE, MARK_NAME: payload.success.MARK_NAME} 
                        : e)
                ]
            };
        },
        [editSubmark.rejected]: () => {
            console.log("put Rejected!");
        },

        // DELETE
        [deleteSubmark.pending]: (state) => {
            return { ...state, pending: true }
        },
        [deleteSubmark.fulfilled]: (state, { payload }) => {
            return { ...state, pending: false, submarks: [...state.submarks.filter(e => e.ID !== payload.id)] };
        },
        [deleteSubmark.rejected]: () => {
            console.log("delete Rejected!");
        },
    },
});

export const getAllSubmarks = (state) => state.submarks.submarks;
export default submarkSlice.reducer;