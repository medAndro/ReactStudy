import { Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addAge, changeName } from '../store/userSlice'
import { addCount, delCount } from '../store'
import { memo, useMemo, useState } from 'react'


// let Child = memo(function(){
//     console.log('렌더링')
//     return <div>자식임</div>
// })

// function lazyFunc(){
//     return 1
// }
function Cart(){
    let state = useSelector((state)=> {return state})
    let dispatch = useDispatch()
    let [count, setCount] = useState(0)

    // let result = useMemo(() => {
    //     return lazyFunc()
    // }, [state])
    return (
        <div>
            {/* <Child count={count}></Child>
            <button onClick={()=>{setCount(count+1)}}>+</button> */}
            {state.user.name}({state.user.age}세) 의 장바구니
            <button onClick={()=>{
                                dispatch(changeName())
                            }}>이름변경</button>
            <button onClick={()=>{
                                dispatch(addAge(10))
                            }}>나이먹기</button>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>노래명</th>
                <th>수량</th>
                <th>변경하기</th>
            </tr>
            </thead>
            <tbody>
            {
                state.changPop.map((obj, i)=>
                    <tr key={i}>
                        <td>{obj.id}</td>
                        <td>{obj.name}</td>
                        <td>{obj.count}</td>
                        <td>
                            <button onClick={()=>{
                                dispatch(addCount(obj.id))
                            }}>+</button>
                            <button onClick={()=>{
                                dispatch(delCount(obj.id))
                            }}>-</button>
                        </td>
                    </tr>
                  )
            }
            </tbody>
        </Table>
        </div>
    )
}


export default Cart