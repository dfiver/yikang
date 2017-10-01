import React from 'react';
import ReactDOM from 'react-dom';
import LineSeatOperator from './LineSeatOperator';
//import IECharts from 'react-echarts-v3';


export default class LineScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineId: props.match.params.lineId ? props.match.params.lineId : null,
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
                }],
            },
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
                            <div class="row" style={{height:'620px'}}>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            {this.state.lineId?
            <nav class="navbar navbar-default navbar-fixed-bottom">
                <LineSeatOperator lineId={this.state.lineId}/>
            </nav> 
            :
            ''
            }
        </div>
        )
    }
}
