import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { URL_WEB } from '../../constants/Config'
import moneyFormat from '../../helpers/formatPrice'
import cleanUrl from '../../helpers/cleanURL'

class ProductNormal extends Component {

    render() {
        var item = this.props.data
        var bill = this.props.bill
        // console.log('bill', bill)
        return (
            item && <div className="row">
                <div className="col-7 text-center">
                    {item.pictures && item.pictures.map((pic, index) => {
                        if (index < 3) return <a key={index} href={`${URL_WEB}/chi-tiet/${cleanUrl(item.name)}/${item.Id}`}><img className="thumb96" src={pic.base64} alt="Logo" /></a>

                    })

                    }</div>
                <div className="col-5">
                    <h3 className="mt-0">{item.name} </h3>
                    <ul className="list-unstyled mb-0">
                        <li className="mb-1"><em className="fa fa-barcode  fa-fw"></em> {item.code}</li>
                        <li className="mb-1">Số lượng: {bill.quality_by}</li>
                        <li className="mb-1">Màu: {bill.color_by.nameColor}</li>
                        <li className="mb-1">Giá: {moneyFormat(bill.system)}</li>
                        <li className="mb-1">Sale:{bill.screen}%</li>
                        <li className="mb-1">Thành tiền: {moneyFormat((bill.system - bill.system * bill.screen / 100) * bill.quality_by)}</li>

                    </ul>
                </div>
                <br></br>
            </div>
        )
    }
}

export default ProductNormal;