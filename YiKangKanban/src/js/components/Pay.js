import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';
import moment from 'moment';
import FetchList from './FetchList';
import dateformater from 'dateformater';    

const { MonthPicker } = DatePicker;

/**
设计说明：
    因为薪资管理底下有个合计值。因此，不太适合分页显示，由于统计时年份和月份均为必选。
    因此，建议默认合计值为当前月全体员工的工资合计值。估计员工数量也不会过千，想来问题不大。
*/

export default class Pay extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dataTypeName: '薪资管理',
            queryTitle: '薪资查询',
            conditioninited: false,
            tableinited: false,
            jobOptions: [],
            payQuery:{              
                employeeId: '',
                employeeName: '',
                currentMonth: '',
            },
            payList:{
                items:[],
                sumTotalSubsidies:[0.00, 0.00]
            }
        };
    }

    onMonthChange(date, dateString) {
        console.log("选择月份：", date, dateString);
    }

    onOperatorNameChange(event){
        let payQuery = Object.assign({}, this.state.payQuery, {employeeName: event.target.value});
        this.setState({
            payQuery: payQuery
        })

    }

    onWorkIdChange(event){
        let payQuery = Object.assign({}, this.state.payQuery, {employeeId: event.target.value});
        this.setState({
            payQuery: payQuery
        })
    }

    onQueryPayment(event){
        event.preventDefault();
        fetch("/data/pay/query", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.state.payQuery)
        })
        .catch(error => {
          console.log("query payment error", error);
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                this.setState({
                    payList: data.obj
                })
            }
            else{
                console.log("query payment error", data.msg);
            }
        });
    }

    init_currentDateTime() {
        let date = new Date();
        console.log(dateformater.format(date));
        let currentMonth = dateformater.format(date, 'YYYY-MM');
        this.setState({
            conditioninited: true,
            payQuery: Object.assign({}, this.state.payQuery, {currentMonth: currentMonth})
        })

        console.log("当前月份：", currentMonth);
    }

    inter_getJobOptions(){
        new FetchList().fetchList("/data/joblevel/options", (datalist)=>{
            this.setState({
                tableinited: true,
                jobOptions: datalist,
            })
        });
    }

    componentWillMount(){
        this.init_currentDateTime();
        this.inter_getJobOptions();
    }

    render() {
        moment.locale("zh-cn");
        return (
            <div class="container">
            <div class="row">
                <div class="page-header">
                    <h1>{this.state.dataTypeName}</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h5>{this.state.queryTitle}</h5>
                        </div>
                        <div class="panel-body">
                            {this.state.conditioninited &&
                            <form class="form-horizontal">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="form-group">
                                            <label for="employeeId" class="col-xs-1 control-label">员工工号</label>
                                            <div class="col-xs-2">
                                                <input type="text" class="form-control" id="employeeId" placeholder="请输入工号"
                                                    value={this.state.payQuery.employeeId}
                                                    onChange={this.onWorkIdChange.bind(this)}/>
                                            </div>
                                            <label for="employeeName" class="col-sm-1 control-label">员工姓名</label>
                                            <div class="col-sm-3">
                                                <input type="text" class="form-control" id="employeeName" placeholder="请输入姓名"
                                                    value={this.state.payQuery.employeeName}
                                                    onChange={this.onOperatorNameChange.bind(this)}/>
                                            </div>
                                            <label for="name" class="col-sm-1 control-label">月份</label>
                                            <div class="col-sm-3">
                                                <MonthPicker defaultValue={moment(this.state.payQuery.currentMonth, "YYYY-MM")} 
                                                    format={"YYYY-MM"} locale="zh-cn" size={"large"}
                                                    onChange={this.onMonthChange.bind(this)}/>
                                            </div>
                                            <div class="col-xs-1">
                                                <btn class="btn btn-primary" onClick={this.onQueryPayment.bind(this)}>薪资查询</btn>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    {this.state.tableinited &&
                    <table class="table table-striped">
                       <thead>
                          <tr>
                             <th>工号</th>
                             <th>姓名</th>
                             {this.state.jobOptions.map((item, index)=>(
                                <th key={index}>{item.value + '工时'}</th>
                                ))}
                             <th>主岗</th>
                             <th>岗位补贴1</th>
                             <th>岗位补贴2</th>                      
                             <th>星级补贴</th>
                             <th>总补贴1</th>
                             <th>总补贴2</th>                       
                          </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.payList.items.map((item, index1) =>(
                                <tr key={index1}>
                                    <td>{item.employeeId}</td>
                                    <td>{item.employeeName}</td>
                                    {this.state.jobOptions.map((jobopt, index2)=>(
                                    <td key={jobopt.key}>{
                                        Object.is(jobopt.value, item.mainHourLevel)?
                                        <span class="label label-success">{item.levelHours[jobopt.value]}</span>:
                                        <span>{item.levelHours[jobopt.value]}</span>                                        
                                    }
                                    </td>
                                    ))}
                                    <td>{item.mainHourLevel}</td>
                                    <td>{item.jobSubsidiesOptions[0]}</td>
                                    <td>{item.jobSubsidiesOptions[1]}</td>
                                    <td>{item.starSubsidies}</td>
                                    <td>{item.totalSubsidies[0]}</td>
                                    <td>{item.totalSubsidies[1]}</td>                        
                                </tr>                                               
                                ))
                        }
                       </tbody>
                       <tfoot>
                          <tr>
                             <td></td>
                             <td></td>
                             <td></td>
                             <td></td>
                             <td></td>
                             <td></td>
                             <td></td>
                             <td></td>
                             <td>合计</td>
                             <td>{this.state.payList.sumTotalSubsidies[0]}</td>
                             <td>{this.state.payList.sumTotalSubsidies[1]}</td>                    
                          </tr>               
                       </tfoot>
                    </table>
                    }
                </div>
            </div>
        </div>
        );
    }
}