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
  reducers: {
    removeErrors: state => {
			state.error = ""
		}
  },
  extraReducers: {
    // GET
    [fetchAsyncCategory.pending]: (state) => {
      return {...state, pending: true}
    },
    [fetchAsyncCategory.fulfilled]: (state, { payload }) => {
      return { ...state, pending:false, categories: payload,  };
    },
    [fetchAsyncCategory.rejected]: (state, {payload}) => {
      return {...state, error: 401}
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
    [postAsyncCategory.rejected]: (state, {payload}) => {
      return {...state, error: 401} 
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
    [editAsyncCategory.rejected]: (state, {payload}) => {
      return {...state, error: 401} 
    },

    // DELETE
    [deleteAsyncCategory.pending]: (state) => {
      return {...state, pending: true}
    },
    [deleteAsyncCategory.fulfilled]: (state, {payload}) => {
      if (payload.success === true) {
        return { ...state, pending:false,  categories: [...state.categories.filter( e => e.ID !== payload.id)], error: "success" };
      }else if( payload.success === false){
        return {...state, pending: false, error: false}
      }else{
        return {...state, pending: false, error: "hasChild"}
      }
    },
    [deleteAsyncCategory.rejected]: (state, {payload}) => {
      return {...state, error: 401}
    },
  },
});

export const getAllCategory = (state) => state.categories.categories;
export const { removeErrors } = categorySlice.actions

export default categorySlice.reducer;