import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React from "react"

function App() {

  let post = '메이플의 아버지';
  let [title, setTitle] = useState(['정상화의 마술사', '리선족의 학살자', '건강화의 선각자']);
  let [postIdx, setPostIdx] = useState(0);
  let [tUpCnt, setTUpCnt] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [titleInput, setTitleInput] = useState('');

  function setTitleFnc(newTitle, idx){
    title[idx] = newTitle;
    setTitle([...title])
  }
  return (
    <div className="App">
      
      <div className="black-nav">
        <h4>신창섭 블로그</h4>
      </div>
      <button onClick={()=>{
        let copy = [...title].sort();
        setTitle(copy);
        }}>가나다순 정렬</button>
      <button onClick={()=>{
        let copy = [...title];
        copy[0] = "아아 리스항구족 소멸됐구나";
        setTitle(copy);
        }}>리선족 소멸</button>
      {/* <div className="list">
        <h4 onClick={()=>{modal? setModal(false): setModal(true) }}>{title[0]} <span onClick={()=>{ tUpCnt_E(tUpCnt+1)}}>🔥</span> {tUpCnt}</h4>
        <p>8월 10일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>8월 10일 발행</p>
      </div>
      <div className="list">
        <h4 >{title[2]}</h4>
        <p>8월 10일 발행</p>
      </div> */}

      {
        title.map(function(a, i){
          return ( <div className="list" key={i}>
            <h4 onClick={()=>{modal? setModal(false): setModal(true); setPostIdx(i); }}>{title[i]}
              <span onClick={(e)=>{ e.stopPropagation();
                tUpCnt[i] = tUpCnt[i]+1
                setTUpCnt([...tUpCnt]);}}>🔥</span> {tUpCnt[i]} <button onClick={()=>{title.splice(i, 1); setTitle([...title])}}>삭제</button></h4>
            <p>8월 10일 발행</p>
          </div>)
        })
      }
      <span>제목: </span><input onChange={(e)=>{setTitleInput(e.target.value);} } type="text"></input>
      <button onClick={()=>{title.unshift(titleInput); setTitle([...title])}}>글작성</button>
      { 
        modal ? <Modal setTitleFnc = {setTitleFnc} postIdx = {postIdx} title= {title}/>:''
      }
      <Modal2></Modal2>
    </div>
  );
}


function Modal(props){
  return (
    <div>
      <h4 className='modal'>{props.title[props.postIdx]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{props.setTitleFnc("인장 주작은 뭐야", props.postIdx) }}>글 수정</button>
    </div>
  )
}

class Modal2 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name : "김창섭",
      age : 20
    }
  }
  render(){
    return(
      <div>안녕 {this.state.name}
      <button onClick={()=>{
        this.setState({name : "신창섭"})
      }}>GOD</button>
      </div>

    )
  }
}

export default App;
