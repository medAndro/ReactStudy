import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, Row, Col} from 'react-bootstrap';
import bg from './img/bg.png';
import { lazy, Suspense, useState, useEffect, createContext } from 'react';
import data from './data.js';
import { Detail,  Banner}  from './pages/detail.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';
import RecentlyViewed from './RecentlyViewed.js';
import { useQuery } from 'react-query';
//import Cart from './pages/Cart.js'
const Cart = lazy(() => import('./pages/Cart.js'));
const Test = lazy(() => import('./pages/Test.js'));
export let Context1 = createContext()

function App() {
  let [changsup, setChangsup] = useState(data);
  let navigate = useNavigate();
  let [btnIdx, setBtnIdx] = useState(2);
  let [loadDisplay, setLoadDisplay] = useState('none');
  let [warnDisplay, setWarnDisplay] = useState('none');
  let [stocks] = useState([10,11,12,13,14,15,16,17,18]);
  let [recentlyObj, setRecentlyObj] = useState([]);
  
  useEffect(() =>{
    let getWatched = localStorage.getItem('watched');
    if(getWatched === null) { 
      localStorage.setItem('watched', JSON.stringify([]))
    }
    
  }, [])

  useEffect(()=>{
    let a = setTimeout(()=>{
      setWarnDisplay(warnDisplay = 'None');
    }, 2000);
    console.log("useEffect 동작 코드")
    return()=>{
        clearTimeout(a)
        console.log("useEffect 동작 전에 실행되는 코드")
    }
  }, [warnDisplay])


  let result = useQuery('getName', ()=>
    axios.get('https://raw.githubusercontent.com/medAndro/ReactStudy/main/shop/public/userdata.json').then((a)=>{
      console.log('요청됨')
      return a.data
    }),
    {staleTime : 2000}
  )


  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=> navigate('/')} style={{ cursor: 'pointer' }}>창섭몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=> navigate('/')}>홈</Nav.Link>
            <Nav.Link onClick={()=> navigate('/Cart')}>카트</Nav.Link>
            <Nav.Link onClick={()=> navigate('/Test')}>테스트페이지</Nav.Link>
          </Nav>
          <Nav className="ms-auto text-light">{ result.isLoading?"로딩중입니다":result.data.name }</Nav>
        </Container>
      </Navbar>
      <RecentlyViewed recentlyObj = {recentlyObj} setRecentlyObj = {setRecentlyObj} />
      <Suspense fallback={<div>로딩중</div>}>
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
              <Banner display={loadDisplay} className='alert alert-info'>신창섭 로딩중...</Banner>
            </Container>

            <Banner display= {warnDisplay} className='alert alert-warning'>더이상은 없어...</Banner>
            {
              <button type="button" class="btn btn-info" onClick={btnIdx<=3?
                ()=>{
                  setLoadDisplay('block');
                  axios.get('https://raw.githubusercontent.com/medAndro/ReactStudy/main/shop/public/god'+ btnIdx +'.json')
                  .then((response)=>{ 
                    let copy = [...changsup, ...response.data];
                    setChangsup(copy);
                    setBtnIdx(btnIdx+1);
                    setLoadDisplay('none');
                  })
                  .catch(()=>{
                    console.log('Get요청  실패');
                    setLoadDisplay('none');
                  })
                }: ()=>{
                  setWarnDisplay('block');
                }
              }>창섭 더 불러오기</button>
            }

          </>
        }/>
        
        <Route path="/detail/:idx" element = {
            <Context1.Provider value = {{stocks}}>
              <Detail setRecentlyObj = {setRecentlyObj} />
            </Context1.Provider>
        }/>
        <Route path="*" element = {<div>없는 페이지입니다</div>}/>
        <Route path="/about" element = { <About/>}>
          <Route path="member" element = { <div>멤버페이지</div>}/>
          <Route path="location" element = { <div>위치페이지</div>}/>
        </Route>
        <Route path="/event" element = { <Event/>}>
          <Route path="one" element = { <div>첫 주문시 메소 정상화 서비스</div>}/>
          <Route path="two" element = { <div>생일기념 기간제 선물</div>}/>
        </Route>
        <Route path="/test" element = { <Test/>}>
        </Route>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      </Suspense>
    </div>
  );
}
function Goods(props){
  let navigate = useNavigate();
  return(
    <Col md={4}>
      <div onClick={()=>{navigate('/detail/'+props.idx)}}  style={{ cursor: 'pointer' }}>
      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        <img 
          src={process.env.PUBLIC_URL + props.obj.src} 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <h4>{props.obj.title}</h4>
      <p>{props.obj.content}</p>
      </div>
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
