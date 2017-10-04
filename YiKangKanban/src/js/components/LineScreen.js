import React from 'react';
import ReactDOM from 'react-dom';
import LineSeatOperator from './LineSeatOperator';
import FetchList from './FetchList';
import dateformater from 'dateformater';
import {
    ListTable,
    TableHeader,
    CommonRow,
    CommonCell
} from './DataTable/ListTable';
import GAPChart from './GAPChart';


export default class LineScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineId: props.match.params.lineId ? props.match.params.lineId : null,
            line:null,
            currentDate: '', //当前日期
            shift: null,

/*
            period: date+' '+starttime+'-'+endtime,
            productcode: entity.productcode.productcode,
            batchno: entity.batchno.value,
            target: entity.productcode.target,
            done: entity.productlog.done,
            crap: entity.productlog.crap,
            rework: entity.productlog.rework
*/
            shiftSelection:[],
            
            product_headerlist:[{
                name:'period',
                nickName:'时段',
                width:'180px',
            },{
                name:'productcode',
                nickName:'料号',
                width:'120px',
            },{
                name:'batchno',
                nickName:'批次号',
                width:'100px',
            },{
                name:'target',
                nickName:'目标',
                width:'80px',
            },{
                name:'done',
                nickName:'完成',
                width:'80px',
            },{
                name:'crap',
                nickName:'损坏',
                width:'80px',
            },{
                name:'rework',
                nickName:'返工',
                width:'80px',
            }],
            product_itemlist:[],
        }
        this.onEvents = {
            'click': function(params) {
                // the 'this' variable can get echarts instance
                console.log("param", params);
            }
        };
    }

    init_currentDateTime() {
        let date = new Date();
        console.log(dateformater.format(date));
        let currentDate = dateformater.format(date, 'YYYY-MM-DD');
        this.state.currentDate = currentDate;
        console.log("当前日期：", currentDate);
    }

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

    getCondition() {
        return {
            beginTime: this.state.currentDate + ' 00:00',
            endTime: '',
            shiftId: '',
            lineId: this.state.lineId,
            workshopId: '',
            productfamilyId: '',
            productcodeId: '',
            batchnoId: '',
        }
    }

    product_EntityToView(entity) {
        let date = entity.productlog.starttime.split(' ')[0];
        let starttime= entity.productlog.starttime.split(' ')[1];
        let endtime= entity.productlog.endtime.split(' ')[1];

        return {
            period: date+' '+starttime+'-'+endtime,
            productcode: entity.productcode.productcode,
            batchno: entity.batchno.value,
            target: entity.productcode.target,
            done: entity.productlog.done,
            crap: entity.productlog.crap,
            rework: entity.productlog.rework
        }
    }

    query_productlist() {
        let _fetchUrl = '/data/porductlog/query';
        fetch(_fetchUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.getCondition())
            })
            .catch(error => {
                console.log("query productInfo error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let rltlist = data.obj;
                    this.setState({
                        product_itemlist: rltlist.map((item, index) => this.product_EntityToView(item))
                    })
                }
            })
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

    componentWillMount() {
        console.log("CommitProductAndStopReason will mount!");
        this.init_currentDateTime();
        this.inter_refresh_line();
        this.inter_refresh_shift();

        if(!this.interval) {
            this.interval = setInterval(
                () => {
                    this.query_productlist();
                },
                10000
            );
        }
    };
    
    //不用的是时候将其解绑
    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
    }

    render() {
        return (
        <div>
            <div class="container-fluid">
                <div class="page-header">
                    <div class="row">
                        <div class="col-xs-2">
                            <h2>{this.state.line?this.state.line.name:''}</h2>
                        </div>
                        <div class="col-xs-2">
                            <h2>日期:<span>{this.state.currentDate}</span></h2>
                        </div>
                        <div class="col-xs-1">
                            <h2 style={{textAlign:'right'}}>班次:</h2>
                        </div>
                        <div class="col-xs-1">
                            <h2>
                                <select class="form-control" style={{fontSize:'large'}}
                                    value={this.state.shift?this.state.shift.key:''}
                                    onChange={(event)=>this.onShiftSelectChange(event.target.value)}>
                                {this.state.shiftSelection.map((item,index)=>(
                                    <option key={index} value={item.key}>{item.value}</option>
                                    ))}
                                </select>
                            </h2>
                        </div>
                        <div class="col-xs-offset-1 col-xs-3">
                            <h2>生产编号：<span>{this.state.currentProductCode}</span></h2>
                        </div>
                    </div>
                </div>
                <div class="page-body">
                    <div class="row">                
                        <div style={{width:'100%'}}>
                            <div style={{width:'730px', float:'left', marginLeft:'10px', marginRight:"-740px"}}>
                                <div class="panel panel-default">
                                    <h4 style={{marginLeft:'10px'}}>生产情况报表</h4>
                                    <ListTable headerlist={this.state.product_headerlist}
                                                    itemlist={[]}/>
                                    <div class="panel-body productionlist_panelbody">
                                        <div class = "productionlist_body" >
                                            <ListTable headerlist={this.state.product_headerlist}
                                                    itemlist={this.state.product_itemlist}/>
                                        </div>    
                                    </div>
                                </div>
                            </div>
                            <div style={{float:'left', width:'100%'}}>
                                <div style={{ marginLeft:'750px'}}>
                                    <div class="container-fluid">
                                        <div class="row">
                                            <GAPChart lineId={this.state.lineId}/>
                                        </div>
                                    </div>
                                </div>
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
