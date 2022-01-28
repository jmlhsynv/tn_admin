import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_URL } = process.env

const url = REACT_APP_API_URL + "Marks"


export const fetchMarks = createAsyncThunk(
    "marks/fetchMarks",
    async () => {
        const headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
        const response = await axios.get(url, { headers });
        return response.data;
    }
);
export const postMark = createAsyncThunk(
    "marks/postMarj",
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
const initialState = {
    pending: false,
    error: "",
    marks: []
};

const markSlice = createSlice({
    name: "marks",
    initialState,
    reducers: {},
    extraReducers: {
        // GET
        [fetchMarks.pending]: (state) => {
            return { ...state, pending: true }
        },
        [fetchMarks.fulfilled]: (state, { payload }) => {
            return { ...state, pending: false, marks: payload, };
        },
        [fetchMarks.rejected]: () => {
            console.log("Rejected!");
        },

        // POST
        [postMark.pending]: (state) => {
            return { ...state, pending: true }
        },
        [postMark.fulfilled]: (state, { payload }) => {
            console.log(payload);
            if (payload.success) {
                return { ...state, pending: false, marks: [...state.marks, 
                    { ...payload.data, 
                        ID: payload.success.ID, CATEGORY_NAME: payload.success.CATEGORY_NAME, 
                        CATEGORY_CODE: payload.success.CATEGORY_CODE 
                    }] 
                };
            } else {
                return { ...state, pending: false, error: payload.success }
            }

        },
        [postMark.rejected]: () => {
            console.log("post Rejected!");
        },
    },
});

export const getAllMarks = (state) => state.marks.marks;
export default markSlice.reducer;