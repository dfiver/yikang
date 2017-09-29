import React from 'react';
import ReactDOM from 'react-dom';
import CommitProductInfo from './CommitProductInfo';
import CommitStopReasonInfo from './CommitStopReasonInfo';
import FetchList from './FetchList';
import dateformater from 'dateformater';


/*
props.match.params.lineId //生产线编号
*/
export default class CommitProductAndStopReason extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTypeName: '生产停机信息采集',
            lineId: props.match.params.lineId ? props.match.params.lineId : null,
            line: null, //初始化时根据ID从服务端获取
            shift: null, //当前班次号
            shiftSelection: [],
        }
    }

    componentWillMount() {
        console.log("CommitProductAndStopReason will mount!");
        this.inter_refresh_line();
        this.inter_refresh_shift();
    };

    inter_refresh_shift() {
        //刷新班次列表
        new FetchList().fetchList("/data/shift/options", (datalist) => {
            if (datalist && datalist.length) {
                this.setState({
                    shiftSelection: datalist
                });
                if (!this.state.shift) {
                    this.setState({
                        shift: this.state.shiftSelection[0]
                    })
                }
            }
        });
    }

    inter_refresh_line() {
        if (!!this.state.lineId) {
            let _fetchUrl = "/data/line/get?id=" + this.state.lineId;
            console.log(_fetchUrl);
            fetch(_fetchUrl)
                .catch(error => {
                    console.log("get line error!", error);
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        this.state.line = data.obj;
                        this.setState({
                            line: this.state.line
                        })
                    }
                });
        }
    }

    onShiftSelectChange(value) {
        let selectValue;
        this.state.shiftSelection.map((item, index) => {
            if (Object.is(item.key, value)) {
                selectValue = item;
            }
        });
        console.log(selectValue);
        this.setState({
            shift: selectValue
        })
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="page-header">
                        <h1>{this.state.dataTypeName}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-8">
                        <h2>生产车间:{this.state.line? this.state.line.workshop.value: ''} 
                            &nbsp;&nbsp; 生产线:{this.state.line?this.state.line.name:''}</h2>
                    </div>
                    <div class="col-xs-1">
                        <h2>班次：</h2>
                    </div>
                    <div class="col-xs-2">
                        <h2>
                            <select class="form-control" 
                                value={this.state.shift?this.state.shift.key:''}
                                onChange={(event)=>this.onShiftSelectChange(event.target.value)}>
                            {this.state.shiftSelection.map((item,index)=>(
                                <option key={index} value={item.key}>{item.value}</option>
                                ))}
                            </select>
                        </h2>
                    </div>
                </div>
                <div class="row" style={{marginTop:"10px"}}>
                { this.state.lineId && this.state.lineId != '' && this.state.shift && this.state.shift.key ?
                    <CommitProductInfo lineId={this.state.lineId} shiftId={this.state.shift.key}/>
                    :
                    ''
                }
                </div>              
                <div class="row" style={{marginTop:"10px"}}>
                { this.state.lineId && this.state.lineId != '' && this.state.shift && this.state.shift.key ?
                    <CommitStopReasonInfo lineId={this.state.lineId} shiftId={this.state.shift.key}/>
                    :
                    ''
                }
                </div>
            </div>
        );
    }
}