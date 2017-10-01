import React from 'react';
import ReactDOM from 'react-dom';
import {
	Link,
    Redirect
} from 'react-router-dom';
import {getStringForUnicode,getUnicode} from './Unicode';


const PermLink = function (props) {
	const sessionPerm =JSON.parse(sessionStorage.perm);
	const perm = getStringForUnicode(sessionPerm)?getStringForUnicode(sessionPerm).split(","):"";
    return perm.indexOf(""+props.id)>-1?(<li><Link to={props.to}>{props.children}</Link></li>): null;
};
export default class NavHeader extends React.Component {
	constructor(props){
		super(props);
		this.handleLogout=this.handleLogout.bind(this);
	}
	handleLogout(){
        sessionStorage.removeItem('token');
	}
	render() {
		const logined = !!sessionStorage.token;
		if(!logined){
			return (
				<Redirect to="/login"/>
			);
		}
		return (
			<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<div class="navbar-header">
					<a href="/" class="navbar-brand">益康</a>
				</div>
				<ul class="nav navbar-nav navbar-right">
					<li>
						{/*<button type="button" class="btn btn-primary btn-sm"></button>*/}
						<span class="glyphicon glyphicon-user"></span>用户
					</li>
					<li><a href="#" onClick={this.handleLogout}><span class="glyphicon glyphicon-log-in"></span> 退出</a></li>
			    </ul>
				<ul class="nav navbar-nav">
					<li class="dropdown" >
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							基础数据管理
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<PermLink to="/backward/workshop" id="1">生产车间</PermLink>
							<PermLink to="/backward/productfamily" id="2">产品家族</PermLink>
							<PermLink to="/backward/line" id="3">生产线</PermLink>
							<li class="divider"/>
							<PermLink to="/backward/job" id="4">岗位类别</PermLink>
							<PermLink to="/backward/joblevelandskilllevel" id="5">岗位级别及技能级别</PermLink>
							<li class="divider"/>
							<PermLink to="/backward/productcode" id="6">生产型号</PermLink>
							<PermLink to="/backward/batchno" id="7">批次号</PermLink>
							<li class="divider"/>
							<PermLink to="/backward/mode" id="8">停机原因类别</PermLink>
							<PermLink to="/backward/stopreason" id="9">停机原因</PermLink>
							<li class="divider"/>
							<PermLink to="/backward/user" id="10">用户</PermLink>
							<PermLink to="/backward/roleandpower" id="11">角色权限</PermLink>
							<PermLink to="/backward/operator" id="12">操作人员</PermLink>
                            <PermLink to="/backward/operatordetail/909087628027035659">操作人员明细(临时的)</PermLink>
							<li class="divider"/>
							<PermLink to="/backward/paymeta" id="13">补贴数据设置</PermLink>
							<PermLink to="/backward/pay" id="14">薪资</PermLink>
							<PermLink to="/backward/operationlist" id="15">人员工作明细清单</PermLink>
						</ul>
					</li>
					<li>
						<Link to="/backward/commitProductandstopreasonlineselect">生产停机信息采集</Link>
					</li>
					<li>
						<Link to="/linescreen/select/linescreen">屏显看板</Link>						
					</li>
					<li>
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							报表展示
							<b class="caret"></b>
						</a>
						<ul class="dropdown-menu">
							<PermLink to="/backward/productandstopreport" id="18">生产和停机信息列表</PermLink>
							<PermLink to="/backward/gapreport" id="19">GAP图表</PermLink>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
		);
	}
}
