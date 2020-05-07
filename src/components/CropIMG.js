import React from "react";
import resizebase64  from "resize-base64";
import ReactAvatarEditor from 'react-avatar-editor'



export default class App extends React.Component {
    state = {
        image: 'avatar.jpg',
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1,
        rotate: 0,
        borderRadius: 0,
        preview: null,
        width: 10,
        height: 10,
        newImage: ''
    }

    componentWillMount() {
        this.props.onCropImg(false)
        let { width, height } = this.props.aspect

        this.setState({
            width,
            height
        })
    }
    handleNewImage = e => {
        this.setState({ image: e.target.files[0] })
        this.props.onCropImg(true)




    }

    
    handleScale = e => {

        const scale = parseFloat(e.target.value)
        this.setState({ scale })
        this.onClickSave()
    }

    handlePositionChange = position => {
        this.setState({ position })
        this.onClickSave()
    }

    setEditorRef = (editor) => this.editor = editor


    onClickSave = () => {
        // e.preventDefault();
        if (this.editor) {
            console.log('this.editor')
            console.log(this.editor)
            const img = this.editor.getImageScaledToCanvas().toDataURL();
            this.setState({ newImage: img })
            this.props.onCropImgSuccess(img)
        }
    }

    render() {
        var { aspect } = this.props
        return (
            <div>
                <div>
                    {this.props.isCropImg == true ?
                        <ReactAvatarEditor
                            style={{ width: "50%", height: "auto" }}
                            scale={parseFloat(this.state.scale)}
                            width={this.state.width}
                            height={this.state.height}
                            position={this.state.position}
                            onPositionChange={this.handlePositionChange}
                            rotate={parseFloat(this.state.rotate)}
                            borderRadius={this.state.width / (100 / this.state.borderRadius)}
                            image={this.state.image}
                            className="editor-canvas"
                            ref={this.setEditorRef}
                            onLoadSuccess={(imgInfo) => {
                                this.props.onCropImgSuccess(imgInfo.resource.currentSrc)}}
                                // this.props.onCropImgSuccess(resizebase64(imgInfo.resource.currentSrc, 15000, 3000) )}}
                        />
                        :
                        <img
                            style={{ width: "50%", height: "auto" }}
                            src={this.props.Image}

                        />
                    }
                </div>
                <br />
                New File:
                    <input name="newImage" type="file" onChange={this.handleNewImage} />
                <br />
                Zoom:
                    <input
                    name="scale"
                    type="range"
                    onChange={this.handleScale}
                    min={this.state.allowZoomOut ? '0.1' : '1'}
                    max="2"
                    step="0.01"
                    defaultValue="1"
                />
                {/* <button onClick={this.onClickSave} /> */}
            </div>
        )
    }
}

