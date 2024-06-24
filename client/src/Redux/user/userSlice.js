import {createSlice} from '@reduxjs/toolkit'

const initialState={

    currentUser:null,
    loading:false
}

export const userSlice=createSlice({

    name:'user',
    initialState,
    reducers:{

        signinStart:(state)=>{
            
            state.loading=true
        },
        signinSuccess:(state,actions)=>{

            state.currentUser=actions.payload
            state.loading=false
        },
        signinFailure:(state,actions)=>{

            state.loading=false
        }
       
    }
})

export const {signinFailure,signinStart,signinSuccess}=userSlice.actions

export default userSlice.reducer