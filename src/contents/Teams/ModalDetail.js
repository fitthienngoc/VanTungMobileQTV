import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    } from 'reactstrap';

class SweetAlert extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            modal: false,
        };

    }


    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {

        return (
            <React.Fragment>
                <Button color="primary" onClick={this.toggleModal}>+Read more</Button>
                <Modal size="500" isOpen={this.state.modal} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>About Team</ModalHeader>
                    <ModalBody>
                        <div className="about_team" dangerouslySetInnerHTML={{ __html: this.props.AboutTeam }}></div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }

}

export default SweetAlert;