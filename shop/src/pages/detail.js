import {Container, Row, Col} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

let Btn = styled.button`
    background : ${props => props.bg};
    color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`
let NewBtn = styled.button(Btn)`

`
function Detail(props){
    let {idx} = useParams();
    return(
        <Container>
            <Btn bg='blue'>버튼</Btn>
            {idx<props.obj.length? 
            <Row>
                <Col md={6}>
                    <img src={process.env.PUBLIC_URL + props.obj[idx].src} />
                </Col>
                <Col md={6}>
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