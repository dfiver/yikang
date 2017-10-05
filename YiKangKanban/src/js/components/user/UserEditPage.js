import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";

export default class UserEditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const cols=[{
            label:"用户名",
            type:"input",
            name:"username"
        },{
            label:"姓名",
            type:"input",
            name:"name"
        },{
            label:"员工号",
            type:"input",
            name:"workid"
        },{
            label:"角色",
            type:"select",
            name:"roleId"
        },{
            label:"备注",
            type:"input",
            name:"comment"
        },{
            label:"重置密码",
            type:"password",
            name:"passwd"
        }];
        const selectionSource={
            roleId:{
                url:'/data/role/options',
                source:[]
            }
        };
        return (
            <EditPage  title="用户编辑" selectionSource={selectionSource} id={this.props.match.params.id} url="/data/user" listurl="/backward/user" cols={cols}/>
        );
    }
}