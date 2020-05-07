import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentWrapper from '../components/Layout/ContentWrapper'
import { Card, CardHeader, CardBody, Row, Col, Input, FormGroup } from 'reactstrap'
import { dispatch } from 'd3'
import { actGetProduct, } from '../actions/tn_shop/product'
import { actRepComment } from '../actions/tn_shop/comment'

class CommentRepContatiner extends Component {
    state = ({
        id_comment: '',
        Id: "0",
        user: "0",
        content: "",
        verify: false,
        rating: "",
        id_product: "",
        fullName: "",
        time: "",
        content_rep: "",
    })
    componentDidMount() {
        var { match } = this.props
        if (match && match.params && match.params.id_product) {
            this.props.onGetComment(match.params.id_product)
            if (match.params.id_comment) {
                this.setState({
                    id_comment: match.params.id_comment
                })
            }
        }

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.products != this.props.products) {
            var { dataComment } = nextProps.products
            if (Array.isArray(dataComment.data) && dataComment.data.length > 0) {
                dataComment.data.map((e, i) => {
                    if (e.Id == this.state.id_comment) {
                        e.id_comment = e.Id
                        this.setState(e)
                    }
                });
            }

        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });

    }
    onSave = () => {
        var { content_rep, Id } = this.state
        if (content_rep.length < 500) {
            this.props.onRepComment(Id, content_rep)

        } else { alert('Nội dung dưới 500 ký tự!') }
    }
    render() {
        console.log(`this.state`, this.state);
        var { Id,
            user,
            content,
            verify,
            rating,
            id_product,
            fullName,
            time,
            content_rep, } = this.state
        return (
            <div>
                <ContentWrapper>
                    <div className="content-heading">
                        <div>Xem và phản hồi bình luận</div>
                    </div>
                    <Card className="card">
                        {/* <CardHeader></CardHeader> */}
                        <CardBody>
                            <Row>
                                <Col><div className="media">
                                    <div className="media-body">
                                        <h4 id="media-heading">
                                            {fullName}
                                            <small> {time}</small>
                                        </h4>
                                        <p>{content}</p>

                                    </div>
                                </div>
                                </Col>
                                <Col>
                                    <fieldset>
                                        <div className="media">
                                            <div className="media-body">
                                                <h4 id="media-heading">
                                                    Trả lời
                                            {/* <small> {time}</small> */}
                                                </h4>
                                                {/* <p>{content_rep}</p> */}
                                                <Input type='textarea' value={content_rep} name='content_rep' onChange={this.onChange} />


                                            </div>
                                        </div>
                                    </fieldset>

                                    <fieldset>
                                        <FormGroup row>

                                            <div className="col-sm-6">
                                                <button className="btn btn-square btn-primary" onClick={this.onSave} type="submit">Save</button>
                                            </div>
                                        </FormGroup>
                                    </fieldset>
                                </Col>

                            </Row>

                        </CardBody>
                    </Card>
                </ContentWrapper>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    products: state.products
})

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetComment: (id) => {
            dispatch(actGetProduct(id));
        },
        onRepComment: (Id,content_rep) => {
            dispatch(actRepComment(Id,content_rep));
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentRepContatiner)
