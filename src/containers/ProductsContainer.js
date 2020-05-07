import React, { Component } from 'react';

import { connect } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import Products from '../contents/Products/Products';
import Filter from '../components/Filter';
import ProductList from './../components/Products/ProductList';
import Product from './../components/Products/Product'
import Paginate from '../components/Paginate';
import ConvertURL from '../helpers/ConvertURL';

import { actUpdateProduct,actGetProduct, actLoadDataProducts, actDeleteProduct } from '../actions/tn_shop/product';

class ProductContainer extends Component {

    componentWillMount() {
        var { location } = this.props;
        var search = location.search;
        this.props.onLoadDataProduct(search);
    }
    showFilter() {
        var { location } = this.props;
        return (
            <Filter location={location} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    showListProduct(Product) {
        return (
            <ProductList>
                {this.showItemProduct(Product)}
            </ProductList>
        );
    }
    showItemProduct(products) {
        var { onDeleteProduct } = this.props;
        var result = <tr><td></td><td></td><td></td><td></td></tr>;
        // console.log(products)
        if (products && products.length > 0) {
            
            result = products.map((item, index) => {
                return (
                    <Product key={index}  onDeleteProduct={onDeleteProduct} item={item} index={index}  />
                );
            });
        }
        return result;
    }
    showPaginate(product) {
        return (
            <Paginate paginate={product} onFilter={(key, value) => this.onFilter(key, value)} />
        );
    }
    onFilter(key, value) {
        var { history, location } = this.props;
        var search = '&' + ConvertURL(location.search, key, value);
        // console.log(`search`, search);
        history.push({
            search: search,
        });
        this.props.onLoadDataProduct(search);
    }
    render() {
        var products = this.props.products.products;
        // console.log(this.props.products)
        return (
            <Products>
                {this.showFilter()}
                {
                    this.props.products.isFetching
                        ?
                        <Spinner />
                        :
                        <React.Fragment>
                            {this.showListProduct(products.data)}
                            {this.showPaginate(products)}
                        </React.Fragment>
                }
            </Products>
        );
    }
}

const mapStatetoProps = state => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoadDataProduct: (search) => {
            dispatch(actLoadDataProducts(search));
        },
        onDeleteProduct: (body) => {
            dispatch(actDeleteProduct(body))
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ProductContainer);