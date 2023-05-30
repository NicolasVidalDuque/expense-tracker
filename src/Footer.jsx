import React from "react";
import { Button } from "react-bootstrap";

function Footer(props){
    return(
        <footer className="mx-1 d-grid fixed-bottom bg-light">
            <Button onClick={() => {props.handleClickShowModal(false)}} className='my-2' variant='primary' size='lg'>Add</Button>
        </footer>
    )
}

export default Footer