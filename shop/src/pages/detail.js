import { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

let Btn = styled.button`
    background : ${props => props.bg};
    color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`

let Banner = styled.div`
    display : ${props => props.display}
`

function Detail(props){
    let {idx} = useParams();
    let [display, setDisplay] = useState('block');
    let [alert, setAlert] = useState(true);
    let [numRestrict, setNumRestrict] = useState(false);
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
    return(
        <Container>
            <Banner display= {display} className='alert alert-warning'>2초 이내 구매시 할인(css)</Banner>
            {
                alert?
                <div className='alert alert-warning'>5초 이내 구매시 할인</div>
                :null

            }
            
            {cnt}
            <Btn onClick={()=> setCnt(cnt+1)} bg='blue'>버튼</Btn>
            {idx<props.obj.length? 
            <Row>
                <Col md={6}>
                    <img src={process.env.PUBLIC_URL + props.obj[idx].src} />
                </Col>
                <Col md={6}>
                    {
                    numRestrict?
                    <div className='alert alert-danger'>숫자만 입력하세요</div>
                    :null
                    }
                    <input type="text" onChange={(e)=>{setNumRestrict(isNaN(e.target.value))}}></input>
                    <h4 className="pt-5">{props.obj[idx].title}</h4>
                    <p>{props.obj[idx].content}</p>
                    <p>{props.obj[idx].price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </Col>               
            </Row>:<div>상품이 없습니다</div>
            }
        </Container>
    )
  }

export default Detail;