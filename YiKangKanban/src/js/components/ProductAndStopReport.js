import React from 'react';
import ReactDOM from 'react-dom';
import SimpleSelect from './SimpleSelect/SimpleSelect';

export default class ProductAndStopReport extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataTypeName: '生产停机信息报表',
            shift:{
                selected: 'A',
                items:[
                    {
                        key:'A',
                        value: 'A'
                    },
                    {
                        key:'B',
                        value: 'B'
                    },
                    {
                        key:'C',
                        value: 'C'
                    }                    
                ]
            },
            line:{
                selected: '002',
                items:[
                    {
                        key: '001',
                        value: '生产线1'
                    },
                    {
                        key: '002',
                        value: '生产线2'
                    },
                    {
                        key: '003',
                        value: '生产线3'
                    },
                    {
                        key: '004',
                        value: '生产线4'
                    }
                ]
            },
            workshop:{
                selected: '002',
                items:[
                    {
                        key: '001',
                        value: '生产车间1'
                    },
                    {
                        key: '002',
                        value: '生产车间2'
                    },
                    {
                        key: '003',
                        value: '生产车间3'
                    },
                    {
                        key: '004',
                        value: '生产车间4'
                    }
                ]                
            },
            time:{
                selected: 0,
                items:[
                    {
                        key:0,
                        value:'00:00'
                    },{
                        key:1,
                        value:'01:00'
                    },{
                        key:2,
                        value:'02:00'
                    },{
                        key:3,
                        value:'03:00'
                    },{
                        key:4,
                        value:'04:00'
                    },{
                        key:5,
                        value:'05:00'
                    },{
                        key:6,
                        value:'06:00'
                    },{
                        key:7,
                        value:'07:00'
                    },{
                        key:8,
                        value:'08:00'
                    },{
                        key:9,
                        value:'09:00'
                    },{
                        key:10,
                        value:'10:00'
                    },{
                        key:11,
                        value:'11:00'
                    },{
                        key:12,
                        value:'12:00'
                    },{
                        key:13,
                        value:'13:00'
                    },{
                        key:14,
                        value:'14:00'
                    },{
                        key:15,
                        value:'15:00'
                    },{
                        key:16,
                        value:'16:00'
                    },{
                        key:17,
                        value:'17:00'
                    },{
                        key:18,
                        value:'18:00'
                    },{
                        key:19,
                        value:'19:00'
                    },{
                        key:20,
                        value:'20:00'
                    },{
                        key:21,
                        value:'21:00'
                    },{
                        key:22,
                        value:'22:00'
                    },{
                        key:23,
                        value:'23:00'
                    }
                ]                
            },
            productFamily:{
                selected: '002',
                items:[
                    {
                        key: '001',
                        value: '产品家族1'
                    },
                    {
                        key: '002',
                        value: '产品家族2'
                    },
                    {
                        key: '003',
                        value: '产品家族3'
                    },
                    {
                        key: '004',
                        value: '产品家族4'
                    }
                ]
            },
            productType:{
                selected: '002',
                items:[
                    {
                        key: '001',
                        value: '2001'
                    },
                    {
                        key: '002',
                        value: '2002'
                    },
                    {
                        key: '003',
                        value: '2003'
                    },
                    {
                        key: '004',
                        value: '2004'
                    }
                ]
            },
            batchNo:{
                selected: '002',
                items:[
                    {
                        key: '001',
                        value: '01'
                    },
                    {
                        key: '002',
                        value: '02'
                    },
                    {
                        key: '003',
                        value: '03'
                    },
                    {
                        key: '004',
                        value: '04'
                    }
                ]
            },
            productInfoList:{
                items:[{
                    date: '2017-09-25',
                    beginHour: '05:00',
                    endHour: '06:00',
                    productCode: '2001',
                    batchNo: '200101',
                    target: '100',
                    done: '103',
                    crap: '3',
                    rework: '4'
                },{
                    date: '2017-09-25',
                    beginHour: '05:00',
                    endHour: '06:00',
                    productCode: '2001',
                    batchNo: '200101',
                    target: '100',
                    done: '103',
                    crap: '3',
                    rework: '4'
                },{
                    date: '2017-09-25',
                    beginHour: '05:00',
                    endHour: '06:00',
                    productCode: '2001',
                    batchNo: '200101',
                    target: '100',
                    done: '103',
                    crap: '3',
                    rework: '4'                    
                }]
            },
            stopInfoList:{
                items:[{
                    date: '2017-09-25',
                    beginHour: '05:00',
                    endHour: '06:00',
                    productCode: '2001',
                    batchNo: '200101',
                    target: '100',
                    stopReason: '停电',
                    describe: '突然断电了'
                },{
                    date: '2017-09-25',
                    beginHour: '05:00',
                    endHour: '06:00',
                    productCode: '2001',
                    batchNo: '200101',
                    target: '100',
                    stopReason: '停电',
                    describe: '突然断电了'
                },{
                    date: '2017-09-25',
                    beginHour: '05:00',
                    endHour: '06:00',
                    productCode: '2001',
                    batchNo: '200101',
                    target: '100',
                    stopReason: '停电',
                    describe: '突然断电了'
                }]                
            }

        }
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
                                        <SimpleSelect options={this.state.shift}/>
                                    </div>
                                    <label class="col-md-1 control-label">生产线:</label>
                                    <div class="col-md-5">
                                        <SimpleSelect options={this.state.line}/>
                                    </div>                              
                                </div>
                                <div class="form-group">
                                    <label class="col-md-1 control-label">生产车间:</label>
                                    <div class="col-md-2">
                                        <SimpleSelect options={this.state.workshop}/>
                                    </div>
                                    <label class="col-md-1 control-label">产品家族:</label>
                                    <div class="col-sm-2">
                                        <SimpleSelect options={this.state.productFamily}/>
                                    </div>
                                    <label for="name" class="col-md-1 control-label">产品型号:</label>
                                    <div class="col-md-2">
                                        <SimpleSelect options={this.state.productType}/>
                                    </div>
                                    <label for="name" class="col-md-1 control-label">批次号:</label>
                                    <div class="col-md-2">
                                        <SimpleSelect options={this.state.batchNo}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-1 control-label">开始日期:</label>
                                    <div class="col-md-2">
                                        <input type="date" class="form-control"/>
                                    </div>
                                    <label class="col-md-1 control-label">开始时间:</label>
                                    <div class="col-md-2">
                                        <SimpleSelect options={this.state.time}/>
                                    </div>
                                    <label class="col-md-1 control-label">结束日期:</label>
                                    <div class="col-md-2">
                                        <input type="date" class="form-control"/>
                                    </div>
                                    <label class="col-md-1 control-label">结束时间:</label>
                                    <div class="col-md-2">
                                        <SimpleSelect options={this.state.time}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-12">
                                        <button class="btn btn-primary pull-right">查询</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
                <div class="row">
                <div class="panel panel-default">
                    <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <h4>生产信息报表</h4>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>日期</th>
                                        <th>开始时间</th>
                                        <th>结束时间</th>
                                        <th>ProductCode</th>
                                        <th>BatchNo</th>
                                        <th>Target</th>
                                        <th>Done</th>
                                        <th>Crap</th>
                                        <th>Rework</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.productInfoList.items.map((item, index)=>(
                                    <tr key={index}>
                                        <td>{item.date}</td>
                                        <td>{item.beginHour}</td>
                                        <td>{item.endHour}</td>
                                        <td>{item.productCode}</td>
                                        <td>{item.batchNo}</td>                         
                                        <td>{item.target}</td>
                                        <td>{item.done}</td>
                                        <td>{item.crap}</td>
                                        <td>{item.rework}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <h4>停机信息报表</h4>
                            <table class="table table-striped">
                               <thead>
                                  <tr>
                                     <th>日期</th>
                                     <th>开始时间</th>
                                     <th>结束时间</th>
                                     <th>ProductCode</th>
                                     <th>BatchNo</th>
                                     <th>Target</th>
                                     <th>停机原因</th>
                                     <th>备注</th>
                                  </tr>
                               </thead>
                               <tbody>
                                {this.state.stopInfoList.items.map((item, index)=>(
                                    <tr key={index}>
                                        <td>{item.date}</td>
                                        <td>{item.beginHour}</td>
                                        <td>{item.endHour}</td>
                                        <td>{item.productCode}</td>
                                        <td>{item.batchNo}</td>                         
                                        <td>{item.target}</td>
                                        <td>{item.stopReason}</td>
                                        <td>{item.describe}</td>
                                    </tr>
                                ))}
                               </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-12">
                <button class="btn btn-success pull-right">导出全部</button>
            </div>
        </div>
        <div class="row">
            <div class="page-footer">
                <p style={{textAlign:'center'}}>
                    Copyright ©2017 益康生产线管理系统 Powered By [] Version 1.0.0 
                </p>
            </div>
        </div>
    </div>
        );
    }
}