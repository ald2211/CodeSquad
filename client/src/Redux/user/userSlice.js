import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser } from '../../api/service';

 export const fetch_user = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return rejectWithValue('No token found');
    } 
    try{
        const userData = await fetchUser(token);
        return userData.data;
    }catch(err){
        console.log('errAtSlice:',err)
    }
        
   
});

const initialState = {
    currentUser: null,
    currentEducation: null,
    currentExperience: null,
    currentProjects: [],
    userWorks:[],
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        processStart: (state) => {
            state.loading = true;
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        processFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        updateEducationSuccess: (state, action) => {
            state.currentEducation = action.payload;
        },
        updateExperienceSuccess: (state, action) => {
            state.currentExperience = action.payload;
        },
        updateProjectSuccess: (state, action) => {
            state.currentProjects = action.payload;
        },
        updateWorkSuccess:(state,action)=>{
            state.userWorks=action.payload
            state.loading=false;
        },
        signoutSuccess: (state) => {
            state.currentUser = null;
            state.currentEducation = null;
            state.currentExperience = null;
            state.currentProjects = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetch_user.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetch_user.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.loading = false;
            })
            .addCase(fetch_user.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    processFailed,
    processStart,
    signinSuccess,
    updateUserSuccess,
    updateEducationSuccess,
    updateExperienceSuccess,
    updateProjectSuccess,
    updateWorkSuccess,
    signoutSuccess
} = userSlice.actions;

export default userSlice.reducer;
