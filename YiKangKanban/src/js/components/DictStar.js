import React from 'react';
import ReactDOM from 'react-dom';
import {message} from 'antd';

export default class DictStar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                        message.error("修改最高星级失败");
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
                            message.success("修改最高星级成功");
                        } else {
                            message.error("修改最高星级失败");
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
        let starGraph = [];
        for (let i = 0; i < this.state.starLevel.value; ++i) {
            starGraph[i] = <span key={i} className="glyphicon glyphicon-star"></span>
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3>星级设置</h3>
                            </div>
                            <div className="panel-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-xs-2 col-xs-offset-2" style={{fontSize:'20px'}}>
                                            <label for="startNum" className="control-label">最高星级:</label>
                                        </div>
                                        <div className="col-xs-5" style={{display:this.state.starLevel.changing?'block':'none'}}>
                                            <div className="form-group">
                                                <form id="starform" data-toggle="validator" role="form">
                                                    <div className="container-fluid">
                                                        <div className="row">
                                                            <div className="col-xs-6">
                                                                <input type="text" name="starNum" className="form-control"
                                                                        placeholder="请输入1~9中的一位数字"
                                                                        required
                                                                        pattern="[1-9]"
                                                                        // defaultValue={this.state.starLevel.tempValue}
                                                                        onChange={this.onTempStarChange}
                                                                        />
                                                                <div className="help-block with-errors"></div>
                                                            </div>
                                                            <div className="col-xs-6">
                                                                <a href="#" className="btn btn-default pull-right" onClick={this.resetStar}>
                                                                    <span className="glyphicon glyphicon-remove-circle"></span>
                                                                    &nbsp;取消
                                                                </a>
                                                                <button type="submit" className = "btn btn-success pull-right">
                                                                    <span className="glyphicon glyphicon-floppy-disk"></span>
                                                                    &nbsp;保存
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div style={{display:this.state.starLevel.changing? 'none':'block' }}>
                                            <div className="col-xs-3">
                                                <div className="container-fluid">
                                                    <div className="row">
                                                        <p style={{fontSize:'18px', textAlign:'center'}}>{this.state.starLevel.value}</p>
                                                        <p style={{color:'orange', textAlign:'center'}}>
                                                            {starGraph}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xs-2">
                                                <button className="btn btn-primary pull-right" onClick={this.onBeginChange}>
                                                    <span className="glyphicon glyphicon-pencil"></span>
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