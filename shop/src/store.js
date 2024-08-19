import { configureStore, createSlice } from "@reduxjs/toolkit";


let user = createSlice({
    name : 'user',
    initialState : 'kim'
})

let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12,13,14,15,16,17,18]
})


let changPop = createSlice({
    name : 'changPop',
    initialState : [
        {id : 0, name : '바로 리부트 정상화', count : 2},
        {id : 1, name : '다 해줬잖아 (feat.전재학)', count : 1},
    ]

})
export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        changPop : changPop.reducer
    }
})