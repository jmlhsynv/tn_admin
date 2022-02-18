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
    reducers: {
        removeErrors: state => {
			state.error = ""
		}
    },
    extraReducers: {

        // GET
        [fetchSubmarks.pending]: (state) => {
            return { ...state, pending: true }
        },
        [fetchSubmarks.fulfilled]: (state, { payload }) => {
            return { ...state, pending: false, submarks: payload, };
        },
        [fetchSubmarks.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
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
        [postSubmark.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
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
        [editSubmark.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },

        // DELETE
        [deleteSubmark.pending]: (state) => {
            return { ...state, pending: true }
        },
        [deleteSubmark.fulfilled]: (state, { payload }) => {
            if (payload.success === true) {
                return { ...state, pending: false, submarks: [...state.submarks.filter(e => e.ID !== payload.id)], error: "success" };   
            }else if( payload.success === false){
                return { ...state, pending: false,error: false}
            }else{
                return { ...state, pending: false, error: "hasChild"}
            }
        },
        [deleteSubmark.rejected]: (state, {payload}) => {
            return {...state, pending: false, error: 401}
        },
    },
});

export const getAllSubmarks = (state) => state.submarks.submarks;
export const { removeErrors } = submarkSlice.actions

export default submarkSlice.reducer;