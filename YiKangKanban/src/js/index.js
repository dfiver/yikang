import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import bootstrap from 'bootstrap';
import bootstrapvalidator from 'bootstrap-validator';
import bootstrapselect from 'bootstrap-select';
import {
    Switch as RcSwitch
} from 'rc-switch';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import NavHeader from './components/NavHeader';
import Report from './components/Report';
import WorkShop from './components/WorkShop';
import ProductFamily from './components/ProductFamily';
import Line from './components/Line';
import JobLevelAndSkillLevel from './components/JobLevelAndSkillLevel';
import Job from './components/Job';
import ProductCode from './components/ProductCode';
import BatchNo from './components/BatchNo';
import Mode from './components/Mode';
import StopReason from './components/StopReason';
import User from './components/User';
import RoleAndPower from './components/RoleAndPower';
import Operator from './components/Operator';
import OperatorDetail from './components/OperatorDetail';
import OperationList from './components/OperationList';
import PayMeta from './components/PayMeta';
import Pay from './components/Pay';
import CommitProductAndStopReason from './components/CommitProductAndStopReason';
import ProductAndStopReport from './components/ProductAndStopReport';
import GAPReport from './components/GAPReport';
import LineScreen from './components/LineScreen';
import CommitProductAndStopReasonLineSelect from './components/CommitProductAndStopReasonLineSelect';

class YiKangRouter extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Router>
                <div>
                    <Route path="/linescreen/:linid" component={LineScreen}></Route>{/*屏显看板*/}
                    {/*<Route path="/" onEnter={requireAuth}></Route> 授权页面*/}
                    <Route path="/backward" component={NavHeader}></Route> {/*首页：报表页面*/}                
                    <Route path="/backward/workshop" component={WorkShop}></Route>{/*生产车间管理*/}
                    <Route path="/backward/productfamily" component={ProductFamily}></Route>{/*产品家族管理*/}
                    <Route path="/backward/line/:lineId" component={Line}></Route>{/*生产线管理*/}

                    <Route path="/backward/joblevelandskilllevel" component={JobLevelAndSkillLevel}></Route>{/*岗位级别及技能星级设置*/}
                    <Route path="/backward/job" component={Job}></Route>{/*岗位管理*/}

                    <Route path="/backward/productcode" component={ProductCode}></Route>{/*生产型号管理*/}
                    <Route path="/backward/batchno" component={BatchNo}></Route>{/*批次号管理*/}
                    <Route path="/backward/mode" component={Mode}></Route>{/*停机原因类别管理*/}
                    <Route path="/backward/stopreason" component={StopReason}></Route>{/*停机原因管理*/}

                    <Route path="/backward/user" component={User}></Route>{/*用户管理*/}
                    <Route path="/backward/roleandpower" component={RoleAndPower}></Route>{/*角色权限管理*/}

                    <Route path="/backward/operator" component={Operator}></Route>{/*操作人员管理*/}
                    <Route path="/backward/operatordetail/:id" component={OperatorDetail}></Route>{/*操作人员明细*/}
                    <Route path="/backward/operationList" component={OperationList}></Route>{/*人员工作明细清单*/}
                    <Route path="/backward/paymeta" component={PayMeta}></Route>{/*补贴基础数据设置*/}
                    <Route path="/backward/pay" component={Pay}></Route>{/*薪资管理*/}

                    <Route path="/backward/commitproductandstopreaon/:lineId" component={CommitProductAndStopReason}></Route>{/*生产信息采集*/}
                <Route path="/backward/commitProductandstopreasonlineselect" component={CommitProductAndStopReasonLineSelect}></Route>{/*生产信息采集*/}                    
                    <Route path="/backward/productandstopreport" component={ProductAndStopReport}></Route>{/*生产和停机信息列表*/}
                    <Route path="/backward/gapreoprt" component={GAPReport}></Route>{/*GAP图表*/}
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<YiKangRouter/>, document.getElementById("mainContainer"));