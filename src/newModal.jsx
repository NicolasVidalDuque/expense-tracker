import { Form, Modal, Button } from 'react-bootstrap'
import ExpenseList from './ExpenseList'

// TODO: 
//  Set the validation feedback to the cool red under the input instead of the native window alert

function newModal(props){
    const passedFormData = props.formData

    function decideBehaviour(event){
        event.preventDefault()
        if (props.modalData.edit) {
            props.handleSubmitEditElement()
        } else {
            props.handleSubmitAddElement()
        }
    }

    return(
    <Modal show={props.modalData.show} onHide={props.handleClose}>
        <Form onSubmit={decideBehaviour}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalData.edit ? 'Edit' : 'New'} Element</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className='mb-2'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control name='title' type='text' value={passedFormData.title} onChange={props.handleChange} required />
                </Form.Group>
                <Form.Group className='mb-2' >
                    <Form.Label>Value</Form.Label>
                    <Form.Control value={passedFormData.value} name='value' type='text' onChange={props.handleChange} required />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Check name='sponsored' type='checkbox' htmlFor = 'Sponsored' label='Sponsored' checked={passedFormData.sponsored} onChange={props.handleChange}/>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant='primary' type='submit'>Save</Button>
                </div>
            </Modal.Body>
        </Form>
    </Modal>
    )
}

export default newModal