import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_URL } = process.env;

const url = REACT_APP_API_URL + "Items";

// export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + localStorage.getItem("token"),
//   };
//   const response = await axios.get(url, { headers });
//   return response.data[0];
// });

export const fetchByRow = createAsyncThunk("items/fetchByRow", async (row) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const response = await axios.get(`${url}?page=${row}`, { headers });
  return response.data[0];
});

export const postItem = createAsyncThunk(
  "items/postItem",
  async (postedData) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const res = await axios.post(url, postedData, { headers });
    console.log(postedData);
    console.log(res.data[0]);
    return {
      data: postedData,
      success: res.data[0],
    };
  }
);

export const editItem = createAsyncThunk(
  "items/editItem",
  async (edittedData) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    };
    const res = await axios.put(`${url}/${edittedData.ID}`, edittedData, {
      headers,
    });
    console.log(res.data);
    return {
      data: edittedData,
      success: res.data[0],
    };
  }
);

export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const res = await axios.delete(`${url}/${id}`, { headers });
  return {
    id: id,
    success: res.data,
  };
});

const initialState = {
  pending: false,
  error: "",
  page: 1,
  page_count: 1,
  items: [],
};

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    removeErrors: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    // GET
    [fetchByRow.pending]: (state) => {
      return { ...state, pending: true };
    },
    [fetchByRow.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pending: false,
        items: payload.data,
        page: payload.PAGE_NUMBER,
        page_count: payload.PAGE_COUNT,
      };
    },
    [fetchByRow.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: 401 };
    },

    // GET by row
    // [fetchItems.pending]: (state) => {
    //   return { ...state, pending: true };
    // },
    // [fetchItems.fulfilled]: (state, { payload }) => {
    //   return {
    //     ...state,
    //     pending: false,
    //     items: payload.data,
    //     page: payload.PAGE_NUMBER,
    //     page_count: payload.PAGE_COUNT,
    //   };
    // },
    // [fetchItems.rejected]: (state, { payload }) => {
    //   return { ...state, pending: false, error: 401 };
    // },
    // POST
    [postItem.pending]: (state) => {
      return { ...state, pending: true };
    },
    [postItem.fulfilled]: (state, { payload }) => {
      if (payload.success) {
        return {
          ...state,
          pending: false,
          items: [...state.items, payload.success],
        };
      } else {
        return { ...state, pending: false, error: payload.success };
      }
    },
    [postItem.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: 401 };
    },

    // EDIT
    [editItem.pending]: (state) => {
      return { ...state, pending: true };
    },
    [editItem.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        pending: false,
        items: [
          ...state.items.map((e) =>
            e.ID === payload.data.ID ? { ...payload.data } : e
          ),
        ],
      };
    },
    [editItem.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: 401 };
    },

    // DELETE
    [deleteItem.pending]: (state) => {
      return { ...state, pending: true };
    },
    [deleteItem.fulfilled]: (state, { payload }) => {
      if (payload.success === true) {
        return {
          ...state,
          pending: false,
          items: [...state.items.filter((e) => e.ID !== payload.id)],
          error: "success",
        };
      } else if (payload.success === false) {
        return { ...state, pending: false, error: false };
      } else {
        return { ...state, pending: false, error: "hasChild" };
      }
    },
    [deleteItem.rejected]: (state, { payload }) => {
      return { ...state, pending: false, error: 401 };
    },
  },
});

export const getAllItems = (state) => state.units.units;
export const { removeErrors } = itemSlice.actions;

export default itemSlice.reducer;
