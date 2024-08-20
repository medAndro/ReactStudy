import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function RecentlyViewed(props){
    let navigate = useNavigate();
  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      width: '200px',
      backgroundColor: 'white',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      padding: '10px',
      borderRadius: '5px'
    }}>
      <h5>최근 본 항목</h5>
      <ListGroup>
        {props.recentlyObj.map((o, index) => (
          <ListGroup.Item  onClick={()=> navigate('/detail/'+o.idx)} key={index}>
            {o.title}
          </ListGroup.Item>
        ))}
          <Button onClick= {()=>{

            let getWatched = localStorage.getItem('watched');

            if(getWatched != null) { 
                localStorage.setItem('watched', JSON.stringify([]))
            }
            props.setRecentlyObj([])
          }}variant="danger">비우기</Button>

      </ListGroup>
    </div>
  );
};

export default RecentlyViewed;