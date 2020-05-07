import React, { Component } from 'react';
import ContentWrapper from '../../components/Layout/ContentWrapper';
import { Card, CardHeader, CardBody } from 'reactstrap';
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
class Tags extends Component {

    render() {
        var { children } = this.props;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <div>Tags</div>
                </div>
                <Card className="card-default">
                    <CardHeader>Tags List</CardHeader>
                    <CardBody>
                        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                            {children}
                        </div>
                    </CardBody>
                </Card>
            </ContentWrapper>
        );
    }
}

export default Tags;