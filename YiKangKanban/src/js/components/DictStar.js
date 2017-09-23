import React from 'react';
import ReactDOM from 'react-dom';

export default class DictStar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: {
                alert: {
                    show: 0,
                    message: 'alert信息'
                },
                error: {
                    show: 0,
                    message: 'error信息'
                },
                success: {
                    show: 0,
                    message: 'success信息'
                }
            },
            starLevelDataType: '星级设置',
            starLevel: {
                value: 5,
                tempValue: 5,
                changing: false
            }
        };

        this.saveStar = function(event) {
            console.log("saveStar");
            if (event.isDefaultPrevented()) {
                console.log("合法性校验失败了啊");
            } else {
                event.preventDefault();
                fetch("/data/dict/star/save?num=" + this.state.starLevel.tempValue)
                    .catch(error => {
                        console.log("changes starlevel error", error);
                        this.onMessage("error", "修改最高星级失败");
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            this.setState({
                                starLevel: {
                                    value: data.obj,
                                    tempValue: data.obj,
                                    changing: false
                                }
                            });
                            this.onMessage("success", "修改最高星级成功");
                        } else {
                            this.onMessage("error", "修改最高星级失败");
                        }
                    })
            }
        }.bind(this);

        this.onTempStarChange = function(event) {
            let tempValue = parseInt(event.target.value);
            if (tempValue > 0 && tempValue < 10) {
                let tempStarLevel = Object.assign({}, this.state.starLevel, {
                    tempValue: tempValue,
                    changing: true
                });
                this.setState({
                    starLevel: tempStarLevel
                });
            } else {
                this.setState({
                    starLevel: this.state.starLevel
                });
            }
        }.bind(this);

        this.resetStar = function(event) {
            event.preventDefault();
            let tempValue = this.state.starLevel.value;
            let tempStarLevel = Object.assign({}, this.state.starLevel, {
                tempValue: tempValue,
                changing: false
            });
            this.setState({
                starLevel: tempStarLevel
            });
        }.bind(this);

        this.onBeginChange = function(event) {
            console.log("#starform", $("#starform"));
            $("#starform").validator().on("submit", this.saveStar);

            event.preventDefault();
            let tempStarLevel = Object.assign({}, this.state.starLevel, {
                changing: true,
                tempValue: this.state.starLevel.value
            });
            this.setState({
                starLevel: tempStarLevel
            });
        }.bind(this);
    }

    onMessage(type, message) {
        if (this.state.messages[type]) {
            let messages = Object.assign({}, this.state.messages);
            ++messages[type].show;
            messages[type].message = message;

            this.setState({
                messages: messages
            });
            setTimeout(function() {
                if (messages[type].show) {
                    let timeoutmessages = Object.assign({}, this.state.messages);
                    --timeoutmessages[type].show;
                    this.setState({
                        messages: timeoutmessages
                    })
                }
            }.bind(this), 2000);
        } else {
            console.log("无法识别的消息类型");
        }
    }

    componentWillMount() {
        fetch("/data/dict/star")
            .catch(error => {
                console.log("changes starlevel error", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        starLevel: {
                            value: data.obj,
                            tempValue: data.obj,
                            changing: false,
                        }
                    });
                }
            });
    }

    render() {
        let successMessage;
        let errorMessage;
        let alertMessage;

        if (this.state.messages["success"].show) {
            successMessage =
                <div class="alert alert-success" role="alert">
                      {this.state.messages["success"].message}
                    </div>
        }
        if (this.state.messages["error"].show) {
            errorMessage =
                <div class="alert alert-danger" role="alert">
                        {this.state.messages["error"].message}
                    </div>
        }
        if (this.state.messages["alert"].show) {
            alertMessage =
                <div class="alert alert-warning" role="alert">
                        {this.state.messages["alert"].message}
                    </div>
        }

        let starGraph = [];
        for (let i = 0; i < this.state.starLevel.value; ++i) {
            starGraph[i] = <span key={i} class="glyphicon glyphicon-star"></span>
        }

        return (
            <div class="container">
                <div class="row" style={{margin:'10px, 0'}}>
                {successMessage}
                {errorMessage}
                {alertMessage}
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3>星级设置</h3>
                            </div>
                            <div class="panel-body">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-xs-2 col-xs-offset-2" style={{fontSize:'20px'}}>
                                            <label for="startNum" class="control-label">最高星级:</label>
                                        </div>
                                        <div class="col-xs-5" style={{display:this.state.starLevel.changing?'block':'none'}}> 
                                            <div class="form-group">
                                                <form id="starform" data-toggle="validator" role="form">                                                
                                                    <div class="container-fluid">
                                                        <div class="row">
                                                            <div class="col-xs-6">
                                                                <input type="text" name="starNum" class="form-control" 
                                                                        placeholder="请输入1~9中的一位数字"
                                                                        required 
                                                                        pattern="[1-9]"
                                                                        value={this.state.starLevel.tempValue}
                                                                        onChange={this.onTempStarChange}
                                                                        />
                                                                <div class="help-block with-errors"></div>
                                                            </div>
                                                            <div class="col-xs-6">                                                    
                                                                <a href="#" class="btn btn-default pull-right" onClick={this.resetStar}>
                                                                    <span class="glyphicon glyphicon-remove-circle"></span>
                                                                    &nbsp;取消
                                                                </a> 
                                                                <button type="submit" class = "btn btn-success pull-right">
                                                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                                                    &nbsp;保存
                                                                </button>
                                                            </div>
                                                        </div>    
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div style={{display:this.state.starLevel.changing? 'none':'block' }}>
                                            <div class="col-xs-3"> 
                                                <div class="container-fluid">
                                                    <div class="row">
                                                        <p style={{fontSize:'18px', textAlign:'center'}}>{this.state.starLevel.value}</p>
                                                        <p style={{color:'orange', textAlign:'center'}}>
                                                            {starGraph}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xs-2">
                                                <button class="btn btn-primary pull-right" onClick={this.onBeginChange}>
                                                    <span class="glyphicon glyphicon-pencil"></span>
                                                    &nbsp; 修改
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}