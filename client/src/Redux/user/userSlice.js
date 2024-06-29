import {createSlice} from '@reduxjs/toolkit'

const initialState={

    currentUser:null,
    currentEducation:null,
    currentExperience:null,
    loading:false
}

export const userSlice=createSlice({

    name:'user',
    initialState,
    reducers:{

        processStart:(state)=>{
            
            state.loading=true
        },
        signinSuccess:(state,actions)=>{

            state.currentUser=actions.payload
            state.loading=false
        },
        processFailed:(state,actions)=>{

            state.loading=false
        },
        updateUserSuccess:(state,actions)=>{

            state.currentUser=actions.payload
            state.loading=false
        },
        updateEducationSuccess:(state,actions)=>{
            
            state.currentEducation=actions.payload
        },
        updateExperienceSuccess:(state,action)=>{

            state.currentExperience=action.payload
        }
       
       
    }
})

export const {processFailed,processStart,signinSuccess,updateUserSuccess,updateEducationSuccess,updateExperienceSuccess}=userSlice.actions

export default userSlice.reducer