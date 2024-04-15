import {configureStore} from "@reduxjs/toolkit"
import {createSlice} from "@reduxjs/toolkit"


const userSlice = createSlice({
    name : 'user',
    initialState : {
        userDetail : null
    },
    reducers : {
        successLogIn(state , action){
            state.userDetail = action.payload
        },
        successLogOut(state){
            state.userDetail = null;
        },
        profilePictureUpdate(state , action){
            
            state.userDetail.avatar = action.payload;
            
        }

    }
})

const store = configureStore({
    reducer : {
        user : userSlice.reducer
    }

})

export default store;
export const userSliceActions = userSlice.actions;