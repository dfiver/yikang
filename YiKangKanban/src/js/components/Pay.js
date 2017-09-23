import React from 'react';
import ReactDOM from 'react-dom';

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
            payQuery:{
                title: '薪资查询',
                employeeId: '',
                employeeName: '',
                years:{
                    selected:2017,
                    options:[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019]
                },
                months:{
                    selected:8,
                    options:['01','02','03','04','05','06','07','08','09','10','11','12']
                }
            },
            payList:{
                items:[{
                    employeeId: '001',
                    employeeName: '张三',
                    levelHours: {
                            A: 162,
                            B: 39,
                            C: 45
                        },
                    mainHourLevel: 'A',
                    jobSubsidiesOptionA: 1000.00,
                    jobSubsidiesOptionB: 1101.00,
                    starSubsidies: 90.00,
                    totalSubsidiesA: 1090.00,
                    totalSubsidiesB: 1191.00                    
                    },{
                    employeeId: '002',
                    employeeName: '李四',
                    levelHours: {
                            A: 0,
                            B: 190,
                            C: 67
                        },
                    mainHourLevel: 'B',
                    jobSubsidiesOptionA: 800.00,
                    jobSubsidiesOptionB: 899.00,
                    starSubsidies: 150.00,
                    totalSubsidiesA: 950.00,
                    totalSubsidiesB: 1049.00
                    },{
                    employeeId: '003',
                    employeeName: '王五',
                    levelHours: {
                            A: 0,
                            B: 178,
                            C: 96
                        },
                    mainHourLevel: 'B',
                    jobSubsidiesOptionA: 800.00,
                    jobSubsidiesOptionB: 1300.00,
                    starSubsidies: 140.00,
                    totalSubsidiesA: 950.00,
                    totalSubsidiesB: 1440.00                        
                    }
                ],
                sumTotalSubsidiesA:2990.00,
                sumTotalSubsidiesB:3680.00
            }
        };
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
                <div class="col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3>薪资查询</h3>
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="employeeId" class="col-sm-2 control-label">员工工号</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="employeeId" placeholder="请输入工号"
                                            defaultValue={this.state.employeeId}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="employeeName" class="col-sm-2 control-label">员工姓名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" id="employeeName" placeholder="请输入姓名"
                                            defaultValue={this.state.employeeName}/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="name" class="col-sm-2 control-label">年份</label>
                                    <div class="col-sm-3">
                                        <select class="form-control" defaultValue={this.state.payQuery.years.selected} placeholder="请选择年份">
                                            {
                                                this.state.payQuery.years.options.map((item, index)=>
                                                    <option key={index} value={item}>{item}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <label for="name" class="col-sm-2 control-label">月份</label>
                                    <div class="col-sm-3">
                                        <select class="form-control" defaultValue={this.state.payQuery.months.selected} placeholder="请选择月份">
                                            {
                                                this.state.payQuery.months.options.map((item,index) =>
                                                    <option key={index} value={index}>{item}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div class="col-sm-2">
                                        <btn class="btn btn-primary btn-big">薪资查询</btn>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <table class="table table-striped">
                       <thead>
                          <tr>
                             <th>工号</th>
                             <th>姓名</th>
                             <th>A级工时</th>
                             <th>B级工时</th>
                             <th>C级工时</th>
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
                                    {Object.keys(item.levelHours).map((level,index2)=>(
                                    <td key={index1 + '' + index2}>
                                        {Object.is(level, item.mainHourLevel)?
                                            <span class="label label-success">{item.levelHours[level]}</span>:
                                            <span>{item.levelHours[level]}</span>
                                        }
                                    </td>
                                    ))}
                                    <td>{item.mainHourLevel}</td>
                                    <td>{item.jobSubsidiesOptionA}</td>
                                    <td>{item.jobSubsidiesOptionB}</td>
                                    <td>{item.starSubsidies}</td>
                                    <td>{item.totalSubsidiesA}</td>
                                    <td>{item.totalSubsidiesB}</td>                        
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
                             <td>{this.state.payList.sumTotalSubsidiesA}</td>
                             <td>{this.state.payList.sumTotalSubsidiesB}</td>                    
                          </tr>               
                       </tfoot>
                    </table>
                </div>
            </div>
        </div>
        );
    }
}