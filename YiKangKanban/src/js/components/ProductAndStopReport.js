import React from 'react';
import ReactDOM from 'react-dom';
import SimpleSelect from './SimpleSelect/SimpleSelect';
import FetchList from './FetchList';
import dateformater from 'dateformater';
import {
    ListTable,
    TableHeader,
    CommonRow,
    CommonCell
} from './DataTable/ListTable';

export default class ProductAndStopReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTypeName: '生产停机信息报表',

            currentDate: '',
            currentTime: '',

            shiftSelection: [],
            lineSelection: [],
            workshopSelection: [],
            productfamilySelection: [],
            productCodeSelection: [],
            batchNoSelection: [],

            selectConditions: {
                beginDate: '',
                beginTime: '',
                endDate: '',
                endTime: '',
                shiftId: '',
                lineId: '',
                workshopId: '',
                productfamilyId: '',
                productcodeId: '',
                batchnoId: '',
            },

            product_headerlist: [{
                name: 'starttime',
                nickName: '开始时间',
                width: '180px',
            }, {
                name: 'endtime',
                nickName: '结束时间',
                width: '180px',
            }, {
                name: 'line',
                nickName: '生产线'
            }, {
                name: 'productcode',
                nickName: 'productcode',
            }, {
                name: 'batchno',
                nickName: 'batchNo',
                width: '180px',
            }, {
                name: 'target',
                nickName: 'target',
            }, {
                name: 'done',
                nickName: 'done',
            }, {
                name: 'crap',
                nickName: 'crap',
            }, {
                name: 'rework',
                nickName: 'rework',
            }],

            stop_headerlist: [{
                name: 'starttime',
                nickName: '开始时间',
            }, {
                name: 'endtime',
                nickName: '结束时间',
            }, {
                name: 'line',
                nickName: '生产线'
            }, {
                name: 'reason',
                nickName: '停机原因'
            }, {
                name: 'mode',
                nickName: '原因类别'
            }],
            product_itemlist: [],
            stop_itemlist: [],


        }
    }

    clearUpCondition(con) {
        let beginTime;
        let endTime;
        if (con.beginDate && con.beginDate != '' && con.beginTime && con.begintTime != '') {
            beginTime = con.beginDate + ' ' + con.beginTime;
        } else {
            beginTime = this.state.currentDate + '00:00';
        }
        if (con.endDate && con.endDate != '' && con.endTime && con.endTime != '') {
            endTime = con.endDate + ' ' + con.endTime;
        } else {
            endTime = this.state.currentDate + ' ' + this.state.currentTime;
        }
        return {
            beginTime: beginTime,
            endTime: endTime,
            shiftId: con.shiftId,
            lineId: con.lineId,
            workshopId: con.workshopId,
            productfamilyId: con.productfamilyId,
            productcodeId: con.productcodeId,
            batchnoId: con.batchnoId,
        }
    }

    product_EntityToView(entity) {
        return {
            starttime: entity.productlog.starttime,
            endtime: entity.productlog.endtime,
            line: entity.line.value,
            productcode: entity.productcode.productcode,
            batchno: entity.batchno.value,
            target: entity.productcode.target,
            done: entity.productlog.done,
            crap: entity.productlog.crap,
            rework: entity.productlog.rework
        }
    }

    stop_EntityToView(entity) {
        return {
            starttime: entity.stopreasonlog.starttime,
            endtime: entity.stopreasonlog.endtime,
            line: entity.line.value,
            reason: entity.reason.name,
            mode: entity.mode.name,
        }
    }


    init_currentDateTime() {
        let date = new Date();
        console.log(dateformater.format(date));
        let currentDate = dateformater.format(date, 'YYYY-MM-DD');
        let currentTime = dateformater.format(date, 'HHH:mmm');
        this.state.currentDate = currentDate;
        this.state.currentTime = currentTime;
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            beginDate: currentDate,
            endDate: currentDate,
            beginTime: '00:00',
            endTime: currentTime
        });
        this.state.selectConditions = selectConditions;
        this.setState({
            selectConditions: selectConditions
        })
        console.log("当前时间：", currentDate + ' ' + currentTime);
    }

    inter_refresh_shift() {
        new FetchList().fetchList("/data/shift/options", (datalist) => {
            this.setState({
                shiftSelection: datalist
            })
        })
    }

    inter_refresh_line() {
        new FetchList().fetchList("/data/line/options", (datalist) => {
            this.setState({
                lineSelection: datalist
            })
        })
    }

    inter_refresh_workshop() {
        new FetchList().fetchList("/data/workshop/options", (datalist) => {
            this.setState({
                workshopSelection: datalist
            })
        })
    }

    inter_refresh_productfamily() {
        new FetchList().fetchList("/data/productfamily/options", (datalist) => {
            this.setState({
                productfamilySelection: datalist
            })
        })
    }

    inter_refresh_productcode() {
        new FetchList().fetchList("/data/productcode/options", (datalist) => {
            this.setState({
                productCodeSelection: datalist
            })
        })
    }

    inter_refresh_batchno() {
        new FetchList().fetchList("/data/batchno/options", (datalist) => {
            this.setState({
                batchNoSelection: datalist
            })
        })
    }

    query_productlist() {
        let _fetchUrl = '/data/porductlog/query';
        fetch(_fetchUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.clearUpCondition(this.state.selectConditions))
            })
            .catch(error => {
                console.log("query productInfo error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let rltlist = data.obj;
                    this.setState({
                        product_itemlist: rltlist.map((item, index) => this.product_EntityToView(item))
                    })
                }
            })
    }

    query_stoplist() {
        let _fetchUrl = '/data/stopreasonlog/query';
        fetch(_fetchUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.clearUpCondition(this.state.selectConditions))
            })
            .catch(error => {
                console.log("query stopreasonInfo error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let rltlist = data.obj;
                    this.setState({
                        stop_itemlist: rltlist.map((item, index) => this.stop_EntityToView(item))
                    })
                }
            })
    }

    componentWillMount() {
        this.init_currentDateTime();
        this.inter_refresh_shift();
        this.inter_refresh_line();
        this.inter_refresh_workshop();
        this.inter_refresh_productfamily();
        this.inter_refresh_productcode();
        this.inter_refresh_batchno();
        this.query_productlist();
        this.query_stoplist();
    }

    onShiftChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            shiftId: value
        });
        this.setState({
            selectConditions: selectConditions
        })
    }

    onLineChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            lineId: value
        });
        this.setState({
            selectConditions: selectConditions
        })
    }

    onWorkShopChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            workshopId: value
        });
        this.setState({
            selectConditions: selectConditions
        })
    }

    onProductFamilyChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            productfamilyId: value
        });
        this.setState({
            selectConditions: selectConditions
        })
    }

    onProductCodeChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            productcodeId: value
        });
        this.setState({
            selectConditions: selectConditions
        })
    }

    onBatchNoChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            batchnoId: value
        });
        this.setState({
            selectConditions: selectConditions
        })
    }

    onBeginDateChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            beginDate: value
        });
        console.log("beginDateChage", selectConditions);
        if (selectConditions.endDate <= selectConditions.beginDate) {
            selectConditions.endDate = selectConditions.beginDate;
            if (selectConditions.endTime <= selectConditions.beginTime) {
                selectConditions.endTime = selectConditions.beginTime;
            }
        }
        this.setState({
            selectConditions: selectConditions
        })
    }

    onBeginTimeChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            beginTime: value
        });
        if (selectConditions.endDate <= selectConditions.beginDate) {
            selectConditions.endDate = selectConditions.beginDate;
            if (selectConditions.endTime <= selectConditions.beginTime) {
                selectConditions.endTime = selectConditions.beginTime;
            }
        }
        this.setState({
            selectConditions: selectConditions
        })
    }

    onEndDateChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            endDate: value
        });
        if (selectConditions.endDate <= selectConditions.beginDate) {
            selectConditions.beginDate = selectConditions.endDate;
            if (selectConditions.endTime <= selectConditions.beginTime) {
                selectConditions.beginTime = selectConditions.endTime;
            }
        }
        this.setState({
            selectConditions: selectConditions
        })
    }

    onEndTimeChange(value) {
        let selectConditions = Object.assign({}, this.state.selectConditions, {
            endTime: value
        });
        if (selectConditions.endDate <= selectConditions.beginDate) {
            selectConditions.beginDate = selectConditions.endDate;
            if (selectConditions.endTime <= selectConditions.beginTime) {
                selectConditions.beginTime = selectConditions.endTime;
            }
        }
        this.setState({
            selectConditions: selectConditions
        })
    }

    onQueryClick(event) {
        event.preventDefault();
        this.query_productlist();
        this.query_stoplist();
    }

    onExport(event){
        event.preventDefault();
        console.log("导出全部");
        let _fetchUrl = '/data/report/productandstop';
        fetch(_fetchUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.clearUpCondition(this.state.selectConditions))
            })
            .catch(error => {
                console.log("query stopreasonInfo error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let uuid = data.obj;
                    window.location.href = "/data/report/download/"+uuid+"/report.xls"
                }
            })        
    }


    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="page-header">
                        <h1>{this.state.dataTypeName}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>查询条件</h4>
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-md-1 control-label">班次选择:</label>
                                    <div class="col-md-2">
                                        <SimpleSelect options={this.state.shiftSelection} 
                                            value={this.state.selectConditions.shiftId}
                                            onChange={(event)=>this.onShiftChange(event.target.value)}/>
                                    </div>
                                    <label class="col-md-1 control-label">生产线:</label>
                                    <div class="col-md-5">
                                        <SimpleSelect options={this.state.lineSelection}
                                            value={this.state.selectConditions.lineId}
                                            onChange={(event)=>this.onLineChange(event.target.value)}/>
                                    </div>                              
                                </div>
                                <div class="form-group">
                                    <label class="col-md-1 control-label">生产车间:</label>
                                    <div class="col-md-2">
                                        <SimpleSelect options={this.state.workshopSelection}
                                            value={this.state.selectConditions.workshopId}
                                            onChange={(event)=>this.onWorkShopChange(event.target.value)}/>
                                    </div>
                                    <label class="col-md-1 control-label">产品家族:</label>
                                    <div class="col-sm-2">
                                        <SimpleSelect options={this.state.productfamilySelection}
                                            value={this.state.selectConditions.productfamilyId}
                                            onChange={(event)=>this.onProductFamilyChange(event.target.value)}/>
                                    </div>
                                    <label for="name" class="col-md-1 control-label">产品型号:</label>
                                    <div class="col-md-2">
                                        <SimpleSelect options={this.state.productCodeSelection}
                                            value={this.state.selectConditions.productcodeId}
                                            onChange={(event)=>this.onProductCodeChange(event.target.value)}/>
                                    </div>
                                    <label for="name" class="col-md-1 control-label">批次号:</label>
                                    <div class="col-md-2">
                                        <SimpleSelect options={this.state.batchNoSelection}
                                            value={this.state.selectConditions.batchnoId}
                                            onChange={(event)=>this.onBatchNoChange(event.target.value)}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-1 control-label">开始日期:</label>
                                    <div class="col-md-2">
                                        <input type="date" class="form-control" 
                                            value={this.state.selectConditions.beginDate}
                                            onChange={(event)=>this.onBeginDateChange(event.target.value)}/>
                                    </div>
                                    <label class="col-md-1 control-label">开始时间:</label>
                                        <div class="col-md-2">
                                            <input type="time" class="form-control" 
                                                value={this.state.selectConditions.beginTime}
                                                onChange={(event)=>this.onBeginTimeChange(event.target.value)}/>
                                        </div>
                                    <label class="col-md-1 control-label">结束日期:</label>
                                    <div class="col-md-2">
                                        <input type="date" class="form-control"
                                            value={this.state.selectConditions.endDate}
                                            onChange={(event)=>this.onEndDateChange(event.target.value)}/>
                                    </div>
                                    <label class="col-md-1 control-label">结束时间:</label>
                                    <div class="col-md-2">
                                        <input type="time" class="form-control"
                                            value={this.state.selectConditions.endTime}
                                            onChange={(event)=>this.onEndTimeChange(event.target.value)}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-12">
                                        <button class="btn btn-primary pull-right"
                                            onClick={this.onQueryClick.bind(this)}>
                                            查询
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>                
                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>生产信息报表</h4>
                        </div>
                        <div class="panel-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <ListTable headerlist={this.state.product_headerlist}
                                            itemlist={this.state.product_itemlist} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>停机信息报表</h4>
                        </div>
                        <div class="panel-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <ListTable headerlist={this.state.stop_headerlist}
                                            itemlist={this.state.stop_itemlist} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class = "row">
                    <div class="col-xs-12">
                        <button class="btn btn-success pull-right" onClick={this.onExport.bind(this)}>导出全部</button>
                    </div>
                </div>
                <div class = "row">
                    <div class = "page-footer">
                        <p style = {{textAlign: 'center'}}>Copyright© 2017 益康生产线管理系统 Powered By[] Version 1.0 .0 </p>
                    </div> 
                </div> 
            </div>);
    }
}