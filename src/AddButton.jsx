import React from "react";
import { Button } from "react-bootstrap";

function AddButton(props){
    return(
        <footer id="footer" className="px-2 d-grid fixed-bottom bg-light">
            <Button onClick={() => {props.handleClickShowModal(false)}} className='my-2' variant='primary' size='lg'>Add</Button>
        </footer>
    )
}

export default AddButton; 
