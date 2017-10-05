import React from 'react';
import ReactDOM from 'react-dom';
import dateformater from 'dateformater';
import moment from 'moment';  
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export default class OperationList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            conditioninited: false,

            lines:[],
            seats:[],
            searchCondition:{
                workid:null,
                opname:null,
                startTime:null,
                endTime:null,
                lineId:null,
                seatId:null
            },
            detailList:[]
        }
    }

    init_currentDateTime() {
        let date = new Date();
        console.log(dateformater.format(date));
        let currentDate = dateformater.format(date, 'YYYY-MM-DD');
        this.setState({
            searchCondition: Object.assign({}, this.state.searchCondition, {startTime: currentDate, endTime: currentDate})
        })

        console.log("当前日期：", currentDate);
    }

    componentWillMount(){

        this.init_currentDateTime();

        //加载产线的list.
        fetch("/data/line/options", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).catch(error => {
            console.log("load data error:", error);
        }).then(res => res.json()).then(data=>{
            if (data.success) {
                if (data.obj != null) {
                    this.setState({
                        ...this.state,
                        lines:data.obj
                    });
                }
            }
        });

        //加载工种的list.
        fetch("/data/lineseat/options", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).catch(error => {
            console.log("load data error:", error);
        }).then(res => res.json()).then(data=>{
            if (data.success) {
                if (data.obj != null) {
                    this.setState({
                        ...this.state,
                        seats:data.obj
                    });
                }
            }
        });
    }
    onItemChange(col,value){
        this.state.searchCondition[col]=value;
    }

    onDurationChange(date, dateString){
        console.log("时段修改", date, dateString);
        let searchCondition = Object.assign({}, this.state.searchCondition);
        searchCondition.startTime = Object.is(dateString[0],"")?null:dateString[0];
        searchCondition.endTime = Object.is(dateString[1],"")?null:dateString[1];
        this.setState({
            searchCondition: searchCondition
        })
    }

    queryWorkDetailList(e){
        e.preventDefault();
        //加载产线的list.
        fetch("/data/operatorWorkdetail/querydetail", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(this.state.searchCondition)
        }).catch(error => {
            console.log("load data error:", error);
        }).then(res => res.json()).then(data=>{
            if (data.success) {
                if (data.obj != null) {
                    this.setState({
                        ...this.state,
                        detailList:data.obj
                    });
                }
            }
        });
    }

    //导出按钮
    onExport(e){
        e.preventDefault();
        //加载产线的list.
        fetch("/data/report/operationlist", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(this.state.searchCondition)
        })
        .catch(error => {
            console.log("export data error:", error);
        })
        .then(res => res.json())
        .then(data=>{
            if (data.success) {
                if (data.obj != null) {
                    let uuid = data.obj;
                    window.location.href = "/data/report/download/"+uuid+"/report.xls"
                }
            }
        });        
    }

	render(){
        moment.locale("zh-cn");
		return (
        <div className="container">
            <div className="row">
                <div className="page-header">
                    <h1>人员工作明细报表</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>查询条件</h4>
                        </div>
                        <div className="panel-body">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-md-1 control-label">人员编号</label>
                                    <div className="col-md-2">
                                        <input type="text" onChange={(event)=>(this.onItemChange("workid", event.target.value))} className="form-control" />
                                    </div>
                                    <label className="col-md-1 control-label">人员姓名</label>
                                    <div className="col-md-2">
                                        <input onChange={(event)=>(this.onItemChange("opname", event.target.value))} type="text" className="form-control" />
                                    </div>
                                    <label className="col-md-1 control-label">起止时间</label>
                                    <div className="col-md-3">
                                        <RangePicker defaultValue={[moment(this.state.searchCondition.startTime, "YYYY-MM-DD"),
                                                            moment(this.state.searchCondition.startTime, "YYYY-MM-DD")]} 
                                            format={"YYYY-MM-DD"} locale="zh-cn" size={"large"}
                                            onChange={this.onDurationChange.bind(this)}/>                                        
                                    </div>                                                          
                                </div>
                                <div className="form-group">
                                    <label className="col-md-1 control-label">生产线:</label>
                                    <div className="col-md-2">
                                        <select className="form-control" defaultValue="" 
                                            onChange={(event)=>this.onItemChange("lineId", event.target.value)}>
                                            <option  value=""></option>
                                            {
                                                this.state.lines.map((line, index)=>(
                                                    <option key={index} value={line.key}>{line.value}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <label htmlFor="firstname" className="col-md-1 control-label">生产工位:</label>
                                    <div className="col-md-2">
                                        <select className="form-control" defaultValue=""
                                            onChange={(event)=>this.onItemChange("seatId", event.target.value)}>
                                            <option  value=""></option>
                                            {
                                                this.state.seats.map((seat, index)=>(
                                                    <option key={index} value={seat.key}>{seat.value}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <button onClick={this.queryWorkDetailList.bind(this)} className="btn btn-success btn-sm pull-right">查询</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>      
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h4>人员工作明细报表</h4>
                    <table className="table table-bordered table-striped">
                       <thead>
                          <tr>
                             <th>人员编号</th>
                             <th>人员姓名</th>
                             <th>开始时间</th>
                             <th>结束时间</th>
                             <th>生产线</th>
                             <th>岗位名称</th>
                             <th>时长(分钟)</th>
                          </tr>
                       </thead>
                       <tbody>
                       {
                           this.state.detailList.map((detail, index)=>(
                               <tr key={index}>
                                   <td>{detail.operator.workid}</td>
                                   <td>{detail.operator.name}</td>
                                   <td>{detail.workdetail.starttime}</td>
                                   <td>{detail.workdetail.endtime}</td>
                                   <td>{detail.line.name}</td>
                                   <td>{detail.seat.name}</td>
                                   <td>{detail.duration}</td>
                               </tr>
                           ))
                       }
                       </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-success pull-right" onClick={this.onExport.bind(this)}>导出全部</button>
                </div>
            </div>
        </div>
        );
	}
}