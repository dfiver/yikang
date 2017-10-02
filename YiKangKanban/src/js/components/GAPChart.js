import React from 'react';
import ReactDOM from 'react-dom';
import { ComposedChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
    Modal
} from 'react-bootstrap';

export default class GAPChart extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data: [
                  {name: '节假日', uv: 20, percent: 3.0},
                  {name: '停水', uv: 30,  percent: 4.5},
                  {name: '断电', uv: 15,  percent: 2.2},
                  {name: '设备检修', uv: 120, percent: 18.3},
                  {name: '原料不足', uv: 140, percent: 21.3},
                  {name: '人员不足', uv: 80, percent: 12.2},
                  {name: '暂无任务', uv: 250, percent: 38.1},
            ],
            chartWidth: 800,
            activeIndex: 0,
            isModalOpen: false,
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

    componentDidMount(){
        let chartWidth = this.refs.chartContainer.clientWidth;
        console.log("计算图表宽度："+ chartWidth);
        this.setState({
            chartWidth: chartWidth
        })
    }

	render(){
        return(
        <div>
            <ComposedChart width={this.state.chartWidth} height={620} data={this.state.data}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar type="monotone" 
                    label={{ fill: 'white', fontSize: 14 }} 
                    dataKey="uv" 
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
            <div ref="chartContainer">
                <Modal show={this.state.isModalOpen}
                    onHide={this.closeReasonModal.bind(this)}
                    bsSize={"large"}>
                  <Modal.Header closeButton>
                    <Modal.Title>停机原因:{this.state.data[this.state.activeIndex].name}</Modal.Title>
                  </Modal.Header>                        
                    <Modal.Body>
                        <ComposedChart width={800} height={320} data={this.state.data}
                                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Bar type="monotone" 
                                label={{ fill: 'white', fontSize: 14 }} 
                                dataKey="uv" 
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
            )
	}
}
