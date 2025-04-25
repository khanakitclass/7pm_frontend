// import { createSlice } from "@reduxjs/toolkit"

import axios from "axios"

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


// const initialState = {
//     isLoading: false,
//     subcategory: [],
//     error: null
// }

// const subcategorySlice = createSlice({
//     name: 'subcategory',
//     initialState,
//     reducers: {
//         getSubCategory: (state, action) => {

//         },
//         addSubCategory: (state, action) => {
//             state.subcategory = state.subcategory.concat(action.payload)
//         },
//         deleteSubCategory: (state, action) => {
//             state.subcategory = state.subcategory.filter((v) => v.id !== action.payload);
//         },
//         updateSubCategory: (state, action) => {
//             console.log(action.payload);

//             state.subcategory = state.subcategory.map((v) => {
//                 if (v.id === action.payload.id) {
//                     return action.payload
//                 } else {
//                     return v
//                 }
//             })
//         }
//     }
// });

// export const { addSubCategory, getSubCategory, deleteSubCategory, updateSubCategory } = subcategorySlice.actions;
// export default subcategorySlice.reducer;

const initialState = {
    isLoading: false,
    subcategory: [],
    error: null
}

export const getSubCategory = createAsyncThunk(
    'subcategory/getSubCategory',
    async () => {
        try {
            const response = await axios.get("http://localhost:8000/subcategory");

            console.log(response.data);

            return response.data;

        } catch (error) {
            console.log(error);

        }
    }
);

export const updateSubCategory = createAsyncThunk(
    'subcategory/updateSubCategory',
    async (data) => {
        try {
            console.log(data.id);

            const response = await axios.put("http://localhost:8000/subcategory/" + data.id, data);



            console.log(response.data);

            return response.data
        } catch (error) {
            console.log("kk", error);

        }
    }
)

export const deleteSubCategory = createAsyncThunk(
    'subcategory/deleteSubCategory',
    async (id) => {
        try {
            const response = await axios.delete("http://localhost:8000/subcategory/" + id);

            return id;
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const addSubCategory = createAsyncThunk(
    'subcategory/addSubCategory',
    async (data) => {
        const response = await axios.post("http://localhost:8000/subcategory", data);

        console.log(response.data);

        return response.data;

    }
)


const subcategorySlice = createSlice({
    name: 'subcategory',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSubCategory.fulfilled, (state, action) => {
            state.subcategory = action.payload;
        })
        builder.addCase(addSubCategory.fulfilled, (state, action) => {
            state.subcategory = state.subcategory.concat(action.payload)
        })
        builder.addCase(updateSubCategory.fulfilled, (state, action) => {
            state.subcategory = state.subcategory.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })
        builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
            
            state.subcategory = state.subcategory.filter((v) => v.id !== action.payload);
        })
    }
});

export default subcategorySlice.reducer;