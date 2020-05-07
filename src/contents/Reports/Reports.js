import React, { Component } from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Row,Button } from 'reactstrap';
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
            dropdownOpen1: false
        };
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
    render() {

        var { children } = this.props;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Report</div>
                </div>
                <Card className="card-default">
                    <CardHeader>List Report</CardHeader>
                    <CardBody>
                        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">


                            {/* <Row>
                                <Col md={3}>
                                </Col>
                                <Col md={3}>
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                        <DropdownToggle className="btn-oval"> 
                                            Select Type
                                        </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu animated fadeIn">
                                            <DropdownItem ><Link className="btn-square btn " to={`/banner`}>&nbsp;&nbsp;All&nbsp;&nbsp;&nbsp;</Link></DropdownItem>
                                            <DropdownItem ><Link className="btn-square btn " to={`/banner/team`}>&nbsp;&nbsp;Team&nbsp;&nbsp;&nbsp;</Link></DropdownItem>
                                            <DropdownItem ><Link className="btn-square btn " to={`/banner/event`}>&nbsp;&nbsp;Event&nbsp;&nbsp;&nbsp;</Link></DropdownItem>
                                            <DropdownItem ><Link className="btn-square btn" to={`/banner/venue`}>&nbsp;&nbsp;Venue&nbsp;&nbsp;&nbsp;</Link></DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </Col>
                                <Col md='3'>
                                    <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                                        <DropdownToggle className="btn-oval">
                                            Add Refund
                                            </DropdownToggle>
                                        <DropdownMenu className="dropdown-menu animated fadeIn">
                                            <DropdownItem ><Link className="btn btn-default btn-xs" to={`/banner/create/new/team`}>&nbsp;&nbsp;Team</Link></DropdownItem>
                                            <DropdownItem ><Link className="btn btn-default btn-xs" to={`/banner/create/new/event`}>&nbsp;&nbsp;Event</Link></DropdownItem>
                                            <DropdownItem ><Link className="btn btn-default btn-xs" to={`/banner/create/new/venue`}>&nbsp;&nbsp;Venue</Link></DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>


                                </Col>

                            </Row> */}

                            {children}
                        </div>
                    </CardBody>
                </Card>
            </ContentWrapper>
        );
    }
}

export default Areas;