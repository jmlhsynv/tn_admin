import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncCategory = createAsyncThunk(
  "category/fetchAsyncCategory",
  async () => {
    // const response = await axios.get('http://localhost:3001/categories');
    const response = await axios.get('http://localhost:1998/api/Categories');
    return response.data;
  }
);

export const postAsyncCategory = createAsyncThunk(
  "category/postAsyncCategory",
  async (postedData) => {
    // const res = await axios.post('http://localhost:3001/categories', postedData);
    const res = await axios.post('http://localhost:1998/api/Categories', postedData);
    return res.data;
  }
);

export const editAsyncCategory = createAsyncThunk(
  "category/editAsyncCategory",
  async (edittedData) => {
    const res = await axios.put(`http://localhost:3001/categories/${edittedData.id}`, edittedData);
    console.log(res.data);
    return res.data;
  }
);

export const deleteAsyncCategory = createAsyncThunk(
  "category/deleteAsyncCategory",
  async (id) => {
    await axios.delete(`http://localhost:3001/categories/${id}`);
    // console.log(res);
    return id;
  }
);

const initialState = {
  pending: false,
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
      return { ...state, pending:false,  categories: [...state.categories, payload] };
    },
    [postAsyncCategory.rejected]: () => {
      console.log("post Rejected!");  
    },

    // EDIT
    [editAsyncCategory.pending]: (state) => {
      return {...state, pending: true}
    },
    [editAsyncCategory.fulfilled]: (state, {payload}) => {
      return { ...state, pending:false };
    },
    [editAsyncCategory.rejected]: () => {
      console.log("put Rejected!");  
    },

    // DELETE
    [deleteAsyncCategory.pending]: (state) => {
      return {...state, pending: true}
    },
    [deleteAsyncCategory.fulfilled]: (state, {payload}) => {
      return { ...state, pending:false,  categories: [...state.categories.filter( e => e.id !== payload)] };
    },
    [deleteAsyncCategory.rejected]: () => {
      console.log("post Rejected!");  
    },
  },
});

export const getAllCategory = (state) => state.categories.categories;
export default categorySlice.reducer;