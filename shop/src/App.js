import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import bg from './img/bg.png';
import { useState } from 'react';
import data from './data.js';
import Detail from './pages/detail.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'

function App() {
  let [changsup] = useState(data);
  let navigate = useNavigate();
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">창섭몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=> navigate('/')}>홈</Nav.Link>
            <Nav.Link onClick={()=> navigate('/detail')}>상세 페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg" style={{ backgroundImage : 'url('+ bg +')'}}></div>
            <Container>
              <Row>
                {
                  changsup.map(function(obj, i){
                    return (
                      <Goods idx = {i} obj = {obj} />
                    )
                  })
                }
              </Row>
            </Container>
          </>
        }/>
        <Route path="/detail/:idx" element = { <Detail obj={changsup}/>}/>
        <Route path="*" element = {<div>없는 페이지입니다</div>}/>
        <Route path="/about" element = { <About/>}>
          <Route path="member" element = { <div>멤버페이지</div>}/>
          <Route path="location" element = { <div>위치페이지</div>}/>
        </Route>
        <Route path="/event" element = { <Event/>}>
          <Route path="one" element = { <div>첫 주문시 메소 정상화 서비스</div>}/>
          <Route path="two" element = { <div>생일기념 기간제 선물</div>}/>
        </Route>
      </Routes>

    </div>
  );
}
function Goods(props){
  return(
    <Col md={4}>
      <img src={process.env.PUBLIC_URL + props.obj.src} />
      <h4>{props.obj.title}</h4>
      <p>{props.obj.content}</p>
    </Col>
  )
}

function About(props){
  return(
    <Col md={4}>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </Col>
  )
}

function Event(props){
  return(
    <Col md={4}>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </Col>
  )
}

export default App;
