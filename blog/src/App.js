import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = '메이플의 아버지';
  let [title, title_E] = useState(['정상화의 마술사', '리선족의 학살자', '건강화의 선각자']);
  let [tUpCnt, tUpCnt_E] = useState(0);

  return (
    <div className="App">
      
      <div className="black-nav">
        <h4>신창섭 블로그</h4>
      </div>
      <button onClick={()=>{
        let copy = [...title].sort();
        title_E(copy);
        }}>가나다순 정렬</button>
      <button onClick={()=>{
        let copy = [...title];
        copy[0] = "아아 리스항구족 소멸됐구나";
        title_E(copy);
        }}>리선족 소멸</button>
      <div className="list">
        <h4>{title[0]} <span onClick={()=>{ tUpCnt_E(tUpCnt+1) }}>🔥</span> {tUpCnt}</h4>
        <p>8월 10일 발행</p>
      </div>
      <div className="list">
        <h4>{title[1]}</h4>
        <p>8월 10일 발행</p>
      </div>
      <div className="list">
        <h4>{title[2]}</h4>
        <p>8월 10일 발행</p>
      </div>
      <Modal/>
      <Normalization/>
    </div>
  );
}


function Modal(){
  return (
    <div>
      <h4 className='modal'>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  )
}

function Normalization(){
  return(
    <div>
      <hr></hr>
      <h1>정 상 화!</h1>
    </div>
  )
}
export default App;
