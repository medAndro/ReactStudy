import { useDeferredValue, useState, useTransition } from "react"

let a =new Array(1000).fill(0)
function Test(){
    let [name, setName] = useState('')
    let [isPending, startTransition] = useTransition()
    let state = useDeferredValue(name) //늦게 처리를 원하는 스테이트
    return(
        <div className ="Test">
        <div>테스트페이지</div>
            
            <input onChange={(e)=>{startTransition(()=>{
                setName(e.target.value)
            })}}/>
            {
                isPending?"로딩중":
                a.map(()=>{
                    return <div>{state}</div>
                })
            }
        </div>
    )
}

export default Test