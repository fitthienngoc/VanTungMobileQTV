import React, { Component } from 'react';
import Spinner from '../components/Spinner/Spinner';
import { connect } from 'react-redux';
import { actGetProduct, actUpdateProduct, actCropImgSuccess, actCropImg, actClearCategory } from '../actions/tn_shop/product'
import ContentWrapper from '../components/Layout/ContentWrapper';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    FormFeedback,
    FormText,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Input,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import Select from 'react-select';
import { ChromePicker, SketchPicker } from 'react-color'



import CropIMG from '../components/CropIMG';
import { array } from 'jszip/dist/jszip';
import { actLoadDataCategories } from '../actions/tn_shop/categorie';

class ProductsActionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Id: '',
            code: 'MB-',
            name: '',
            quality: 0,
            screen: 0,
            screenName: 'Đang cập nhật',
            screenPixel: 'Đang cập nhật',
            screenWidth: 'Đang cập nhật',
            screenCam_ung: 'Đang cập nhật'
            ,
            system: 'Đang cập nhật',
            front_camera: [],
            front_cameraDoPhanGiai: 'Đang cập nhật',
            front_cameraVideoCall: 'Đang cập nhật',
            front_cameraFlash: 'Đang cập nhật',
            front_cameraNangCao: 'Đang cập nhật'
            ,
            back_camera: 'Đang cập nhật',
            back_cameraDoPhanGiai: 'Đang cập nhật',
            back_cameraQuayPhim: 'Đang cập nhật',
            back_cameraFlash: false,
            back_cameraNangCao: 'Đang cập nhật'
            ,
            cpu: [],
            cpuHeDH: 'Đang cập nhật',
            cpuChipset: 'Đang cập nhật',
            cpuSpeed: 'Đang cập nhật',
            cpuChipDoHoa: 'Đang cập nhật',


            ram: 'Đang cập nhật',
            rom: 'Đang cập nhật',
            memorySD: 'Đang cập nhật',
            sim: 'Đang cập nhật',
            mangDiDong: 'Đang cập nhật',
            wifi: 'Đang cập nhật',
            gps: 'Đang cập nhật',
            bluetooth: 'Đang cập nhật',
            ketNoiKhac: 'Đang cập nhật',


            pin: 'Đang cập nhật',
            pinDungLuong: 'Đang cập nhật',
            pinType: 'Đang cập nhật',
            pinCongNghe: 'Đang cập nhật'
            ,
            categories: [

            ],
            sugestCategories: [
                { value: '0', label: 'DT', logo: '' },

            ],
            chat_lieu: 'Đang cập nhật',
            trong_luong: 'Đang cập nhật',
            tinh_nang_dac_biet: 'Đang cập nhật',
            errorAll: '',
            check: true,
            pictures: [],
            thietKe: 'Đang cập nhật',
            displayColorPickerInput: false,
            color: [],
            colorSelected: ''
        };
    }

    colorpickerInputHandleClick = () => {
        this.setState({ displayColorPickerInput: !this.state.displayColorPickerInput })
    };

    colorpickerInputHandleClose = () => {
        this.setState({ displayColorPickerInput: false })
    };

    componentDidMount() {
        this.props.onLoadDataCategories()
        this.props.onClearCategory()
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.onEditItem(this.props.match.params.id)
        }

    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.categories !== this.props.categories) {
            var { categories } = nextProps.categories
            console.log(`data`, categories);

            if (categories.data && categories.data.length) {
                var _categories = []
                categories.data.map((e) => {
                    _categories.push({
                        value: e.id_categorie,
                        label: e.name,
                        logo: e.logo
                    })
                });
                this.setState({
                    sugestCategories: _categories
                })
            }


        }
        if (nextProps.products !== this.props.products) {
            var { itemEditing } = nextProps.products
            // console.log(`itemEditing`, itemEditing);
            var { front_camera, Id, cpu, screen, system, code, name, quality, screenName, screenPixel, screenWidth, screenCam_ung, front_cameraDoPhanGiai, front_cameraVideoCall, front_cameraFlash, front_cameraNangCao, back_cameraDoPhanGiai, back_cameraQuayPhim, back_cameraFlash, back_cameraNangCao, cpuHeDH, cpuChipset, cpuSpeed, cpuChipDoHoa, ram, rom, memorySD, sim, mangDiDong, wifi, gps, bluetooth, ketNoiKhac, pinDungLuong, pinType, pinCongNghe, categories, chat_lieu, trong_luong, tinh_nang_dac_biet, pictures, thietKe } = itemEditing
            if (front_camera === undefined || !front_camera) { front_camera = this.state.front_camera }
            if (cpu === undefined || !cpu) { cpu = this.state.cpu }

            if (system === undefined) { system = this.state.system }
            if (screen === undefined) { screen = this.state.screen }
            if (Id === undefined) { Id = this.state.Id }
            if (name === undefined) { name = this.state.name }
            if (code === undefined) { code = this.state.code }
            if (quality === undefined) { quality = this.state.quality }
            if (screenName === undefined) { screenName = this.state.screenName }
            if (screenPixel === undefined) { screenPixel = this.state.screenPixel }
            if (screenWidth === undefined) { screenWidth = this.state.screenWidth }
            if (screenCam_ung === undefined) { screenCam_ung = this.state.screenCam_ung }
            if (front_cameraDoPhanGiai === undefined) { front_cameraDoPhanGiai = this.state.front_cameraDoPhanGiai }
            if (front_cameraVideoCall === undefined) { front_cameraVideoCall = this.state.front_cameraVideoCall }
            if (front_cameraFlash === undefined) { front_cameraFlash = this.state.front_cameraFlash }
            if (front_cameraNangCao === undefined) { front_cameraNangCao = this.state.front_cameraNangCao }
            if (back_cameraDoPhanGiai === undefined) { back_cameraDoPhanGiai = this.state.back_cameraDoPhanGiai }
            if (back_cameraQuayPhim === undefined) { back_cameraQuayPhim = this.state.back_cameraQuayPhim }
            if (back_cameraFlash === undefined) { back_cameraFlash = this.state.back_cameraFlash }
            if (back_cameraNangCao === undefined) { back_cameraNangCao = this.state.back_cameraNangCao }
            if (cpuHeDH === undefined) { cpuHeDH = this.state.cpuHeDH }
            if (cpuChipset === undefined) { cpuChipset = this.state.cpuChipset }
            if (cpuSpeed === undefined) { cpuSpeed = this.state.cpuSpeed }
            if (cpuChipDoHoa === undefined) { cpuChipDoHoa = this.state.cpuChipDoHoa }
            if (ram === undefined) { ram = this.state.ram }
            if (rom === undefined) { rom = this.state.rom }
            if (memorySD === undefined) { memorySD = this.state.memorySD }
            if (sim === undefined) { sim = this.state.sim }
            if (mangDiDong === undefined) { mangDiDong = this.state.mangDiDong }
            if (wifi === undefined) { wifi = this.state.wifi }
            if (gps === undefined) { gps = this.state.gps }
            if (bluetooth === undefined) { bluetooth = this.state.bluetooth }
            if (ketNoiKhac === undefined) { ketNoiKhac = this.state.ketNoiKhac }
            if (pinDungLuong === undefined) { pinDungLuong = this.state.pinDungLuong }
            if (pinType === undefined) { pinType = this.state.pinType }
            if (pinCongNghe === undefined) { pinCongNghe = this.state.pinCongNghe }
            if (tinh_nang_dac_biet === undefined) { tinh_nang_dac_biet = this.state.tinh_nang_dac_biet }
            if (categories === undefined || categories == "") { categories = this.state.categories }
            if (chat_lieu === undefined) { chat_lieu = this.state.chat_lieu }
            if (trong_luong === undefined) { trong_luong = this.state.trong_luong }
            if (pictures === undefined) { pictures = this.state.pictures }
            if (thietKe === undefined) { thietKe = this.state.thietKe }
            this.setState({
                front_camera, color: cpu, Id, screen, system, code, name, quality, screenName, screenPixel, screenWidth, screenCam_ung, front_cameraDoPhanGiai, front_cameraVideoCall, front_cameraFlash, front_cameraNangCao, back_cameraDoPhanGiai, back_cameraQuayPhim, back_cameraFlash, back_cameraNangCao, cpuHeDH, cpuChipset, cpuSpeed, cpuChipDoHoa, ram, rom, memorySD, sim, mangDiDong, wifi, gps, bluetooth, ketNoiKhac, pinDungLuong, pinType, pinCongNghe, categories, chat_lieu, trong_luong, tinh_nang_dac_biet, pictures, thietKe
            })

        }


    }

    getFiles(files) {
        if (files.length) {
            var { pictures } = this.state
            if (!Array.isArray(pictures)) {
                pictures = []
            }
            files.map((e, i) => {
                pictures.push(e)
            });
            this.setState({ pictures: pictures })
        }

    }

    getFilesBanner(files) {
        this.setState({ front_camera: files })
        console.log(this.state)
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        });

    }

    onSelectCategories = (categorie) => {
        // console.log(categorie);np

        var { categories } = this.state
        if (!categories) categories = []
        var i = true
        // console.log(`categories`, categories);
        categories.map((e) => {

            if (e.value == categorie.value) { i = false }
        });

        if (i) categories.push(categorie)

        this.setState({
            categories
        })

    }

    onSave = (e) => {

        e.preventDefault();

        this.setState({
            errorAll: '',
            check: true
        });

        var check = true
        var { Id, screen, system,
            code,
            name,
            quality,
            // screen,
            screenName,
            screenPixel,
            screenWidth,
            screenCam_ung
            ,
            // system,
            front_camera,
            front_cameraDoPhanGiai,
            front_cameraVideoCall,
            front_cameraFlash,
            front_cameraNangCao
            ,
            // back_camera,
            back_cameraDoPhanGiai,
            back_cameraQuayPhim,
            back_cameraFlash,
            back_cameraNangCao
            ,
            // cpu,
            cpuHeDH,
            cpuChipset,
            cpuSpeed,
            cpuChipDoHoa,


            ram,
            rom,
            memorySD,
            sim,

            mangDiDong,
            wifi,
            gps,
            bluetooth,
            ketNoiKhac,


            pinDungLuong,
            pinType,
            pinCongNghe
            ,
            categories,
            chat_lieu,
            trong_luong,
            tinh_nang_dac_biet,
            check,
            pictures,
            thietKe,
            color,
        } = this.state

        // console.log(this.state);

        if (system, color, front_camera, code && name && quality && screenName && screenPixel && screenWidth && screenCam_ung && front_cameraDoPhanGiai && front_cameraVideoCall && front_cameraFlash && front_cameraNangCao && back_cameraDoPhanGiai && back_cameraQuayPhim && back_cameraNangCao && cpuHeDH && cpuChipset && cpuSpeed && cpuChipDoHoa && ram && rom && memorySD && sim && mangDiDong && wifi && gps && bluetooth && ketNoiKhac && pinDungLuong && pinType && pinCongNghe && categories && chat_lieu && trong_luong && tinh_nang_dac_biet && pictures && thietKe) {
            var body = {
                front_camera, Id, screen, system, code, name, quality, screenName, screenPixel, screenWidth, screenCam_ung, front_cameraDoPhanGiai, front_cameraVideoCall, front_cameraFlash, front_cameraNangCao, back_cameraDoPhanGiai, back_cameraQuayPhim, back_cameraFlash, back_cameraNangCao, cpuHeDH, cpuChipset, cpuSpeed, cpuChipDoHoa, ram, rom, memorySD, sim, mangDiDong, wifi, gps, bluetooth, ketNoiKhac, pinDungLuong, pinType, pinCongNghe, categories, chat_lieu, trong_luong, tinh_nang_dac_biet, pictures, thietKe
            };
            back_cameraFlash ? body.back_cameraFlash = '1' : body.back_cameraFlash = '0'
            // console.log(`pictures`, pictures);
            // console.log(`categories`, categories);
            body.pictures = JSON.stringify(pictures)
            body.categories = JSON.stringify(categories)
            body.cpu = JSON.stringify(color)
            body.front_camera = JSON.stringify(front_camera)
            if (Id) {
                this.props.onUpdateProduct(body)
            } else {

                body.Id = ''
                this.props.onUpdateProduct(body)
            }
        } else {
            check = false
            // console.log(this.state);

            this.setState({
                errorAll: 'Vui lòng nhập đầy đủ thông tin!',
            })
        }

        this.setState({ check })



    }

    onRemove = (picture) => {
        var { pictures } = this.state

        if (pictures && pictures.length) {
            pictures.forEach((e, i) => {
                if (e == picture) pictures.splice(i, 1)

            });
        }
        this.setState({
            pictures
        })
    }
    onRemoveCategorie = (categorie) => {
        var { categories } = this.state

        if (categories && categories.length) {
            categories.forEach((e, i) => {
                if (e == categorie) categories.splice(i, 1)

            });
        }
        this.setState({
            categories
        })
    }

    showImages = (pictures) => {
        var res = ''
        if (pictures && pictures.length) {
            res = pictures.map((image, i) => {
                return <div style={{ float: 'left', padding: 10 }} key={i}>
                    <img style={{ margin: 10, width: 200, padding: 5, boxShadow: '1px 1px 1px 1px' }} src={image.base64} /><span onClick={() => this.onRemove(image)} style={{ position: 'absolute', paddingTop: 0 }} className="fa fa-close" /></div >
            });

        }

        return <fieldset>
            <h3 className="text-center">{this.state.name}</h3>
            <h4 className="text-center">{this.state.system} VNĐ</h4>
            {res}
        </fieldset>
    }

    showCategories = (categories) => {

        var res = ''
        if (categories && categories.length) {
            res = categories.map((categorie, i) => {
                return <div style={{ float: 'left', padding: 10 }} key={i}>
                    <p>{categorie.label}</p>
                    <img style={{ margin: 10, width: 100, padding: 5, boxShadow: '1px 1px 1px 1px' }} src={categorie.logo} />
                    <span onClick={() => this.onRemoveCategorie(categorie)} style={{ position: 'absolute', paddingTop: 0 }} className="fa fa-close" />
                </div >
            });

        }

        return <fieldset className="text-center">
            {res}
        </fieldset>
    }

    onAddNewColor = (value) => {
        var { color } = this.state
        color.push({
            nameColor: '',
            code: value
        })
        this.setState({
            color,
            colorSelected: ''
        })
    }
    onChange2 = (e) => {
        var target = e.target;
        var name = target.name
        var value = target.value
        var { color } = this.state
        // console.log(`name`, name);
        color[name].nameColor = value
        this.setState({
            color
        })
    }
    showColor = (colors) => {
        var r = ''
        if (colors && colors.length > 0)
            r = colors.map((e, i) => {
                return <div key={i}>
                    <br />
                    <InputGroup className="colorpicker-component demo-colorpicker">

                        <Input
                            placeholder="Tên Màu"
                            type="text"
                            name={i}
                            value={this.state.color[i].nameColor}
                            onChange={this.onChange2}
                            className="form-control-rounded form-control"
                        />
                        <InputGroupText style={{ backgroundColor: `${this.state.color[i].code}` }} />
                        <InputGroupText onClick={() => {
                            colors.splice(i, 1)
                            this.setState({ color: colors })
                        }}>xóa</InputGroupText>

                    </InputGroup>
                </div>

            });

        return r


    }
    render() {
        const popover = {
            position: 'absolute',
            zIndex: '302',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        var { products } = this.props

        var {
            sugestCategories,
            Id, screen, system,
            code,
            name,
            quality,
            screenName,
            screenPixel,
            screenWidth,
            screenCam_ung,
            front_cameraDoPhanGiai,
            front_cameraVideoCall,
            front_cameraFlash,
            front_cameraNangCao,
            back_cameraDoPhanGiai,
            back_cameraQuayPhim,
            back_cameraFlash,
            back_cameraNangCao,
            cpuHeDH,
            cpuChipset,
            cpuSpeed,
            cpuChipDoHoa,


            ram,
            rom,
            memorySD,
            sim,

            mangDiDong,
            wifi,
            gps,
            bluetooth,
            ketNoiKhac,


            pinDungLuong,
            pinType,
            pinCongNghe
            ,
            categories,
            chat_lieu,
            trong_luong,
            tinh_nang_dac_biet,
            errorAll,
            check,
            pictures,
            thietKe, color, front_camera
        } = this.state

        return products.isFetching ? <Spinner /> :
            <ContentWrapper>
                <div className="content-heading">
                    <div>{Id ? "Chỉnh sửa" : "Thêm mới"}</div>
                </div>
                <Row>

                    <Col lg={2} />
                    <Col lg={8}>
                        <Card className="card">
                            <div className={products.isFetching ? "card-body whirl sphere" : "card-body"}><br />
                                <form onSubmit={this.onSave} data-parsley-validate="" noValidate className="form-horizontal">
                                    <div className="panel panel-default">

                                        {front_camera && front_camera.base64 && <div className="text-center" style={{ padding: 10 }}>
                                            <img style={{ margin: 10, width: 400, padding: 5, boxShadow: '1px 1px 1px 1px' }} src={front_camera.base64} />
                                            <span onClick={() => this.setState({ front_camera: [] })} style={{ position: 'absolute', paddingTop: 0 }} className="fa fa-close" />
                                        </div >}
                                        {this.showImages(pictures)}
                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Banner (700x400)</label>
                                                <div className="text-center" style={{ maxHeight: 52 }}>
                                                    <div className="col-md-6 custom-file-input-plus">


                                                    </div>

                                                    <div
                                                        style={{
                                                            position: 'absolute', marginTop: -30, opacity: 0, height: 10
                                                        }}
                                                    >
                                                        <FileBase64

                                                            multiple={false}
                                                            onDone={this.getFilesBanner.bind(this)} />

                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Hình Ảnh</label>
                                                <div className="text-center" style={{ maxHeight: 52 }}>
                                                    <div className="col-md-6 custom-file-input-plus">


                                                    </div>
                                                    {pictures.length} ảnh
                                                    <div
                                                        style={{
                                                            position: 'absolute', marginTop: -52, opacity: 0, height: 40
                                                        }}
                                                    >
                                                        <FileBase64

                                                            multiple={true}
                                                            onDone={this.getFiles.bind(this)} />

                                                    </div>
                                                </div>
                                            </FormGroup>
                                        </fieldset>

                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Name</label>
                                                <div className="col-md-6">
                                                    <Input
                                                        type="text"
                                                        name="name"
                                                        value={name}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control"
                                                    />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Danh mục</label>
                                                <div className="col-md-6">
                                                    <Select
                                                        type="text"
                                                        name="categories"
                                                        // value={categories}
                                                        onChange={this.onSelectCategories}
                                                        options={sugestCategories}
                                                    // className="form-control-rounded form-control"
                                                    />
                                                </div>

                                            </FormGroup>

                                        </fieldset>
                                        {this.showCategories(categories)}


                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Mã Sản Phẩm</label>
                                                <div className="col-md-6">
                                                    <Input
                                                        type="text"
                                                        name="code"
                                                        value={code}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control"
                                                    />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Màu</label>
                                                <div className="col-md-6">
                                                    <InputGroup className="colorpicker-component demo-colorpicker">
                                                        <InputGroupAddon addonType="append">
                                                            <InputGroupText onClick={() => this.colorpickerInputHandleClick()}>{this.state.colorSelected ? this.state.colorSelected : "Chọn Màu"}</InputGroupText>
                                                        </InputGroupAddon>

                                                        {this.state.colorSelected ?
                                                            <InputGroupAddon addonType="append">
                                                                <InputGroupText onClick={() => this.onAddNewColor(this.state.colorSelected)}><i className="icon-plus"></i></InputGroupText>
                                                            </InputGroupAddon>
                                                            : null}
                                                    </InputGroup>



                                                    {this.showColor(color)}

                                                    {this.state.displayColorPickerInput ? <div style={popover}>
                                                        <div style={cover} onClick={this.colorpickerInputHandleClose} />
                                                        <SketchPicker color={this.state.colorSelected} onChange={color => {
                                                            this.setState({ colorSelected: color.hex })
                                                        }
                                                        } />
                                                    </div> : null}


                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Số lượng</label>
                                                <div className="col-md-6">
                                                    <Input
                                                        type="number"
                                                        name="quality"
                                                        value={quality}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control"
                                                    />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Giá (VNĐ)</label>
                                                <div className="col-md-6">
                                                    <Input
                                                        type="number"
                                                        name="system"
                                                        value={system}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control"
                                                    />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>

                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Giảm Giá</label>
                                                <div className="col-md-6">
                                                    <Input
                                                        type="number"
                                                        name="screen"
                                                        value={screen}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control"
                                                    />
                                                </div>
                                            </FormGroup>
                                        </fieldset>


                                        <fieldset>
                                            <legend className="text-center">Màn hình</legend>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Công nghệ</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="screenName"
                                                        value={screenName}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Độ phân giải</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="screenPixel"
                                                        value={screenPixel}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Màn hình rộng</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="screenWidth"
                                                        value={screenWidth}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Màn hình cảm ứng</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="screenCam_ung"
                                                        value={screenCam_ung}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="text-center">Camera Sau</legend>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Độ phân giải</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="back_cameraDoPhanGiai"
                                                        value={back_cameraDoPhanGiai}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Quay phim</label>
                                                <div className="col-md-6">
                                                    <Input type="textarea"
                                                        row={4}
                                                        name="back_cameraQuayPhim"
                                                        value={back_cameraQuayPhim}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Đèn Flash</label>

                                                <div className="col-md-6 ">
                                                    <label className="checkbox c-checkbox c-checkbox-rounded">
                                                        <Input type="checkbox"

                                                            name="back_cameraFlash"
                                                            checked={back_cameraFlash}
                                                            onChange={this.onChange}
                                                            className="form-check-input" />
                                                        <span className="fa fa-check"></span>

                                                    </label>
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Chụp ảnh nâng cao</label>
                                                <div className="col-md-6">
                                                    <Input type="textarea"
                                                        row={4}

                                                        name="back_cameraNangCao"
                                                        value={back_cameraNangCao}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                        </fieldset>

                                        <fieldset>
                                            <legend className="text-center">Camera Trước</legend>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Độ phân giải</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="front_cameraDoPhanGiai"
                                                        value={front_cameraDoPhanGiai}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Videocall</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="front_cameraVideoCall"
                                                        value={front_cameraVideoCall}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Thông tin khác</label>
                                                <div className="col-md-6">
                                                    <Input type="textarea"
                                                        row={4}
                                                        name="front_cameraNangCao"
                                                        value={front_cameraNangCao}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>


                                        <fieldset>

                                        </fieldset>

                                        {/* /ssss? */}
                                        <fieldset>
                                            <legend className="text-center">Hệ điều hành - CPU</legend>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Hệ điều hành</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="cpuHeDH"
                                                        value={cpuHeDH}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Chipset (hãng SX CPU)</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="cpuChipset"
                                                        value={cpuChipset}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Tốc độ CPU</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="cpuSpeed"
                                                        value={cpuSpeed}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Chip đồ họa (GPU)</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="cpuChipDoHoa"
                                                        value={cpuChipDoHoa}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>

                                        {/*Bộ nhớ & Lưu trữ  */}
                                        <fieldset>
                                            <legend className="text-center">Bộ nhớ và Lưu trữ</legend>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">RAM</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="ram"
                                                        value={ram}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Bộ nhớ trong</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="rom"
                                                        value={rom}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Thẻ nhớ ngoài</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="memorySD"
                                                        value={memorySD}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        {/*Kết nối  */}
                                        <fieldset>
                                            <legend className="text-center">Kết nối</legend>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Mạng di động</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="mangDiDong"
                                                        value={mangDiDong}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">SIM</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="sim"
                                                        value={sim}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Wifi</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="wifi"
                                                        value={wifi}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">GPS</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="gps"
                                                        value={gps}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Bluetooth</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="bluetooth"
                                                        value={bluetooth}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Kết nối khác</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="ketNoiKhac"
                                                        value={ketNoiKhac}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        {/*Thiết kế & Trọng lượng  */}
                                        <fieldset>
                                            <legend className="text-center">Thiết kế & Trọng lượng</legend>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Thiết kế</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="thietKe"
                                                        value={thietKe}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Chất liệu</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="chat_lieu"
                                                        value={chat_lieu}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Trọng lượng</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="trong_luong"
                                                        value={trong_luong}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>

                                        {/*Thông tin pin & Sạc  */}
                                        <fieldset>
                                            <legend className="text-center">Thông tin pin & Sạc</legend>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Dung lượng pin</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="pinDungLuong"
                                                        value={pinDungLuong}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Loại pin</label>
                                                <div className="col-md-6">
                                                    <Input type="text"

                                                        name="pinType"
                                                        value={pinType}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        <fieldset>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Công nghệ pin</label>
                                                <div className="col-md-6">
                                                    <Input type="textarea"
                                                        row={4}
                                                        name="pinCongNghe"
                                                        value={pinCongNghe}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                        {/* Tính năng đặc biệt */}
                                        <fieldset>
                                            <legend className="text-center">Tính năng đặc biệt</legend>
                                            <FormGroup row>
                                                <label className="col-md-3 col-form-label text-right">Tính năng đặc biệt</label>
                                                <div className="col-md-6">
                                                    <Input
                                                        type="textarea"
                                                        row={4}
                                                        name="tinh_nang_dac_biet"
                                                        value={tinh_nang_dac_biet}
                                                        onChange={this.onChange}
                                                        className="form-control-rounded form-control" />
                                                </div>
                                            </FormGroup>
                                        </fieldset>




                                        <div className="text-center">
                                            {errorAll}
                                        </div>

                                        <fieldset>
                                            <FormGroup row>
                                                <div className="col-sm-3 text-right">
                                                    <Link to="/products" className="btn btn-square btn-default">Back</Link>
                                                </div>
                                                <div className="col-sm-6">
                                                    <button className="btn btn-square btn-primary" type="submit">Save</button>
                                                </div>
                                            </FormGroup>
                                        </fieldset>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </ContentWrapper>



    }
}

const mapStatetoProps = state => {
    return {
        products: state.products,
        categories: state.categories,

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {

        onClearCategory: () => {
            dispatch(actClearCategory());
        },
        onEditItem: (id) => {
            dispatch(actGetProduct(id));
        },
        onUpdateProduct: (body) => {
            dispatch(actUpdateProduct(body))
        },

        onLoadDataCategories: () => {
            dispatch(actLoadDataCategories())
        },

    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ProductsActionContainer);