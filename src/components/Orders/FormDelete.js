import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
// import {  DropdownItem } from 'reactstrap';

class SweetAlert extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            modal: false,
            reason_comment: ''
        };

    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });

    }
    onDelete = () => {

        let data = {
            id: this.props.id,
            Reason: this.state.reason_comment,
            Status: this.props.Status
        }
        this.props.onDelete(data.id)
        this.toggleModal()
    }

    render() {
        var { reason_comment } = this.state
        return (
            <React.Fragment >
                {/* <button type="button"  onClick={this.toggleModal} className="text text default" >REMOVE</button> */}
                {/* <button className="btn btn-sm btn-danger mr-2 command-edit" onClick={this.toggleModal}><em className="fa fa-trash fa-fw"></em></button> */}
                <Modal isOpen={this.props.isOpenModal} toggle={this.props.toggleModal}>
                    <ModalHeader toggle={this.props.toggleModal}>Bạn chắc chắn muốn xóa!</ModalHeader>
                    {/* <ModalBody>
                        <textarea
                            name="reason_comment"
                            value={reason_comment}
                            onChange={this.onChange}
                            className="reason_comment" rows="4" >

                        </textarea>
                    </ModalBody> */}
                    <ModalFooter>
                        <Button color="primary" onClick={this.onDelete}>
                            OK
                        </Button>
                        <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>

        );
    }

}

export default SweetAlert;