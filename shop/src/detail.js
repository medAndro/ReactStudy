import {Container, Row, Col} from 'react-bootstrap';
function detail(props){
    return(
        <Container>
            <Row>
                <Col md={6}>
                    <img src={process.env.PUBLIC_URL + props.obj.src} />
                </Col>
                <Col md={6}>
                    <h4 className="pt-5">{props.obj.title}</h4>
                    <p>{props.obj.content}</p>
                    <p>{props.obj.price}</p>
                </Col>               
            </Row>
        </Container>
    )
  }

export default detail;