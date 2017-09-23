import React from 'react';
import ReactDOM from 'react-dom';

export default class OperationList extends React.Component{
	render(){
		return (
        <div class="container">
            <div class="row">
                <div class="page-header">
                    <h1>人员工作明细报表</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>查询条件</h4>
                        </div>
                        <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label for="firstname" class="col-md-1 control-label">人员编号</label>
                                    <div class="col-md-2">
                                        <select class="form-control">
                                            <option>ALL</option>
                                            <option>001</option>
                                            <option>002</option>
                                            <option>003</option>
                                        </select>
                                    </div>
                                    <label for="firstname" class="col-md-1 control-label">人员姓名</label>
                                    <div class="col-md-2">
                                        <select class="form-control">
                                            <option>ALL</option>
                                            <option>路人1</option>
                                            <option>路人2</option>
                                            <option>路人3</option>
                                            <option>路人4</option>
                                            <option>路人5</option>
                                        </select>
                                    </div>
                                    <label for="firstname" class="col-md-1 control-label">开始时间</label>
                                    <div class="col-md-2">
                                        <input type="datetime-local" class="form-control"/>
                                    </div>  
                                    <label for="firstname" class="col-md-1 control-label">结束时间</label>
                                    <div class="col-md-2">
                                        <input type="datetime-local" class="form-control"/>
                                    </div>                                                          
                                </div>
                                <div class="form-group">
                                    <label for="firstname" class="col-md-1 control-label">生产线:</label>
                                    <div class="col-md-4">
                                        <select class="form-control">
                                            <option>生产线1</option>
                                            <option>生产线2</option>
                                            <option>生产线3</option>
                                            <option>生产线4</option>
                                        </select>
                                    </div>
                                    <div class="col-md-7">
                                        <button class="btn btn-success btn-sm pull-right">查询</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>      
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h4>人员工作明细报表</h4>
                    <table class="table table-bordered table-striped">
                       <thead>
                          <tr>
                             <th>人员编号</th>
                             <th>人员姓名</th>
                             <th>开始时间</th>
                             <th>结束时间</th>
                             <th>生产线</th>
                             <th>岗位名称</th>
                             <th>岗位类别</th>
                             <th>工作时长</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr>
                             <td>001</td>
                             <td>库里</td>
                             <td>2017/7/26 8:00</td>
                             <td>2017/7/26 12:00</td>
                             <td>生产线1</td>                       
                             <td>点胶1</td>
                             <td>A</td>
                             <td>4</td>
                          </tr>
                          <tr>
                             <td>002</td>
                             <td>杜兰特</td>
                             <td>2017/7/26 8:00</td>
                             <td>2017/7/26 12:00</td>
                             <td>生产线1</td>                       
                             <td>点胶2</td>
                             <td>A</td>
                             <td>4</td>
                          </tr>               
                       </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <button class="btn btn-success btn-lg pull-right">导出全部</button>
                </div>
            </div>
        </div>
			);
	}
}