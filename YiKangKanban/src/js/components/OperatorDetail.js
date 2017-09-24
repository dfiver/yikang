import React from 'react';
import ReactDOM from 'react-dom';
import BaseSimpleDataTable from './BaseSimpleDataTable';
import FetchList from './FetchList';
import {
    Avatar,
} from './Avatar';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';

export default class OperatorDetail extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.id);
        let operatorId = '';
        let isNew = true;
        if (this.props.match.params.id &&
            !Object.is(this.props.match.params.id, '') &&
            !Object.is(this.props.match.params.id, '0')) {
            operatorId = this.props.match.params.id;
            isNew = false;
        } else {
            operatorId = '';
            isNew = true;
        }
        this.tempImageUrl = null;
        this.state = {
            shiftselections: [],
            isNew: isNew,
            item: {
                id: operatorId,
                workid: '',
                avatar: '/images/none.png',
                name: '',
                shiftId: '',
                comment: '',
            },
            isModalOpen: false,
            // item: {
            //     workid: 'X4285',
            //     avatar: '/images/20170802020028.jpg',
            //     name: '操作员A',
            //     shiftId: 'A',
            //     comment: '操作员A备注',
            // },
        }
    }

    componentWillMount() {
        //刷新班次列表
        new FetchList().fetchList("/data/shift/options", (datalist) => {
            if (Object.is(this.state.item.shiftId, '')) {
                this.state.item.shiftId = datalist[0].key;
            }
            this.setState({
                item: this.state.item,
                shiftselections: datalist
            });
        });

        //刷新工作列表
        // new FetchList().fetchList("/data/job/options", (datalist) => {
        //     this.setState({
        //         jobselections: datalist
        //     });
        // });

        //刷新星级列表，由于星级显示的特殊性，option的value值设定为[1,0,0,0,0]代表5星等级中的1星.
        // fetch("/data/dict/star")
        //     .catch(error => {
        //         console.log("changes starlevel error", error);
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.success) {
        //             let num = data.obj;
        //             if (num > 0 && num < 10) {
        //                 let starselections = [];
        //                 for (let i = 0; i < num; ++i) {
        //                     let starArray = new Array(num);
        //                     for (let j = 0; j < num; ++j) {
        //                         starArray[j] = j > i ? false : true;
        //                     }
        //                     starselections[i] = {
        //                         key: i + 1,
        //                         value: starArray,
        //                     };
        //                     this.setState({
        //                         starselections: starselections
        //                     })
        //                 }
        //             }
        //         }
        //     });

        //如果是修改，则获取操作员基本信息
        if (!this.state.isNew) {
            console.log("修改人员:", this.state.item.id);
            this.inter_refreshItem(this.state.item.id);
        }
    }

    componentDidMount() {
        $("#baseform").validator().on("submit", this.onSaveOperator.bind(this));
    }


    inter_refreshItem(operatorId) {
        fetch("/data/operator/detail/get?operatorId=" + operatorId)
            .catch(error => {
                console.log("changes starlevel error", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        item: data.obj
                    });
                }
            });
    }


    onChangeShift(value) {
        console.og("输入班次：", value);
        this.state.item.shiftId = value;
        this.setState({
            item: this.state.item
        });
    };

    onChangeComment(value) {
        console.log("输入备注信息：", value);
        this.state.item.comment = value;
        this.setState({
            item: this.state.item
        });
    }

    onChangeWorkid(value) {
        console.log("输入工号信息：" + value);
        this.state.item.workid = value;
        this.setState({
            item: this.state.item
        });
    }

    onChangeName(value) {
        console.log("输入姓名：" + value);
        this.state.item.name = value;
        this.setState({
            item: this.state.item
        });
    }

    onSaveOperator(e) {
        if (e.isDefaultPrevented()) {
            console.log("合法性校验失败了啊");
        } else {
            e.preventDefault();
            console.log("合法性校验成功");
            fetch("/data/operator/detail/save", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.state.item)
                })
                .catch(error => {
                    console.log("delete item error", error);
                })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        item: data.obj
                    });
                    if (data.success && this.state.isNew) {
                        this.state.isNew = false;
                    };
                });
        }
    }

    onBeginChangeAvatar() {
        console.log("onBeginChangeAvatar");
        this.onOpenAvatorModual();
    }
    onChangeTempAvatarUrl(url) {
        console.log("上传了新照片：" + url);
        this.tempImageUrl = url;
    }

    onOpenAvatorModual() {
        this.setState({
            isModalOpen: true
        })
    }

    closeAvatorModual() {
        this.setState({
            isModalOpen: false
        })
    }

    onChangeAvatar() {
        console.log("人员照片由" + this.state.item.avatar + "更换为" + this.tempImageUrl);
        let item = this.state.item;
        item.avatar = this.tempImageUrl;
        this.setState({
            item: item
        });
        this.closeAvatorModual();
    }

    render() {
        return (
            <div>
            <div class="container">
                <div class="row">
                    <div class="page-header">
                        {Object.is(this.props.match.params.id, '0')?
                        <h1>新增操作员</h1>:
                        <h1>修改操作员</h1>
                        }
                    </div>
                </div>
                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>基本信息</h4></div>
                        <div class="panel-body">
                            <form id="baseform" data-toggle="validator" role="form">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="form-group col-xs-4">
                                            <p><label for="name">头像照片：(点击修改)</label></p>
                                            <div style={{backgroudColor:'lightgray', padding: '10px, 10px'}}>                               
                                                <a class="btn" onClick={(event)=>this.onBeginChangeAvatar()}>
                                                    <img src={this.state.item.avatar} style={{width:'220px', height:'220px'}}/>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-xs-8">
                                            <div class="container-fluid">
                                                <div class="row">
                                                    <div class="form-group col-xs-5">
                                                        <label for="workid">工号</label>
                                                        <input id="workid" type="text" class="form-control"
                                                                required
                                                                value={this.state.item.workid}
                                                                onChange={(event)=>this.onChangeWorkid(event.target.value)}>
                                                        </input>
                                                        <div class="help-block with-errors"></div>    
                                                    </div>
                                                    <div class="form-group col-xs-5">
                                                        <label for="name">姓名：</label>
                                                        <input id="name" type="text" class="form-control"
                                                            required
                                                            value={this.state.item.name}
                                                            onChange={(event)=>this.onChangeName(event.target.value)}>
                                                        </input>
                                                        <div class="help-block with-errors"></div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-xs-5">
                                                        <label for="name">班次：</label>
                                                        <select class="form-control" id="shift" 
                                                            value={this.state.item.shiftId}
                                                            onChange={(event)=>this.onChangeShift(event.target.value)}>
                                                            {
                                                                this.state.shiftselections.map((option, index)=>(
                                                                    <option key={index} value={option.key}>{option.value}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="form-group col-xs-10">
                                                        <label for="comment">备注：</label>
                                                        <textarea class="form-control" id="comment" 
                                                            placeholder="请输入备注"
                                                            value={this.state.item.comment}
                                                            onChange={(event)=>this.onChangeComment(event.target.value)}/>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-xs-10">
                                                        <button class="btn btn-success btn-bg pull-right">
                                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                                            &nbsp;&nbsp;&nbsp;保存
                                                        </button>  
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                
                            </form>
                        </div>
                    </div>                                   
                </div> {
                /*                
                                <div class="row">
                                    <div class="col-xs-10">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <h4>星级</h4>
                                                    </div>
                                                    <div class="panel-body">
                                                        <BaseEditableDataTable dataTypeName={this.state.dataTypeName}
                                                              headlist={this.state.levelheadlist}
                                                              viewToEntity = {this.viewToEntity}
                                                              entityToView = {this.entityToView}
                                                              fetchURL ={fetchURL}
                                                              refreshHandler = {this.onReciveRefreshHandler}
                                                              unaddable = {unaddable}
                                                              unaddableMessage = {"请先选定产品型号"}
                                                              disaddable = {disaddable}
                                                              diseditable = {diseditable}
                                                              disdelable = {disdelable}
                                                              editRelayout={true}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                */
            }
            <div class="row">
                <div class="page-footer"></div>
            </div>
        </div>
        {/*模态窗口*/}
        <Modal isOpen={this.state.isModalOpen} onRequestHide={this.closeAvatorModual.bind(this)}>
            <ModalHeader>
                <ModalClose onClick={this.closeAvatorModual.bind(this)}/>
                <ModalTitle>更换照片</ModalTitle>
            </ModalHeader> 
            <ModalBody >
                <Avatar image={this.state.item.avatar} 
                    width={200} 
                    height={200}
                    uploadUrl={'/upload/avatar'}
                    getImageUrl={'/upload/image'}
                    onTempUrlChange={this.onChangeTempAvatarUrl.bind(this)}
                    />
            </ModalBody> 
            <ModalFooter >
                <button class='btn btn-default' onClick={this.closeAvatorModual.bind(this)}>
                    <span class="glyphicon glyphicon-remove-circle"></span>
                    &nbsp;取消
                </button> 
                <button class='btn btn-primary' onClick={this.onChangeAvatar.bind(this)}>
                    <span class="glyphicon glyphicon-floppy-disk"></span>
                    &nbsp;保存
                </button>
            </ModalFooter>
        </Modal>
    </div>
        );
    }
}