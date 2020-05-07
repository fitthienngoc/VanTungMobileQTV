import React, { Component } from 'react';
import Datatable from '../Users/Datatable';
class AreaList extends Component {
    state = {
        dtOptions2: {
            'paging': false, // Table pagination
            'ordering': true, // Column ordering
            'info': false, // Bottom left status text
            searching :false,
            responsive: false,
            // Text translation options
            // Note the required keywords between underscores (e.g _MENU_)
            oLanguage: {
                sSearch: '<em class="fa fa-search"> Tìm trong trang</em>',
                sLengthMenu: '_MENU_ records per page',
                info: 'Showing page _PAGE_ of _PAGES_',
                zeroRecords: 'Nothing found - sorry',
                infoEmpty: 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)',
                oPaginate: {
                    sNext: '<em class="fa fa-caret-right"></em>',
                    sPrevious: '<em class="fa fa-caret-left"></em>'
                }
            },
            // Datatable Buttons setup
            // dom: 'Bfrtip',
            // buttons: [
            //     { extend: 'copy', className: 'btn-info' },
            //     { extend: 'csv', className: 'btn-info' },
            //     { extend: 'excel', className: 'btn-info', title: 'XLS-File' },
            //     { extend: 'pdf', className: 'btn-info', title: $('title').text() },
            //     { extend: 'print', className: 'btn-info' }
            // ]
        },

    }
    render() {
        var { children } = this.props;
        return (
            <div className="row">
                <div className="table-responsive col-sm-12">
                    <Datatable options={this.state.dtOptions2}>
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Ticket</th>
                                    <th>Customer's Info</th>
                                    <th>Event</th>
                                    
                                    {/* <th>FullName</th>
                                    <th>Telephone</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>City</th> */}
                                    {/* <th>Type</th> */}
                                    {/* <th>Status</th> */}
                                    {/* <th>TransactionCode</th> */}
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                    </Datatable>
                </div>
            </div>
        );
    }
}

export default AreaList;
