import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Alert } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import data from '../data.js';
import { Context1 } from '../App.js'
import { addItem } from '../store.js';
import { useDispatch} from 'react-redux'

let Btn = styled.button`
    background : ${props => props.bg};
    color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`

let Banner = styled.div`
    display : ${props => props.display}
`

function Detail(props){
    let maxData = 8;
    let {idx} = useParams();
    let [obj, setObj] = useState('loading');
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let location = useLocation();

    useEffect(()=>{
        setObj('loading');
        const updateLocalStorage = (obj) => {
            let watched = localStorage.getItem('watched');
            if(watched === null) { 
                localStorage.setItem('watched', JSON.stringify([]));
                watched = [];
            }else{
                watched = JSON.parse(watched);
            }
            const isDuplicate = watched.some(item => item.idx === idx);
            if (!isDuplicate) {
                watched.push({"title":obj[idx%3].title, "idx": idx});
            }
            
            localStorage.setItem('watched', JSON.stringify(Array.from(watched)));
            props.setRecentlyObj(Array.from(watched))
        }
        if (idx >= 3 && idx <=maxData ){
            let page = idx<=5? 2:3
            axios.get('https://raw.githubusercontent.com/medAndro/ReactStudy/main/shop/public/god'+ page +'.json')
            .then((response)=>{ 
                setObj([...response.data])
                updateLocalStorage([...response.data]);
            })
            .catch(()=>{
                console.log('Get요청  실패');

            })
        }else{
            setObj(data);
            updateLocalStorage(data);
        }
    }, [location])

    let [display, setDisplay] = useState('block');
    let [alert, setAlert] = useState(true);
    let [numRestrict, setNumRestrict] = useState(false);
    let [tab, setTab] = useState(0);
    useEffect(()=>{
        let a = setTimeout(()=>{
            setDisplay(display = 'None');
        }, 2000);
        let b = setTimeout(()=>{
            setAlert(alert = false);
        }, 5000);
        console.log("useEffect 동작 코드")
        return()=>{
            clearTimeout(a)
            clearTimeout(b)
            console.log("useEffect 동작 전에 실행되는 코드")
        }
    }, []) // mount할때만 작동


    let [cnt, setCnt] = useState(0)

    let [fade, setFade] = useState('')

    useEffect(()=>{
        let a = setTimeout(()=>{
            setFade('end')
        },100)
        
        return ()=>{
            clearTimeout(a);
            setFade('');
        }
    }, [])
    return(
        <Container className={'start '+ fade}>
            <Banner display= {display} className='alert alert-warning'>2초 이내 구매시 할인(css)</Banner>
            {
                alert?
                <div className='alert alert-warning'>5초 이내 구매시 할인</div>
                :null

            }
            {/* {cnt}
            <Btn onClick={()=> setCnt(cnt+1)} bg='blue'>버튼</Btn> */}
            {obj==='loading'?
            
                        <Alert key='info' variant='info'>
                        로딩중
                        </Alert>
            :
            idx<=maxData? 
            <Row>
                <Col md={6}>
                <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img 
                    src={process.env.PUBLIC_URL + obj[idx%3].src} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </div>
                    
                </Col>
                <Col md={6}>
                    {
                    numRestrict?
                    <div className='alert alert-danger'>숫자만 입력하세요</div>
                    :null
                    }
                    <input type="text" onChange={(e)=>{setNumRestrict(isNaN(e.target.value))}}></input>
                    <h4 className="pt-5">{obj[idx%3].title}</h4>
                    <p>{obj[idx%3].content}</p>
                    <p>{obj[idx%3].price}</p>
                    <button className="btn btn-danger" onClick={
                        ()=>{
                            dispatch(addItem({id : idx, name : obj[idx%3].title, count : 1}));
                            navigate('/Cart')
                        }
                    }>장바구니 넣기</button>
                </Col>               
            </Row>:<div>상품이 없습니다</div>
            }
            <Nav variant="tabs" defaultActiveKey="/link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent idx = {idx} obj ={obj[idx%3]} tab = {tab}/>
        </Container>
    )
  }

function TabContent(props){
    let {stocks} = useContext(Context1)
    let [fade, setFade] = useState('')

    useEffect(()=>{
        let a = setTimeout(()=>{
            setFade('end')
        },100)
        
        return ()=>{
            clearTimeout(a);
            setFade('');
        }
    }, [props])

    return (<div className={'start '+ fade}>
       {[ <div>{props.obj.title}</div>,  <div>재고 : {stocks[props.idx]}</div>,  <div>내용2</div>][props.tab]}

    </div>)

}

export {Banner, Detail};