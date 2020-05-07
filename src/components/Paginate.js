import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class Paginate extends Component {
    render() {
        var { paginate } = this.props;
        console.log(`paginate`, paginate);
        return (
            <div className="row">
                <div className="col-sm-4">
                    <div className="dataTables_info" role="status" aria-live="polite">

                        {paginate.data && paginate.data.length ? <> Show {paginate.start} - {paginate.start + paginate.data.length} of total ({paginate.total_records}) </> : null}
                    </div>
                </div>
                {paginate.total_records
                    ?
                    <div className="col-sm-8">
                        <div className="dataTables_paginate paging_simple_numbers">
                            <ReactPaginate
                                breakLabel={<span>...</span>}
                                breakClassName={"disabled"}
                                pageCount={paginate.total_page}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={2}
                                onPageChange={(data) => this.props.onFilter('page', data.selected + 1)}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                pageClassName={"paginate_button page-item"}
                                pageLinkClassName={"page-link"}
                                forcePage={paginate.current_page - 1}
                                activeClassName={"active"}
                                previousClassName={"paginate_button page-item previous"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"paginate_button page-item next"}
                                nextLinkClassName={"page-link"}
                                disabledClassName={"disabled"}
                            />
                        </div>
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default Paginate;
