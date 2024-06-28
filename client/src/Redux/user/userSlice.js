import {createSlice} from '@reduxjs/toolkit'

const initialState={

    currentUser:null,
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
       
       
    }
})

export const {processFailed,processStart,signinSuccess,updateUserSuccess}=userSlice.actions

export default userSlice.reducer