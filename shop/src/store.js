import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from './store/userSlice'


let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12,13,14,15,16,17,18]
})


let changPop = createSlice({
    name : 'changPop',
    initialState : [
        {id : 9, name : '바로 리부트 정상화', count : 2},
        {id : 10, name : '다 해줬잖아 (feat.전재학)', count : 1},
    ],
    reducers : {
        addCount(state, action){
            state.find(item => item.id === action.payload).count += 1; //직접 찾아서 값 추가
        },
        delCount(state, action){
            let curItem = state.find(item => item.id === action.payload)
            if (curItem.count == 1){
                let findIdx = state.findIndex((item)=>{ return item.id === action.payload})// 인덱스 번호로 찾기
                state.splice(findIdx, 1);
            }else{
                curItem.count -= 1;
            }
        },
        addItem(state, action) {
            //state.push({id : 8, name : '다 해줬잖아 (feat.전재학)', count : 1})
            const exists = state.some(item => item.id === action.payload.id);
            if (!exists) {
                state.push(action.payload);
            }else{
                state.find(item => item.id === action.payload.id).count += 1;
            }
        }
    }

})
export let {addItem, addCount, delCount} = changPop.actions

export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        changPop : changPop.reducer
    }
})