import React from 'react';
import ReactDOM from 'react-dom';
import FetchList from './FetchList';
import dateformater from 'dateformater';
import { ComposedChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
    Modal
} from 'react-bootstrap';

export default class GAPReport extends React.Component {
    constructor(props){
        super(props);
        this.state={
            inited: false,
            dataTypeName:'GAP图表',
            lineSelections:[],
            modeDataList:[{name: '', minute: 0, percent: 0},],
            reasonListMap:{'':[{name: '', minute: 0, percent: 0}]},

            chartWidth: 800,
            activeIndex: 0,
            isModalOpen: false,

            lineId:'',
            beginDate:'',
            endDate: '',
        }
    }

    closeReasonModal(){
        this.setState({
            isModalOpen: false
        });
    }

    handleBarClick(data, index) {
        console.log("点击了第："+index+"个记录");
        this.setState({
            activeIndex: index,
            isModalOpen: true,
        });
    }

    onBeginDateChange(value){
        this.setState({
            beginDate: value
        });
    }

    onEndDateChange(value){
        this.setState({
            endDate: value
        });
    }

    onLineSelectChange(value){
        this.setState({
            lineId: value
        })
    }

    querySumTimeStat(condition){
        let _fetchUrl = '/data/stopreasonlog/querysum/';
        fetch(_fetchUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(condition)
        })
            .catch(error => {
                console.log("query productInfo error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let rltlist = data.obj;
                    this.setState({
                        modeDataList: data.obj.modeDataList,
                        reasonListMap: data.obj.reasonListMap,
                    })
                }
            })
    }

    onQuery(event){
        event.preventDefault();
        let condition={
            lineId: this.state.lineId,
            beginDate: this.state.beginDate,
            endDate: this.state.endDate,
        }
        this.querySumTimeStat(condition);
    }

    init_currentDateTime() {
        let date = new Date();
        console.log(dateformater.format(date));
        let currentDate = dateformater.format(date, 'YYYY-MM-DD');
        this.state.beginDate = currentDate;
        this.state.endDate = currentDate;
        console.log("当前时间：", currentDate);
    }

    componentDidMount(){
        this.init_currentDateTime();
        new FetchList().fetchList("/data/line/options", (datalist)=>{
            this.setState({
                lineSelections: datalist,
                lineId: datalist[0].key,
                inited: true,
            })
        })
        let chartWidth = this.refs.chartContainer.clientWidth;
        console.log("计算图表宽度："+ chartWidth);
        this.setState({
            chartWidth: chartWidth
        })
    }

    render(){
        return(
        <div>
            <div class="container-fluid">
                <div class="row">
                    <div class="page-header">
                        <h1>{this.state.dataTypeName}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h5>查询条件</h5>
                        </div>
                        {this.state.inited && 
                        <div class="panel-body">
                            <form class="form-inline" role="form">
                                <div class="col-xs-3">
                                    <div class="form-group">
                                        <label class="control-label">开始日期</label>
                                        <input class="form-control" type="date"
                                            value={this.state.beginDate}
                                            onChange={(event)=>this.onBeginDateChange(event.target.value)}></input>                                        
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="form-group">
                                        <label class="control-label">截至日期</label>
                                        <input class="form-control" type="date" 
                                            value={this.state.endDate}
                                            onChange={(event)=>this.onEndDateChange(event.target.value)}></input>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <div class="form-group">
                                        <label class="control-label">生产线</label>
                                        <select
                                            name="workshop"
                                            class="form-control" 
                                            value={this.state.lineId}
                                            onChange={(event)=>this.onLineSelectChange(event.target.value)}>                                        
                                            {
                                                this.state.lineSelections?this.state.lineSelections.map((option, index)=>(
                                                <option key={index} value={option.key}>{option.value}</option>
                                                )):null
                                            }
                                          </select>
                                    </div>
                                </div>
                                <div class="col-xs-3">
                                    <button class="btn btn-primary" onClick={this.onQuery.bind(this)}>查询</button>
                                </div>
                            </form>
                        </div>
                        }
                    </div>
                </div>

                <div ref="chartContainer">
                    <ComposedChart width={this.state.chartWidth} height={400} data={this.state.modeDataList}
                            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Bar type="monotone" 
                            label={{ fill: 'white', fontSize: 14 }} 
                            dataKey="minute" 
                            fill="#c12127"
                            barSize={50}
                            unit={'分钟'}
                            name={'停机原因类别时长'}
                            onClick={this.handleBarClick.bind(this)} />
                        <Line type="monotone" 
                            dataKey="percent" 
                            stroke="#8884d8"
                            unit={'%'}
                            name={'时长占比'} />                                                
                    </ComposedChart>

                    {/*模态窗口*/}
                    <div>
                        <Modal show={this.state.isModalOpen}
                            onHide={this.closeReasonModal.bind(this)}
                            bsSize={"large"}>
                          <Modal.Header closeButton>
                            <Modal.Title>停机原因:{this.state.modeDataList[this.state.activeIndex].name}</Modal.Title>
                          </Modal.Header>                        
                            <Modal.Body>
                                <ComposedChart width={800} height={320} data={this.state.reasonListMap[this.state.modeDataList[this.state.activeIndex].name]}
                                        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend />
                                    <Bar type="monotone" 
                                        label={{ fill: 'white', fontSize: 14 }} 
                                        dataKey="minute" 
                                        fill="#c12127"
                                        barSize={50}
                                        unit={'分钟'}
                                        name={'停机原因类别时长'}
                                        onClick={this.handleBarClick} />
                                    <Line type="monotone" 
                                        dataKey="percent" 
                                        stroke="#8884d8"
                                        unit={'%'}
                                        name={'时长占比'} />                                                
                                </ComposedChart>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div> 
            </div>     
            }
        </div>   
            )
    }
}