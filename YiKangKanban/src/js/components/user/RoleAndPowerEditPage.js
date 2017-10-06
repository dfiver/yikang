import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";

export default class RoleAndPowerEditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const cols=[{
            label:"角色名称",
            type:"input",
            name:"name"
        },{
            label:"权限设置",
            type:"checkbox",
            name:"permission"
        },{
            label:"备注",
            type:"input",
            name:"comment"
        }];
        const selectionSource={
            permission:{
                url:'/data/role/kvs',
                source:[]
            }
        };
        return (
            <EditPage title="角色编辑" selectionSource={selectionSource} id={this.props.match.params.id} url="/data/role" listurl="/backward/roleandpower" cols={cols}/>
        )
    }
}