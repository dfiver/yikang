import React from 'react';
import ReactDOM from 'react-dom';
import {
	Link
} from 'react-router-dom';

export default class NavHeader extends React.Component {
	render() {
		return (
			<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<div class="navbar-header">
					<a href="/" class="navbar-brand">益康</a>
				</div>
				<ul class="nav navbar-nav navbar-right">
					<li>
						<button type="button" class="btn btn-primary btn-lg">
	  						<span class="glyphicon glyphicon-user"></span> User
						</button>
					</li>
					<li><a href="#"><span class="glyphicon glyphicon-log-in"></span> 登录</a></li>
			    </ul>
				<ul class="nav navbar-nav">
					<li class="dropdown" >
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							基础数据管理
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<li><Link to="/backward/workshop">生产车间管理</Link></li>
							<li><Link to="/backward/productfamily">产品家族管理</Link></li>
							<li><Link to="/backward/line">生产线管理</Link></li>
							<li class="divider"/>
							<li><Link to="/backward/job">岗位类别管理</Link></li>
							<li><Link to="/backward/joblevelandskilllevel">岗位级别及技能级别管理</Link></li>
							<li class="divider"/>
							<li><Link to="/backward/productcode">生产型号管理</Link></li>
							<li><Link to="/backward/batchno">批次号管理</Link></li>
							<li class="divider"/>
							<li><Link to="/backward/mode">停机原意类别管理</Link></li>
							<li><Link to="/backward/stopreason">停机原因管理</Link></li>
							<li class="divider"/>
							<li><Link to="/backward/user">用户管理</Link></li>
							<li><Link to="/backward/roleandpower">角色权限管理</Link></li>
							<li><Link to="/backward/operator">操作人员管理</Link></li>
                            <li><Link to="/backward/operatordetail/909087628027035659">操作人员明细(临时的)</Link></li>
							<li class="divider"/>
							<li><Link to="/backward/paymeta">补贴数据设置</Link></li>
							<li><Link to="/backward/pay">薪资管理</Link></li>
							<li><Link to="/backward/operationlist">人员工作明细清单</Link></li>							
						</ul>
					</li>
					<li>
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							运营数据管理
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<li><Link to="/backward/commitproductinfo">生产信息管理</Link></li>
							<li><Link to="/backward/commitstopreasoninfo">停机信息管理</Link></li>
						</ul>
					</li>
					<li>
						<Link to="/linescreen/001">屏显看板</Link>
					</li>
					<li>
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							报表展示
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<li><Link to="/backward/productandstopreport">生产和停机信息列表</Link></li>
							<li><Link to="/backward/gapreport">GAP图表</Link></li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
		);
	}
}