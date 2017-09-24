import React from 'react';
import ReactDOM from 'react-dom';
//import IECharts from 'react-echarts-v3';


export default class LineScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineName: '生产线_Line1',
            currentDate: '2017-09-14',
            currentShift: 'Shift A',
            productInfoList: {
                items: [{
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }, {
                    period: '9/14 05:00-06:00',
                    productCode: '701235',
                    batchNo: '3311',
                    target: '225',
                    done: '150',
                    crap: '0'
                }],
            },
            lineJobList: [{
                jobId: 'LineA-001-1',
                jobNickName: '点胶1',
                jobLevel: 'C Level',
                operator: {
                    id: '001',
                    avatar: '/images/1.jpg',
                    name: '斯蒂芬库里',
                    jobStar: [1, 1, 1, 1, 1],
                },
            }, {
                jobId: 'LineA-001-2',
                jobNickName: '点胶2',
                jobLevel: 'B Level',
                operator: {
                    id: '002',
                    avatar: '/images/2.jpg',
                    name: '斯蒂芬库里',
                    jobStar: [1, 1, 1, 1, 1],
                },
            }, {
                jobId: 'LineA-001-3',
                jobNickName: '点胶3',
                jobLevel: 'C Level',
                operator: {
                    id: '001',
                    avatar: '/images/2.jpg',
                    name: '斯蒂芬库里',
                    jobStar: [1, 1, 1, 1, 1],
                },
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }, {
                jobId: 'LineA-001-4',
                jobNickName: '点胶4',
                jobLevel: 'C Level',
                operator: null,
            }],
            chartOption: {
                title: {
                    text: '故障类别比例表'
                },
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    formatter: '{b}: {c}%<br/>点击查看明细',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    data: ["故障类别1", "故障类别2", "故障类别3", "故障类别4", "故障类别5", "故障类别6"]
                },
                yAxis: {
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: [{
                    name: '百分比',
                    type: 'bar',
                    barWidth: '50%',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            },
        }
        this.onEvents = {
            'click': function(params) {
                // the 'this' variable can get echarts instance
                console.log("param", params);
            }
        };
    }

    render() {
        console.log("LineScreen render");
        return (
            <div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-xs-4">
                            <h1>{this.state.lineName}</h1>
                        </div>
                        <div class="col-xs-3">
                            <h3>日期:<span>{this.state.currentDate}</span></h3>
                        </div>
                        <div class="col-xs-2">
                            <h3>班次:<span>{this.state.currentShift}</span></h3>
                        </div>
                        <div class="col-xs-3">
                            <h3>生产编号：<span>{this.state.currentProductCode}</span></h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-4">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <h5>生产情况报表</h5>
                                </div>
                                <div class="panel-body productionlist_panelbody">
                                    <div style={{overflow:'hidden',
                                                height:'38px',
                                                textAlign:'center',
                                                fontSize: '16px',
                                                fontWeight:'bold'}}>
                                        <div style={{width:'134px',float:'left'}}>Period</div>
                                        <div style={{width:'114px',float:'left'}}>ProductCode</div>
                                        <div style={{width:'82px',float:'left'}}>BatchNo</div>
                                        <div style={{width:'64px',float:'left'}}>Target</div>
                                        <div style={{width:'56px',float:'left'}}>Done</div>
                                        <div style={{width:'53px',float:'left'}}>Crap</div>
                                    </div> 
                                    <div class = "productionlist_body" >
                                        <table class="table table-striped" style={{marginTop:'-40px'}}>
                                            <thead>
                                                <tr>
                                                    <th>Period</th>
                                                    <th>ProductCode</th>
                                                    <th>BatchNo</th>
                                                    <th>Target</th>
                                                    <th>Done</th>
                                                    <th>Crap</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.productInfoList.items.map((item, index)=>(
                                                <tr key={index}>
                                                    <td>{item.period}</td>
                                                    <td>{item.productCode}</td>
                                                    <td>{item.batchNo}</td>
                                                    <td>{item.target}</td>
                                                    <td>{item.done}</td>
                                                    <td>{item.crap}</td>
                                                </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-8">
                            <div class="container-fluid">
                        {/*因为EChart编译运行速度太慢，暂时用DIV代替
                                <div class="row" style={{height:'320px'}}>
                                    <IECharts option={this.state.chartOption} onEvents={this.onEvents}/>
                                </div>
                                <div class="row" style={{height:'300px'}}>
                                    <IECharts option={this.state.chartOption}/>
                                </div>
                        */}
                                <div class="row" style={{height:'620px'}}/>
                            </div>
                        </div>
                    </div>
                </div> < nav class = "navbar navbar-default navbar-fixed-bottom" >
            <div class="container-fluid">
                        <div class="row">
                        {this.state.lineJobList.map((item, index)=>(
                            <div  key={index} class="pull-left operator-info">
                                <div class="operator-info_job">
                                    <span class="label label-primary">C</span>
                                    <span>{item.jobNickName}</span>
                                </div>
                                {item.operator?
                                <div>
                                    <img class="operator-info_image" src={item.operator.avatar||'/images/none.png'}/>
                                    <div class="operator-info_name operator-info_name_default">{item.operator.name}</div>
                                    <div class="operator-info_star">
                                    {item.operator.jobStar.map((item, index)=>(
                                            item?
                                            <span key={index} class="glyphicon glyphicon-star"></span>:
                                            <span key={index} class="glyphicon glyphicon-star-empty"></span>
                                        ))
                                    }
                                    </div>
                                </div>
                                :
                                <div>
                                    <img class="operator-info_image" src={"/images/none.png"}/>
                                    <div class="operator-info_name operator-info_name_none">未上岗</div>
                                    <div class="operator-info_star">
                                        <span class="glyphicon"></span>
                                    </div>
                                </div>
                                }
                            </div>
                            ))
                        }
                        </div>
                    </div> </nav>  <div class = "modal fade"
            id = "myModal" >
            <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">×</button>
                                <h4 class="modal-title" id="myModalLabel">
                                    点胶3：上岗
                                </h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>工号：</label>
                                    <input type="text" class="form-control" placeholder="请扫描工卡"></input>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                <button type="button" class="btn btn-primary">
                                    提交更改
                                </button>
                            </div>
                        </div>
                    </div> </div>   </div >
        )
    }
}