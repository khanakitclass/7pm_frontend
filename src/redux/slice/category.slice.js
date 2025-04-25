import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/baseURL";
import axiosInstance from "../../utils/axiosInstance";

const initialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const createCategory = createAsyncThunk(
    'category/createCategory',
    async (data) => {
        console.log(data);
        
        const response = await axios.post("http://localhost:8000/api/v1/category/add-category", data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        console.log(response.data);
        
        return response.data.data
    }
);

export const getCategories = createAsyncThunk(
    "category/getCategories",
    async () => {
        try {
            const response = await axiosInstance.get("category/list-categories");

            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'category/deleteCategory',
    async (id) => {
        try {
            const response = await axios.delete(BASE_URL + "category/delete-category/" + id);

            return response.data.data._id;
        } catch (error) {
            
        }
    }
);

export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async (data) => {
        try {
            const response = await axios.put(BASE_URL + 'category/update-category/' + data._id, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.data;
        } catch (error) {
            console.log(error);
            
        }
    }
)

const categorySlice = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(createCategory.fulfilled, (state, action) => {
            state.categories = state.categories.concat(action.payload)
        })
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((v) => v._id !== action.payload);
        })
        builder.addCase(updateCategory.fulfilled, (state, action) => {
            state.categories = state.categories.map((v) => {
                if (v._id === action.payload._id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }
});

export default categorySlice.reducer