import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import LocalEditableDataTable from './DataTable/LocalEditableDataTable';
import FetchList from './FetchList';
import {message} from 'antd';
import dateformater from 'dateformater';
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
        this.baseformObj = null;

        this.state = {
            shiftselectoptions: [],
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

            levelheadlist: [{
                name: 'job',
                nickName: '岗位',
                type: 'select',
                selectoptions: [],
                width: 2,
            }, {
                name: 'starlevel',
                nickName: '星级',
                type: 'select',
                selectoptions: [],
                width: 2,
            }, {
                name: 'begin',
                nickName: '开始时间',
                type: 'date',
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写开始时间"
                },
                width: 3,
            },{
                name: 'expired',
                nickName: '到期时间',
                type: 'date',
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写到期时间"
                },
                width: 3,
            }],
            itemlist:[],
            levelemptyitem: {
                job: null,
                starlevel: null,
                expired: null
            }

        };
    }



    componentWillMount() {
        //获取当前时间
        let date = new Date();
        console.log(dateformater.format(date));
        let currentDate = dateformater.format(date, 'YYYY-MM-DD');
        console.log("当前日期：", currentDate);

        //获取过期时间
        fetch("/data/utils/expired/date")
            .catch(error => console.log("fetch list error", error))
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.state.levelemptyitem.expired = data.obj;
                    this.state.levelemptyitem.begin = currentDate;
                    this.setState({
                        levelemptyitem: this.state.levelemptyitem
                    });
                }
            });

        //刷新班次列表
        new FetchList().fetchList("/data/shift/options", (datalist) => {
            if (Object.is(this.state.item.shiftId, '')) {
                this.state.item.shiftId = datalist[0].key;
            }
            this.setState({
                item: this.state.item,
                shiftselectoptions: datalist
            });
        });

        //刷新工作列表
        new FetchList().fetchList("/data/job/options", (datalist) => {
            this.state.levelheadlist[0].selectoptions = datalist;
            this.setState({
                levelheadlist: this.state.levelheadlist
            });
            if (datalist.length && (!this.state.levelemptyitem.job)) {
                this.state.levelemptyitem.job = datalist[0];
                this.setState({
                    levelemptyitem: this.state.levelemptyitem
                });
            }
        });

        //刷新星级列表，由于星级显示的特殊性，option的value值设定为[1,0,0,0,0]代表5星等级中的1星.
        fetch("/data/dict/star")
            .catch(error => {
                console.log("changes starlevel error", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let num = data.obj;
                    if (num > 0 && num < 10) {
                        let starselectoptions = [];
                        for (let i = 0; i < num; ++i) {
                            let starArray = new Array(num);
                            for (let j = 0; j < num; ++j) {
                                starArray[j] = j > i ? '☆' : '★';
                            }
                            starselectoptions[i] = {
                                key: i + 1,
                                value: starArray.join(''),
                            };
                        }
                        this.state.levelheadlist[1].selectoptions = starselectoptions;
                        this.setState({
                            levelheadlist: this.state.levelheadlist
                        });
                        if (starselectoptions.length && (!this.state.levelemptyitem.starlevel)) {
                            this.state.levelemptyitem.starlevel = starselectoptions[0];
                            this.setState({
                                levelemptyitem: this.state.levelemptyitem
                            });
                        }
                    }

                }
            });

        //如果是修改，则获取操作员基本信息
        if (!this.state.isNew) {
            console.log("修改人员:", this.state.item.id);
            this.inter_refreshItem(this.state.item.id);
            this.inter_refreshStarLevels(this.state.item.id);
        }
    }

    getStarLevelKeyValue(level) {
        let rlt;
        this.state.levelheadlist[1].selectoptions.map((item, index) => {
            if (Object.is(item.key, level)) {
                rlt = item;
            }
        });
        return rlt;
    }

    componentDidMount() {
        this.baseformObj = $("#baseform")
        this.baseformObj.validator().on("submit", this.onSaveOperator.bind(this));
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

    inter_refreshStarLevels(operatorId){
        new FetchList().fetchList("/data/operatorJoblevel/"+operatorId+"/list", (datalist)=>{
            let itemlist = datalist.map((item,index)=>{
                    return this.operatorJoblvel_entityToView(item);
                });
            this.setState({
                itemlist:itemlist
            })
        })
    }


    onChangeShift(value) {
        console.log("输入班次：", value);
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

    onSaveAll(e){
        this.state.nextstep ="refresh";
        this.baseformObj.submit();
    }

    onSaveAndNew(e){
        this.state.nextstep ="createnew";
        this.baseformObj.submit();        
    }

    onSaveOperator(e) {
        if (e.isDefaultPrevented()) {
            console.log("合法性校验失败了啊");
        } else {
            e.preventDefault();
            console.log("合法性校验成功");

            //计算提交数据结构

            let requestBody={
                item: this.state.item,
                itemlist: this.state.itemlist
                            .filter((item)=>{return item.changed})
                            .map((item,index)=>{return this.operatorJoblevel_viewToEntity(item)}),
            }

            console.log("requestBody", requestBody);

            fetch("/data/operator/detail/save", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                })
                .catch(error => {
                    console.log("save item error", error);
                    message.error("保存修改失败，服务器端错误");
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success){
                        message.info("保存成功");
                        if(Object.is(this.state.nextstep, "refresh")){
                            let operatorId = data.obj;
                            this.inter_refreshItem(operatorId);
                            this.inter_refreshStarLevels(operatorId);                            
                        }
                        else{
                            message.info("新建操作员");
                            window.location.href = '/backward/operatordetail/0';
                        }
                    }
                    else{
                        message.error("保存失败");
                    }
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

    operatorJoblevel_viewToEntity(viewItem) {
        return {
            operatorJoblevel:{
                id: viewItem.id,
                operatorId: this.state.item.id,
                jobId: viewItem.job.key,
                starlevel: viewItem.starlevel.key,
                begin: viewItem.begin,
                expired: viewItem.expired,
            },
            removed: !!viewItem.removed,
        }
    }
    operatorJoblvel_entityToView(entity) {
        return {
            id: entity.id,
            job: entity.job,
            starlevel: this.getStarLevelKeyValue(entity.starlevel),
            expired: entity.expired,
            begin: entity.begin,
            changed: false,
            removed: false,
        }

    }

    addAnother() {
        this.props.history.push("/backward/OperatorDetail/0");
    }


    onStarLevelSave(index, item){
        let realIndex = index;  //为了应对本地删除后重新添加的情况，这种情况添加将变为对原有删除数据的修改
        for(let i=0; i<this.state.itemlist.length; ++i){
            if(Object.is(this.state.itemlist[i].job.key, item.job.key)){
                if(!Object.is(index, i)){
                    if(this.state.itemlist[i].removed){
                        realIndex = i;
                    }
                    else{
                        console.log("该岗位已存在，不能重复添加");
                        message.error("该岗位已存在，不能重复添加");
                        return false;                        
                    }
                }
            }
        }
        let viewlist = [].concat(this.state.itemlist);
        viewlist[realIndex] = Object.assign(item, {changed: true, removed: false});
        this.setState({
            itemlist: viewlist
        });
        return true;
    }

    onStarLevelDel(index){
        if(this.state.itemlist[index] != null &&
            this.state.itemlist[index].id != null &&
            this.state.itemlist[index].id != ""){
            this.state.itemlist[index].changed = true;
            this.state.itemlist[index].removed = true;
        }else{
            this.state.itemlist.splice(index, 1);
        }
        this.setState({
            itemlist: this.state.itemlist
        })
    }

    render() {
        return (
            <div>
            <div class="container">
                <div class="row">
                    <div class="page-header">
                        {Object.is(this.state.item.operatorId, '0')?
                        <h1>新增操作员</h1>:
                        <h1>修改操作员</h1>
                        }
                    </div>
                </div>
                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading"><h4>基本信息</h4></div>
                        <div class="panel-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <form id="baseform" data-toggle="validator" role="form">
                                        <div class="form-group col-xs-4">
                                            <p><label for="name">头像照片：(点击修改)</label></p>
                                            <div style={{backgroudColor:'lightgray', padding: '10px, 10px'}}>                               
                                                <a class="btn" onClick={(event)=>this.onBeginChangeAvatar()}>
                                                    <img src={this.state.item.avatar} style={{width:'220px', height:'220px'}}/>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="col-xs-4 col-xs-offset-1">
                                                <div class="row">
                                                    <div class="form-group">
                                                        <label for="workid" class="control-label">工号：</label>
                                                        <input id="workid" type="text" class="form-control"
                                                                required
                                                                value={this.state.item.workid}
                                                                onChange={(event)=>this.onChangeWorkid(event.target.value)}>
                                                        </input>
                                                        <div class="help-block with-errors"></div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="name" class="control-label">姓名：</label>
                                                        <input id="name" type="text" class="form-control"
                                                            required
                                                            value={this.state.item.name}
                                                            onChange={(event)=>this.onChangeName(event.target.value)}>
                                                        </input>
                                                        <div class="help-block with-errors"></div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="name" class="control-label">班次：</label>
                                                        <select class="form-control" id="shift" 
                                                            value={this.state.item.shiftId}
                                                            onChange={(event)=>this.onChangeShift(event.target.value)}>
                                                            {
                                                                this.state.shiftselectoptions.map((option, index)=>(
                                                                    <option key={index} value={option.key}>{option.value}</option>
                                                                    ))
                                                            }
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="comment">备注：</label>
                                                        <textarea class="form-control" id="comment" 
                                                            placeholder="请输入备注"
                                                            value={this.state.item.comment}
                                                            onChange={(event)=>this.onChangeComment(event.target.value)}/>
                                                </div>
                                            </div>
                                        </div>
                                    </form> 
                                </div>
                            </div>
                        </div>
                        <div class="panel-heading"><h4>星级</h4></div>
                        <div class="panel-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <LocalEditableDataTable 
                                          dataTypeName={this.state.dataTypeName}
                                          headerlist={this.state.levelheadlist}
                                          itemlist={this.state.itemlist}
                                          emptyitem={this.state.levelemptyitem}
                                          onItemSave={this.onStarLevelSave.bind(this)}
                                          onItemDelete={this.onStarLevelDel.bind(this)}
                                          />
                                </div>
                            </div>                              
                        </div>
                        <div class="panel-footer">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <button class="btn btn-sm btn-success pull-right"
                                                onClick={this.onSaveAndNew.bind(this)}>
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                            &nbsp;保存并进新建
                                            <span class="glyphicon glyphicon-chevron-right"></span>
                                        </button>                                     
                                        <button class="btn btn-sm btn-default pull-right"
                                                onClick={this.onSaveAll.bind(this)}>
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                            &nbsp;保存
                                        </button>                                        
                                        <Link to={"/backward/operator"}>返回列表</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                                  
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