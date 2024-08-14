import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import bg from './img/bg.png';
import { useState } from 'react';
import data from './data.js';
import Detail from './detail.js';
import {Routes, Route, Link} from 'react-router-dom'

function App() {
  let [changsup] = useState(data);
  return (
    <div className="App">


      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">창섭몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href='/'>홈</Nav.Link>
            <Nav.Link href='/detail'>상세 페이지</Nav.Link>
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
        <Route path="/detail" element = {
          <Detail obj={changsup[0]} />
          
        }/>
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
export default App;
