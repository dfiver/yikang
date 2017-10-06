import React from 'react';
import ReactDOM from 'react-dom';
import {
	Link,
    Redirect
} from 'react-router-dom';
import {getStringForUnicode,getUnicode} from './Unicode';
import {Button} from 'antd';


const PermLink = function (props) {
	const sessionPerm =JSON.parse(sessionStorage.perm);
	const perm = getStringForUnicode(sessionPerm)?getStringForUnicode(sessionPerm).split(","):"";
    return perm.indexOf(""+props.id)>-1?(<li><Link to={props.to}>{props.children}</Link></li>): null;
};
export default class NavHeader extends React.Component {
	constructor(props){
		super(props);
		this.handleLogout=this.handleLogout.bind(this);
		this.handleUserInfo=this.handleUserInfo.bind(this);
	}
    handleUserInfo(){
		this.props.history.push('/backward/self');
        // this.context.router.history.push('/backward/self');
	}
	handleLogout(){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('perm');
        sessionStorage.removeItem('uid');
	}
	render() {
		const logined = !!sessionStorage.token;
		if(!logined){
			return (
				<Redirect to="/login"/>
			);
		}
		return (
			<nav className="navbar navbar-inverse">
			<div className="container-fluid">
				<div className="navbar-header">
					<a href="/" className="navbar-brand">益康</a>
				</div>
				<ul className="nav navbar-nav navbar-right">
					<li><a href="#" onClick={this.handleUserInfo}><span className="glyphicon glyphicon-user"></span>用户</a></li>
					<li><a href="#" onClick={this.handleLogout}><span className="glyphicon glyphicon-log-in"></span> 退出</a></li>
			    </ul>
				<ul className="nav navbar-nav">
					<li className="dropdown" >
						<a href="#" className="dropdown-toggle" data-toggle="dropdown">
							基础数据管理
							<b className="caret"></b>
						</a>
						<ul className="dropdown-menu">
							<PermLink to="/backward/workshop" id="1">生产车间</PermLink>
							<PermLink to="/backward/productfamily" id="2">产品家族</PermLink>
							<PermLink to="/backward/line" id="3">生产线</PermLink>
							<li className="divider"/>
							<PermLink to="/backward/job" id="4">岗位类别</PermLink>
							<PermLink to="/backward/joblevelandskilllevel" id="5">岗位级别及技能级别</PermLink>
							<li className="divider"/>
							<PermLink to="/backward/productcode" id="6">生产型号</PermLink>
							<PermLink to="/backward/batchno" id="7">批次号</PermLink>
							<li className="divider"/>
							<PermLink to="/backward/mode" id="8">停机原因类别</PermLink>
							<PermLink to="/backward/stopreason" id="9">停机原因</PermLink>
							<li className="divider"/>
							<PermLink to="/backward/user" id="10">用户</PermLink>
							<PermLink to="/backward/roleandpower" id="11">角色权限</PermLink>
							<PermLink to="/backward/operator" id="12">操作人员</PermLink>
                            <PermLink to="/backward/shift" id="13">班组管理</PermLink>
							<li className="divider"/>
							<PermLink to="/backward/paymeta" id="14">补贴数据设置</PermLink>
							<PermLink to="/backward/pay" id="15">薪资</PermLink>
							<PermLink to="/backward/operationlist" id="16">人员工作明细清单</PermLink>
						</ul>
					</li>
					<li>
						<Link to="/backward/commitProductandstopreasonlineselect">生产停机信息采集</Link>
					</li>
					<li>
						<Link to="/linescreen/select/linescreen">屏显看板</Link>						
					</li>
					<li>
						<a href="#" className="dropdown-toggle" data-toggle="dropdown">
							报表展示
							<b className="caret"></b>
						</a>
						<ul className="dropdown-menu">
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
// NavHeader.contextTypes = {
//     router: React.PropTypes.object
// };