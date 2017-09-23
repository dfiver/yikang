import React from 'react'
import ReactDOM from 'react-dom'
import ReactAvatarEditor from 'react-avatar-editor'

export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allowZoomOut: false,
            position: {
                x: 0.5,
                y: 0.5
            },
            scale: 1,
            rotate: 0,
            borderRadius: 0,
            preview: null,
            width: 150,
            height: 200
        }
    }

    //上传新的图片文件
    handleNewImage(e) {
        this.setState({
            image: e.target.files[0]
        })
    }

    //预览修改后的头像
    handleSave(data) {
        const img = this.editor.getImageScaledToCanvas().toDataURL()
        const rect = this.editor.getCroppingRect()

        this.setState({
            preview: {
                img,
                rect,
                scale: this.state.scale,
                width: this.state.width,
                height: this.state.height,
                borderRadius: this.state.borderRadius
            }
        })
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

    rotateLeft(e) {
        e.preventDefault()
        this.setState({
            rotate: this.state.rotate - 90
        })
    }

    rotateRight(e) {
        e.preventDefault()
        this.setState({
            rotate: this.state.rotate + 90
        })
    }

    handleXPosition(e) {
        const x = parseFloat(e.target.value)
        this.setState({
            position: {
                x: x,
                y: this.state.position.y
            }
        })
    }

    handleYPosition(e) {
        const y = parseFloat(e.target.value)
        this.setState({
            position: {
                x: this.state.position.x,
                y: y
            }
        })
    }

    handleWidth(e) {
        const width = parseInt(e.target.value)
        this.setState({
            width
        })
    }

    handleHeight(e) {
        const height = parseInt(e.target.value)
        this.setState({
            height
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


    render() {
        return (
            <div>
        <ReactAvatarEditor
          ref={this.setEditorRef.bind(this)}
          scale={parseFloat(this.state.scale)}
          width={this.state.width}
          height={this.state.height}
          position={this.state.position}
          onPositionChange={this.handlePositionChange.bind(this)}
          rotate={parseFloat(this.state.rotate)}
          borderRadius={this.state.borderRadius}
          onSave={this.handleSave.bind(this)}
          onLoadFailure={this.logCallback.bind(this, 'onLoadFailed')}
          onLoadSuccess={this.logCallback.bind(this, 'onLoadSuccess')}
          onImageReady={this.logCallback.bind(this, 'onImageReady')}
          onImageLoad={this.logCallback.bind(this, 'onImageLoad')}
          onDropFile={this.logCallback.bind(this, 'onDropFile')}
          image={this.state.image || 'images/20170802020028.jpg'}
        />
        <br />
        New File:
        <input name='newImage' type='file' onChange={this.handleNewImage} />
        <br />
        Zoom:
        <input
          name='scale'
          type='range'
          onChange={this.handleScale.bind(this)}
          min={this.state.allowZoomOut ? '0.1' : '1'}
          max='2'
          step='0.01'
          defaultValue='1'
        />
        <br />
        {'Allow Scale < 1'}
        <input
          name='allowZoomOut'
          type='checkbox'
          onChange={this.handleAllowZoomOut.bind(this)}
          checked={this.state.allowZoomOut}
        />
        <br />
        X Position:
        <input
          name='scale'
          type='range'
          onChange={this.handleXPosition.bind(this)}
          min='0'
          max='1'
          step='0.01'
          value={this.state.position.x}
        />
        <br />
        Y Position:
        <input
          name='scale'
          type='range'
          onChange={this.handleYPosition.bind(this)}
          min='0'
          max='1'
          step='0.01'
          value={this.state.position.y}
        />
        <br />
        Rotate:
        <button onClick={this.rotateLeft.bind(this)}>Left</button>
        <button onClick={this.rotateRight.bind(this)}>Right</button>
        <br />
        <br />
        <input type='button' onClick={this.handleSave.bind(this)} value='Preview' />
        <br />
        {!!this.state.preview &&
          <img
            src={this.state.preview.img}
            style={{
              borderRadius: `${(Math.min(
                this.state.preview.height,
                this.state.preview.width
              ) +
                10) *
                (this.state.preview.borderRadius / 2 / 100)}px`
            }}
          />}
        {!!this.state.preview &&
          <ImageWithRect
            width={
              this.state.preview.scale < 1
                ? this.state.preview.width
                : this.state.preview.height * 478 / 270
            }
            height={this.state.preview.height}
            image='avatar.jpg'
            rect={this.state.preview.rect}
            style={{
              margin: '10px 24px 32px',
              padding: 5,
              border: '1px solid #CCC'
            }}
          />}
      </div>
        )
    }
}

// Used to display the cropping rect
class ImageWithRect extends React.Component {

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

    setCanvas(canvas) {
        if (canvas) this.canvas = canvas
    }

    componentDidMount() {
        this.redraw()
    }

    componentDidUpdate() {
        this.redraw()
    }

    redraw() {
        const img = new Image()

        img.src = this.props.image
        img.onload = this.handleImageLoad
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