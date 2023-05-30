import React from "react";
import { Stack } from "react-bootstrap";

function listComponent(props){
    const color = props.sponsored ? '#c0f6c0b2' : 'transparent'
    return(
        <Stack  className='px-4 py-1' direction='horizontal' gap='2' style={{backgroundColor: color}}>
            <Stack className="title-date" gap='0'>
                <h6 className="my-0 text-uppercase">{props.title}</h6>
                <p className="fs-7 text-muted mb-1">{props.date}</p>
                <button onClick={props.listElementDelete} id={props.idButton}>Delete</button>
                <button onClick={(event) => {props.handleClickShowModal(event.target, true)}} id={props.idButton}>Edit</button>
            </Stack>
            <h2>{props.value}</h2>
        </Stack>
    )
}

export default listComponent
