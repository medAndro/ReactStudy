import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
function Cart(){
    let state = useSelector((state)=> {return state})
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>노래명</th>
                <th>수량</th>
                <th>변경하기</th>
            </tr>
            </thead>
            <tbody>
            {
                state.changPop.map(function(obj, i){
                    return (
                      <CartItems idx = {i} obj = {obj} />
                    )
                  })
            }
            </tbody>
        </Table>
    )
}

function CartItems(props){
    return(
        <tr>
        <td>{props.obj.id}</td>
        <td>{props.obj.name}</td>
        <td>{props.obj.count}</td>
        <td>안녕</td>
        </tr>
    )
}
export default Cart