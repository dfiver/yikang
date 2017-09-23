import React from 'react';
import ReactDOM from 'react-dom';
import SimpleSelect from './SimpleSelect/SimpleSelect';
import BaseEditableDataTable from './BaseEditableDataTable';

export default class CommitStopReasonInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataTypeName: '停机信息管理',
            currentShift: 'A',
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
            headerlist:[{
                name: 'date',
                nickName: '日期',
                type: "date",
                width: 2,
                edit_width: 4,
                break: false
            },{
                name: 'beginHour',
                nickName: '开始时间',
                type: "select",
                selectoptions:[{
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
                    },
                ],
                width: 1,
                edit_width: 4,
                break: false
            },{
                name: 'beginHour',
                nickName: '结束时间',
                type: "select",
                selectoptions:[
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
                    },
                ],
                width: 1,
                edit_width: 4,
                break: true
            },{
                name: 'productCode',
                nickName: 'productCode',
                type: "select",
                selectoptions:[
                    {key:'2001',value:'2001'},
                    {key:'2002',value:'2002'},
                    {key:'2003',value:'2003'},
                    {key:'2004',value:'2004'}              
                    ],
                width: 1,
                edit_width: 6,
                break: false
            },{
                name: 'batchNo',
                nickName: 'batchNo',
                type: "select",
                selectoptions:[
                    {key:'200101',value:'200101'},
                    {key:'200201',value:'200201'},
                    {key:'200102',value:'200102'},
                    {key:'200103',value:'200103'}
                ],
                width: 1,
                edit_width: 6,
                break: true
            },{
                name: 'target',
                nickName: 'target',
                type: "text",
                addAttr:{
                    editable:false
                },
                width: 1,
                edit_width: 3,
                break: false
            },{
                name: 'stopReason',
                nickName: '停机原因',
                type: "select",
                selectoptions:[
                    {key:"001", value: "原因1"},
                    {key:"002", value: "原因2"},
                    {key:"003", value: "原因3"},
                    {key:"004", value: "原因4"}                    
                ],
                width: 1,
                edit_width: 3,
                break: false
            },{
                name: 'describe',
                nickName: '备注',
                type: "textarea",
                width: 2,
                edit_width: 6,
                break: true
            }],               
            itemlist:[
                {
                    date: '2017-07-25',
                    beginHour: {key:'05:00',value:'05:00'},
                    endHour: {key:'06:00',value:'06:00'},
                    productCode: {key:'2001',value:'2001'},
                    batchNo: {key:'200101',value:'200101'},
                    target: 100,
                    stopReason: {key:'001',value:'停机原因1'},
                    describe: '备注信息1'
                },
                {
                    date: '2017-07-25',
                    beginHour: {key:'05:00',value:'05:00'},
                    endHour: {key:'06:00',value:'06:00'},
                    productCode: {key:'2001',value:'2001'},
                    batchNo: {key:'200101',value:'200101'},
                    target: 100,
                    stopReason: {key:'001',value:'停机原因2'},
                    describe: '备注信息2'
                }    
            ],
            emptyitem:{
                    date: '2017-09-13',
                    beginHour: {key:'05:00',value:'05:00'},
                    endHour: {key:'06:00',value:'06:00'},
                    productCode: {key:'2001',value:'2001'},
                    batchNo: {key:'200101',value:'200101'},
                    target: 100,
                    stopReason: {key:'001',value:'停机原因1'},
                    describe:''             
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
                                <h4>基本信息设定</h4>
                            </div>
                            <div class="panel-body">
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <label for="firstname" class="col-md-1 control-label">当前班次:</label>
                                        <label for="firstname" class="col-md-1 control-label">A班</label>    
                                        <div class="col-md-1"></div>
                                        <label for="firstname" class="col-md-2 control-label">当前生产线:</label>
                                        <div class="col-md-7">
                                            <SimpleSelect options={this.state.line}/>
                                        </div>                              
                                    </div>
                                    <div class="form-group">
                                        <label for="firstname" class="col-md-1 control-label">生产车间:</label>
                                        <div class="col-md-2">
                                            <SimpleSelect options={this.state.workshop}/>
                                        </div>
                                        <label for="firstname" class="col-md-1 control-label">产品家族:</label>
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
                                </form>
                            </div>
                        </div>     
                </div>

                <div class="row" style={{marginTop:"50px"}}>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>生产信息录入</h4>
                        </div>
                        <div class="panel-body">
                            <BaseEditableDataTable dataTypeName={this.state.dataTypeName}
                                  headerlist={this.state.headerlist}
                                  itemlist={this.state.itemlist}
                                  emptyitem={this.state.emptyitem}
                                  editRelayout={true}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}