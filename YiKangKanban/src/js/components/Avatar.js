import React from 'react'
import ReactDOM from 'react-dom'
import ReactAvatarEditor from 'react-avatar-editor'

/**
 * image
 * onSrcChange
 * width
 * height
 * uploadUrl
 * getImageUrl
 * onTempUrlChange: 更换照片后，新照片的服务器地址回调通知函数
 */
export class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            allowZoomOut: false,
            position: {
                x: 0.5,
                y: 0.5
            },
            scale: 1,
            rotate: 0,
            borderRadius: 0,
            width: this.props.width,
            height: this.props.height,
            preview: null,
        }
    }

    openEditorModal() {
        this.setState({
            isEditorOpen: true
        });
    }

    hideEditorModal() {
        this.setState({
            isEditorOpen: false
        });
    };

    //上传新的图片文件
    handleNewImage(e) {
        this.setState({
            image: e.target.files[0]
        })
    }

    //预览修改后的头像
    handleSave(data) {
        const img = this.editor.getImageScaledToCanvas().toDataURL();
        const rect = this.editor.getCroppingRect();

        //Base64编码加号上传后变空格问题
        const str = img.replace(/\+/g, "%2B");

        fetch(this.props.uploadUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'base64Data=' + str,
            })
            .catch(error => {
                console.log("delete item error", error);
                this.onMessage("error", "保存" + this.props.dataTypeName + "记录失败");
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    console.log("保存成功, 返回地址", data.obj);
                    this.props.onTempUrlChange(this.props.getImageUrl + "/" + data.obj);
                }
            })

        this.setState({
            preview: {
                img,
                rect,
                scale: this.state.scale,
                width: this.state.width,
                height: this.state.height,
            }
        });
    }


    //图片缩放
    handleScale(e) {
        const scale = parseFloat(e.target.value)
        this.setState({
            scale
        })
    }

    handleAllowZoomOut(e) {
        this.setState({
            allowZoomOut: e.target.checked
        })
    }

    logCallback(e) {
        console.log('callback', e)
    }

    handlePositionChange(position) {
        console.log('Position set to', position)
        this.setState({
            position
        })
    }

    setEditorRef(editor) {
        if (editor) this.editor = editor
    }
    onChangeImageClick() {
        this.refs.id_image.click();
        console.log("onContainerClick");
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xs-6">
                        <div style={{margin:'0 20px 10px'}}>          
                            <button type="button" class="btn btn-primary" onClick={this.onChangeImageClick.bind(this)}>更改图片</button>
                            <input name='newImage' ref="id_image" type='file' onChange={this.handleNewImage.bind(this)} style={{display:"none"}}/>
                        </div>
                    </div>
                    <div class="col-xs-6">
                        <button type="button" class="btn btn-default" onClick={this.handleSave.bind(this)}>&nbsp;预览 &nbsp;</button>                            
                    </div>                        
                </div>

                <div class="row">
                    <div class="col-xs-6">
                        <ReactAvatarEditor
                          ref={this.setEditorRef.bind(this)}
                          scale={parseFloat(this.state.scale)}
                          width={this.props.width}
                          height={this.state.height}
                          position={this.state.position}
                          onPositionChange={this.handlePositionChange.bind(this)}
                          rotate={parseFloat(this.state.rotate)}
                          onSave={this.handleSave.bind(this)}
                          onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
                          onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
                          onImageReady={this.logCallback.bind(this, 'onImageReady')}
                          onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
                          onDropFile={this.logCallback.bind(this, 'onDropFile')}
                          image={this.state.image || this.state.tempImageUrl || '/images/none.png'}
                          />
                    </div>
                    <div class="col-xs-6">
                        <div style={{border:'1px solid #ccc', backgroudColor:'lightgray', padding:'10px', float:'left'}}>
                        {!!this.state.preview ?
                            <img src={this.state.preview.img} />
                         :   
                            <div style={{width:'200px', height:'200px'}}>
                            </div>
                        }
                        </div>
                    </div>
                </div>
                <div class="row">
                    <input
                          name='scale'
                          type='range'
                          onChange={this.handleScale.bind(this)}
                          min={'0.1'}
                          max='2'
                          step='0.01'
                          defaultValue='1'
                        />                
                </div>
            </div>
        )
    }
}

export class ImageWithRect extends React.Component {
    componentDidMount() {
        this.redraw()
    }

    componentDidUpdate() {
        this.redraw()
    }

    setCanvas(canvas) {
        if (canvas) this.canvas = canvas
    }

    handleImageLoad() {
        const ctx = this.canvas.getContext('2d')
        const {
            rect,
            width,
            height
        } = this.props

        ctx.clearRect(0, 0, width, height)

        ctx.strokeStyle = 'red'

        if (rect && (rect.width > 1 || rect.height > 1)) {
            ctx.drawImage(
                this.imgElement,
                Math.round(-rect.x * (width / rect.width)),
                Math.round(-rect.y * (height / rect.height)),
                Math.round(width / rect.width),
                Math.round(height / rect.height)
            )

            if (rect) {
                ctx.strokeRect(1, 1, Math.round(width) - 2, Math.round(height) - 2)
            }
        } else {
            ctx.drawImage(this.imgElement, 0, 0, width, height)

            if (rect) {
                ctx.strokeRect(
                    Math.round(rect.x * width) + 0.5,
                    Math.round(rect.y * height) + 0.5,
                    Math.round(rect.width * width),
                    Math.round(rect.height * height)
                )
            }
        }
    }

    redraw() {
        const img = new Image()
        img.src = this.props.image
        img.onload = this.handleImageLoad.bind(this)
        this.imgElement = img
    }

    render() {
        return (
            <canvas
        ref={this.setCanvas.bind(this)}
        style={this.props.style}
        width={this.props.width}
        height={this.props.height}
      />
        )
    }
}