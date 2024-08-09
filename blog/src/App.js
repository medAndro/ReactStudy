import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let post = '메이플의 아버지';
  let [title, b] = useState(['정상화의 마술사', '리선족의 학살자', '건강화의 선각자']);

  return (
    <div className="App">
      <div className="black-nav">
        <h4>신창섭 블로그</h4>
      </div>
      <div className="list">
        <h4>{title[0]}</h4>
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
    </div>
  );
}

export default App;
