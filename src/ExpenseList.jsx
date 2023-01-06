import React from "react";
import { Container } from "react-bootstrap";
import ListComponent from "./ListComponent";
import { currencyFormater } from "./assets/currencyFormater";


function ExpenseList(props){
    const list = props.expenses.map(item => {
            return(
                <ListComponent 
                    key = {item.id}
                    idButton = {item.id}
                    date = {item.date}
                    title = {item.title}
                    value = {currencyFormater.format(item.value)}
                    sponsored = {item.sponsored}
                    sponsoredAmount = {item.sponsoredAmount}
                    listElementDelete = {props.listElementDelete}
                    handleClickShowModal = {props.handleClickShowModal}
                />
            )
        }
    )

    return (
        <Container fluid className="px-0" id='list--container'>
            {list}
        </Container>
    )
}

export default ExpenseList