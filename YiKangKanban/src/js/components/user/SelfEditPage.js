import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";

export default class SelfEditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const cols=[{
            label:"用户名",
            type:"readonly",
            name:"username"
        },{
            label:"姓名",
            type:"readonly",
            name:"name"
        },{
            label:"员工号",
            type:"readonly",
            name:"workid"
        },{
            label:"修改密码",
            type:"passwordinput",
            name:"passwd"
        }];
        return (
            <EditPage  title="用户详情" id={sessionStorage.uid} url="/data/user" listurl="/backward/self" cols={cols}  haveListLink={false}/>
        );
    }
}