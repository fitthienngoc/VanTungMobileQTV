import React, { Component } from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Card, CardHeader, Button, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
// Datatables
require('datatables.net-bs')
require('datatables.net-bs4/js/dataTables.bootstrap4.js')
require('datatables.net-bs4/css/dataTables.bootstrap4.css')
require('datatables.net-buttons')
require('datatables.net-buttons-bs')
require('datatables.net-responsive')
require('datatables.net-responsive-bs')
require('datatables.net-responsive-bs/css/responsive.bootstrap.css')
require('datatables.net-buttons/js/buttons.colVis.js') // Column visibility
require('datatables.net-buttons/js/buttons.html5.js') // HTML 5 file export
require('datatables.net-buttons/js/buttons.flash.js') // Flash file export
require('datatables.net-buttons/js/buttons.print.js') // Print view button
require('datatables.net-keytable');
require('datatables.net-keytable-bs/css/keyTable.bootstrap.css')
require('jszip/dist/jszip.js');
require('pdfmake/build/pdfmake.js');
require('pdfmake/build/vfs_fonts.js');
class Areas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            dropdownOpen1: false,
            dropdownOpen2: false,
        };
    }

    showStatus = () => {
        var { status } = this.props.data
        if(!status ) status = "Status: All" 
           if (status == 1)  status = "Status: Finish" 
                if(status == 2)  status = "Status: Pending" 
                   if(status == -1)  status = "Status: Cancel" 
                      if(status == -2)  status = "Status: Refund" 
                           if (status == 5)  status = "Status: Lock"

        return status
    }

    showTicket = () =>{
        var {typeTicket} = this.props.data
        if(!typeTicket) typeTicket ="Ticket: All"
        if(typeTicket == 1)  typeTicket ="Ticket: E-Ticket"
        if(typeTicket == 2)  typeTicket ="Ticket: COD"
        return typeTicket
    }

    onSelectStatus = (status) => {
        var {data} = this.props
        data.status = status
        
        this.props.onfilterStatusAndTicket(data)
    }
    onSelectTicket = (typeTicket)=> {
        var {data} = this.props
        data.typeTicket = typeTicket
        
        this.props.onfilterStatusAndTicket(data)
        
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }
    toggle1 = () => {
        this.setState({
            dropdownOpen1: !this.state.dropdownOpen1
        });
    }
    toggle2 = () => {
        this.setState({
            dropdownOpen2: !this.state.dropdownOpen2
        });
    }
    
    
    render() {
        
        var {event_id,event_name} = this.props.data
        return (
            <></>
            // <h3 className="text text-center">
            //     <p>{this.showTicket()}</p>
            //     {this.showStatus()}
            // </h3>
            // <Row>

            //     <Col md={1}></Col>
            //     <Col md={2}>
            //         <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            //             <DropdownToggle className="btn-oval">
            //                 {this.showStatus()}
            //             </DropdownToggle>
            //             <DropdownMenu className="dropdown-menu animated fadeIn">
            //                 <DropdownItem ><a className="btn-square btn " onClick={() => this.onSelectStatus("")} >&nbsp;&nbsp;All&nbsp;&nbsp;&nbsp;</a></DropdownItem>
            //                 <DropdownItem ><a className="btn-square btn " onClick={() => this.onSelectStatus(1)}>&nbsp;&nbsp;Finish&nbsp;&nbsp;&nbsp;</a></DropdownItem>
            //                 <DropdownItem ><a className="btn-square btn " onClick={() => this.onSelectStatus(2)}>&nbsp;&nbsp;Pending&nbsp;&nbsp;&nbsp;</a></DropdownItem>
            //                 <DropdownItem ><a className="btn-square btn" onClick={() => this.onSelectStatus(-1)}>&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;</a></DropdownItem>
            //                 <DropdownItem ><a className="btn-square btn" onClick={() => this.onSelectStatus(-2)}>&nbsp;&nbsp;Refund&nbsp;&nbsp;&nbsp;</a></DropdownItem>
            //                 <DropdownItem ><a className="btn-square btn" onClick={() => this.onSelectStatus(5)}>&nbsp;&nbsp;Lock&nbsp;&nbsp;&nbsp;</a></DropdownItem>
            //             </DropdownMenu>
            //         </Dropdown>
            //     </Col>
            //     <Col md='2'>
            //         <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
            //             <DropdownToggle className="btn-oval">
            //                 {this.showTicket()}
            //             </DropdownToggle>
            //             <DropdownMenu className="dropdown-menu animated fadeIn">
            //                 <DropdownItem ><a className="btn-square btn " onClick={() => this.onSelectTicket("")} >&nbsp;&nbsp;All&nbsp;&nbsp;&nbsp;</a></DropdownItem>
            //                 <DropdownItem ><a className="btn-square btn " onClick={() => this.onSelectTicket(1)} >&nbsp;&nbsp;E-Ticket&nbsp;&nbsp;&nbsp;</a></DropdownItem>
            //                 <DropdownItem ><a className="btn-square btn " onClick={() => this.onSelectTicket(2)} >&nbsp;&nbsp;COD&nbsp;&nbsp;&nbsp;</a></DropdownItem>

            //             </DropdownMenu>
            //         </Dropdown>


            //     </Col>
            //     {event_id ?
            //     <Col md='2'>
            //         <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
            //             <DropdownToggle className="btn-oval">
            //                 Event: {event_id ? event_name : "All"}
            //             </DropdownToggle>
            //             {event_id?<DropdownMenu className="dropdown-menu animated fadeIn">
            //                 <DropdownItem ><a className="btn-square btn " onClick={this.props.onClearEvent} >&nbsp;&nbsp;All&nbsp;&nbsp;&nbsp;</a></DropdownItem>
            //             </DropdownMenu>:null}
            //         </Dropdown>


            //     </Col> : null
            //     }

            // </Row>

        );
    }
}

export default Areas;