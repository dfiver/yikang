import React from 'react';
import ReactDOM from 'react-dom';
import { ComposedChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {
    Modal
} from 'react-bootstrap';

/**
* lineId
*/
export default class GAPChart extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            modeDataList:[{name: '', minute: 0, percent: 0},],
            reasonListMap:{'':[{name: '', minute: 0, percent: 0}]},

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

    querySumTimeStat(){
        let _fetchUrl = '/data/stopreasonlog/querysum/today?lineId='+this.props.lineId;
        fetch(_fetchUrl)
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

    componentWillMount() {
        if(!this.interval) {
            this.interval = setInterval(
                () => {
                    this.querySumTimeStat();
                },
                10000
            );
        }
    };
    
    //不用的是时候将其解绑
    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
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
        <div ref="chartContainer">
            <ComposedChart width={this.state.chartWidth} height={700} data={this.state.modeDataList}
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
            )
	}
}
