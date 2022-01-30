import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const {REACT_APP_API_URL} = process.env

const url = REACT_APP_API_URL+"Categories"


export const fetchAsyncCategory = createAsyncThunk(
  "category/fetchAsyncCategory",
  async () => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ localStorage.getItem('token')
    }
    const response = await axios.get(url, {headers});
    return response.data;
  }
);

export const postAsyncCategory = createAsyncThunk(
  "category/postAsyncCategory",
  async (postedData) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ localStorage.getItem('token')
    }
    const res = await axios.post(url, postedData, {headers});
    return {
      data: postedData,
      success: res.data
    };
  }
);

export const editAsyncCategory = createAsyncThunk(
  "category/editAsyncCategory",
  async (edittedData) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ localStorage.getItem('token')
    }
    const res = await axios.put(`${url}/${edittedData.ID}`, edittedData, {headers});
    return {
      data: edittedData,
      success: res.data
    }
  }
);

export const deleteAsyncCategory = createAsyncThunk(
  "category/deleteAsyncCategory",
  async (id) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ localStorage.getItem('token')
    }
    const res = await axios.delete(`${url}/${id}`, {headers});
    return {
      id: id,
      success: res.data
    };
  }
);

const initialState = {
  pending: false,
  error: "",
  categories: []
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    // GET
    [fetchAsyncCategory.pending]: (state) => {
      return {...state, pending: true}
    },
    [fetchAsyncCategory.fulfilled]: (state, { payload }) => {
      return { ...state, pending:false, categories: payload,  };
    },
    [fetchAsyncCategory.rejected]: () => {
      console.log("Rejected!");
    },

    // POST
    [postAsyncCategory.pending]: (state) => {
      return {...state, pending: true}
    },
    [postAsyncCategory.fulfilled]: (state, {payload}) => {
      if (payload.success) {
        return { ...state, pending:false,  categories: [...state.categories, {...payload.data, ID: payload.success}] };
      }else{
        return { ...state, pending: false, error: payload.success}
      }
      
    },
    [postAsyncCategory.rejected]: () => {
      console.log("post Rejected!");  
    },

    // EDIT
    [editAsyncCategory.pending]: (state) => {
      return {...state, pending: true}
    },
    [editAsyncCategory.fulfilled]: (state, {payload}) => {
      return { ...state, pending:false,  categories: [
        ...state.categories.map( e => e.ID === payload.data.ID ? {...e, NAME_: payload.data.NAME_, CODE: payload.data.CODE }: e)
      ]};
    },
    [editAsyncCategory.rejected]: () => {
      console.log("put Rejected!");  
    },

    // DELETE
    [deleteAsyncCategory.pending]: (state) => {
      return {...state, pending: true}
    },
    [deleteAsyncCategory.fulfilled]: (state, {payload}) => {
      return { ...state, pending:false,  categories: [...state.categories.filter( e => e.ID !== payload.id)] };
    },
    [deleteAsyncCategory.rejected]: () => {
      console.log("delete Rejected!");  
    },
  },
});

export const getAllCategory = (state) => state.categories.categories;
export default categorySlice.reducer;