import React from 'react';
import ReactDOM from 'react-dom';

export default class PayMeta extends React.Component {
    render() {
        return (
            <div class="container">
            <div class="row">
                <div class="page-header">
                    <h1>补贴基础数据设置</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h5>岗位类别月补贴设置</h5>
                        </div>
                        <div class="panel-body">
                            <table class="table table-bordered table-striped">
                               <thead>
                                  <tr>
                                     <th>序号</th>
                                     <th>岗位类别</th>
                                     <th>补贴金额（月）</th>
                                     <th>备注信息</th>
                                     <th>操作</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>A类岗位</td>
                                    <td>1000.00</td>
                                    <td>A类岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>                           
                                  <tr>
                                    <td>2</td>
                                    <td>B类岗位</td>
                                    <td>800.00</td>
                                    <td>B类岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>C类岗位</td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="20.00"></input>
                                    </td>
                                    <td><textarea  class="form-control" placeholder="请输入备注信息"></textarea></td>
                                    <td>
                                        <button class="btn btn-sm btn-success">保存</button>
                                        <button class="btn btn-sm btn-default">取消</button>
                                    </td>
                                  </tr>
                               </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h5>岗位类别时薪设置</h5>
                        </div>
                        <div class="panel-body">
                            <table class="table table-bordered table-striped">
                               <thead>
                                  <tr>
                                     <th>序号</th>
                                     <th>岗位类别</th>
                                     <th>补贴金额（小时）</th>
                                     <th>备注信息</th>
                                     <th>操作</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>A类岗位</td>
                                    <td>50.00</td>
                                    <td>A类岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>                           
                                  <tr>
                                    <td>2</td>
                                    <td>B类岗位</td>
                                    <td>40.00</td>
                                    <td>B类岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>C类岗位</td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="20.00"></input>
                                    </td>
                                    <td><textarea  class="form-control" placeholder="请输入备注信息"></textarea></td>
                                    <td>
                                        <button class="btn btn-sm btn-success">保存</button>
                                        <button class="btn btn-sm btn-default">取消</button>
                                    </td>
                                  </tr>
                               </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h5>岗位星级补贴设置</h5>
                        </div>
                        <div class="panel-body">
                            <table class="table table-bordered table-striped">
                               <thead>
                                  <tr>
                                     <th>序号</th>
                                     <th>岗位类别</th>
                                     <th>岗位星级</th>
                                     <th>补贴金额（月）</th>
                                     <th>备注信息</th>
                                     <th>操作</th>
                                  </tr>
                               </thead>
                               <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>A类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>
                                        &nbsp;1星
                                    </td>
                                    <td>50.00</td>
                                    <td>A1岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>A类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>
                                        &nbsp;2星
                                    </td>
                                    <td>60.00</td>
                                    <td>A2岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>A类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>                         
                                        &nbsp;3星
                                    </td>
                                    <td>70.00</td>
                                    <td>A3岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>A类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>                                 
                                        &nbsp;4星
                                    </td>
                                    <td>80.00</td>
                                    <td>A4岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>5</td>
                                    <td>B类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>
                                        &nbsp;1星
                                    </td>
                                    <td>30.00</td>
                                    <td>B1岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>6</td>
                                    <td>B类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>                     
                                        &nbsp;2星
                                    </td>
                                    <td>40.00</td>
                                    <td>B2岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>7</td>
                                    <td>B类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>     
                                        &nbsp;3星
                                    </td>
                                    <td>50.00</td>
                                    <td>B3岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>     
                                  <tr>
                                    <td>8</td>
                                    <td>B类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>
                                        &nbsp;4星
                                    </td>
                                    <td>50.00</td>
                                    <td>B4岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>9</td>
                                    <td>C类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>
                                        &nbsp;1星
                                    </td>
                                    <td>10.00</td>
                                    <td>B1岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>10</td>
                                    <td>C类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>                         
                                        &nbsp;2星
                                    </td>
                                    <td>20.00</td>
                                    <td>B2岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>11</td>
                                    <td>C类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>                         
                                        &nbsp;3星
                                    </td>
                                    <td>30.00</td>
                                    <td>B3岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary">修改</button>
                                    </td>
                                  </tr>     
                                  <tr>
                                    <td>12</td>
                                    <td>C类岗位</td>
                                    <td>
                                        <span style="color:orange">
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        <span class="glyphicon glyphicon-star"></span>
                                        </span>
                                        &nbsp;4星
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="20.00"></input>
                                    </td>
                                    <td>C4岗位补贴</td>
                                    <td>
                                        <button class="btn btn-sm btn-success">保存</button>
                                        <button class="btn btn-sm btn-default">取消</button>
                                    </td>
                                  </tr>                                            
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
        );
    }
}