import React from "react";
import { Stack } from "react-bootstrap";
import menu_icon from './assets/bars-solid.svg'

function listComponent(props){
    const color = props.sponsored ? '#c0f6c0b2' : 'transparent'
    return(
        <div className="list-element">
            <div id={props.idButton + "button"} className="buttons no-display">
                <button className="DeleteButton" onClick={props.listElementDelete} id={props.idButton}>Delete</button>
                <button className="EditButton" onClick={(event) => {props.handleClickShowModal(event.target, true)}} id={props.idButton}>Edit</button>
            </div>
            <Stack  className='element-info px-2 py-1' direction='horizontal' gap='2' style={{backgroundColor: color}}>
                <button className="MenuButton" onClick={(event) => {props.setDisplayMenu(event.target)}}> <img src={menu_icon}/></button>
                <Stack className="title-date" gap='0'>
                    <h6 className="my-0 text-uppercase">{props.title}</h6>
                    <p className="fs-7 text-muted mb-1">{props.date}</p>
                </Stack>
                <h2>{props.value}</h2>
            </Stack>
        </div>
    )
}

export default listComponent
