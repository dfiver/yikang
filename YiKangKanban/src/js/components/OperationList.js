import React from 'react';
import ReactDOM from 'react-dom';

export default class OperationList extends React.Component{
    constructor(props){
        super(props);
        this.state={
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
    componentWillMount(){
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

        //加载产线的list.
        fetch("/data/job/options", {
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
	render(){
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
                                    <label className="col-md-1 control-label">开始时间</label>
                                    <div className="col-md-2">
                                        <input onChange={(event)=>(this.onItemChange("startTime", event.target.value))} type="datetime-local" className="form-control"/>
                                    </div>  
                                    <label className="col-md-1 control-label">结束时间</label>
                                    <div className="col-md-2">
                                        <input onChange={(event)=>(this.onItemChange("endTime", event.target.value))} type="datetime-local" className="form-control"/>
                                    </div>                                                          
                                </div>
                                <div className="form-group">
                                    <label className="col-md-1 control-label">生产线:</label>
                                    <div className="col-md-3">
                                        <select className="form-control" defaultValue="">
                                            <option  value=""></option>
                                            {
                                                this.state.lines.map((line, index)=>(
                                                    <option key={index} value={line.key}>{line.value}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <label htmlFor="firstname" className="col-md-1 control-label">生产工位:</label>
                                    <div className="col-md-3">
                                        <select className="form-control" defaultValue="">
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
                             <th>工作时长</th>
                          </tr>
                       </thead>
                       <tbody>
                       {
                           this.state.detailList.map((detail, index)=>(
                               <tr>
                                   <td>{detail.operator.workid}</td>
                                   <td>{detail.operator.name}</td>
                                   <td>{detail.workdetail.starttime}</td>
                                   <td>{detail.workdetail.endtime}</td>
                                   <td>{detail.line.name}</td>
                                   <td>{detail.job.name}</td>
                                   <td>4</td>
                               </tr>
                           ))
                       }
                       </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-success btn-lg pull-right">导出全部</button>
                </div>
            </div>
        </div>
        );
	}
}