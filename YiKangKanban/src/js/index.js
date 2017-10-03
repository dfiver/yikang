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
    Route,
    Redirect
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
import Login from './components/Login';
import CommitProductAndStopReasonLineSelect from './components/CommitProductAndStopReasonLineSelect';
import LineScreenLineSelect from './components/LineScreenLineSelect';
import WorkShopEditPage from "./components/workshop/WorkShopEditPage";

const PrivateRoute = (p) => ( < Route {...p
    }
    render = {
        props => (!!sessionStorage.token ? (
            <p.comp {...props}/>
        ) : ( < Redirect to = {
                {
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }
            }
            />
        ))
    }
    />
);

class YiKangRouter extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Router>
                <div>
                    <Route path="/login" component={Login} ></Route>{/*登陆页面*/}
                    <PrivateRoute path="/linescreen/line/:lineId" comp={LineScreen}></PrivateRoute>{/*屏显看板*/}
                    <PrivateRoute path="/linescreen/select/linescreen" comp={LineScreenLineSelect}></PrivateRoute>{/*生产线选择*/}                
                    <PrivateRoute path="/backward" comp={NavHeader}></PrivateRoute> {/*首页：报表页面*/}
                    <PrivateRoute path="/backward/workshop" comp={WorkShop}></PrivateRoute>{/*生产车间管理*/}
                    <PrivateRoute path="/backward/mworkshop/:id" comp={WorkShopEditPage}></PrivateRoute>{/*生产车间管理*/}
                    <PrivateRoute path="/backward/productfamily" comp={ProductFamily}></PrivateRoute>{/*产品家族管理*/}
                    <PrivateRoute path="/backward/line" comp={Line}></PrivateRoute>{/*生产线管理*/}

                    <PrivateRoute path="/backward/joblevelandskilllevel" comp={JobLevelAndSkillLevel}></PrivateRoute>{/*岗位级别及技能星级设置*/}
                    <PrivateRoute path="/backward/job" comp={Job}></PrivateRoute>{/*岗位管理*/}

                    <PrivateRoute path="/backward/productcode" comp={ProductCode}></PrivateRoute>{/*生产型号管理*/}
                    <PrivateRoute path="/backward/batchno" comp={BatchNo}></PrivateRoute>{/*批次号管理*/}
                    <PrivateRoute path="/backward/mode" comp={Mode}></PrivateRoute>{/*停机原因类别管理*/}
                    <PrivateRoute path="/backward/stopreason" comp={StopReason}></PrivateRoute>{/*停机原因管理*/}

                    <PrivateRoute path="/backward/user" comp={User}></PrivateRoute>{/*用户管理*/}
                    <PrivateRoute path="/backward/roleandpower" comp={RoleAndPower}></PrivateRoute>{/*角色权限管理*/}

                    <PrivateRoute path="/backward/operator" comp={Operator}></PrivateRoute>{/*操作人员管理*/}
                    <PrivateRoute path="/backward/operatordetail/:id" comp={OperatorDetail}></PrivateRoute>{/*操作人员明细*/}
                    <PrivateRoute path="/backward/operationList" comp={OperationList}></PrivateRoute>{/*人员工作明细清单*/}
                    <PrivateRoute path="/backward/paymeta" comp={PayMeta}></PrivateRoute>{/*补贴基础数据设置*/}
                    <PrivateRoute path="/backward/pay" comp={Pay}></PrivateRoute>{/*薪资管理*/}

                    <PrivateRoute path="/backward/commitproductandstopreaon/:lineId" comp={CommitProductAndStopReason}></PrivateRoute>{/*生产信息采集*/}
                    <PrivateRoute path="/backward/commitProductandstopreasonlineselect" comp={CommitProductAndStopReasonLineSelect}></PrivateRoute>{/*生产信息采集*/}                    
                    <PrivateRoute path="/backward/productandstopreport" comp={ProductAndStopReport}></PrivateRoute>{/*生产和停机信息列表*/}
                    <PrivateRoute path="/backward/gapreoprt" comp={GAPReport}></PrivateRoute>{/*GAP图表*/}
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<YiKangRouter/>, document.getElementById("mainContainer"));
