import React, { Component } from 'react';
import { render } from "react-dom";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Gallery from "react-photo-gallery";
import 'react-toastify/dist/ReactToastify.css';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

const images = [
    "//placekitten.com/1500/500",
    "//placekitten.com/4000/3000",
    "//placekitten.com/800/1200",
    "//placekitten.com/1500/1500"
];


class Areas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            modal: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        // if(this.props.view){
        //     this.setState({
        //         isOpen:true
        //     })
        // }
        console.log("nextProps")
        console.log(nextProps)
    }

    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const { photoIndex, isOpen } = this.state;
        var { images, imageTitle, imageCaption, Photos } = this.props
        return (
            <React.Fragment>
                {Photos.length ? <Gallery onClick={()=>this.setState({isOpen:true,modal:false})} photos={Photos} direction={"column"} /> : null}

                
                    <Modal className="view_post" isOpen={this.state.modal} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>New</ModalHeader>
                        <ModalBody>
                            {Photos.length ? <Gallery onClick={()=>this.setState({isOpen:true,modal:false})} photos={Photos} direction={"column"} /> : null}
                            <div className="about_team" dangerouslySetInnerHTML={{ __html: imageCaption }}></div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggleModal}>Close</Button>
                        </ModalFooter>
                    </Modal>
                

                {isOpen && (
                    <Lightbox
                        enableZoom={false}
                        imageTitle={imageTitle}
                        imageCaption={imageTitle}
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length
                            })
                        }
                    />
                )}
                {imageCaption ? <div className="event-new" dangerouslySetInnerHTML={{ __html: imageCaption.slice(0, 500) }}></div> : null}
                <div className="float-right">
                    <div className="badge badge-info" onClick={this.toggleModal} >read more</div>
                </div>

            </React.Fragment>
        );
    }
}


export default Areas;