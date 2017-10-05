import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";
import {Row, Col, Button} from 'antd';
import { Table, Input, Popconfirm } from 'antd';

export default class LineEditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const cols=[{
            label:"生产线名称",
            type:"input",
            name:"name"
        },{
            label:"生产车间",
            type:"select",
            name:"workshopId"
        },{
            label:"生产线备注",
            type:"input",
            name:"comment"
        }];
        if(this.props.match.params.id>0){
            cols.push({
                label:"管理产线工位",
                type:"link",
                name:"gongweiguanli",
                url:"/backward/lineseat"
            });
        }
        const selectionSource={
            workshopId:{
                url:'/data/workshop/options',
                source:[]
            }
        };
        return(
        <div>
            <EditPage title="生产线编辑" selectionSource={selectionSource} id={this.props.match.params.id} url="/data/line" listurl="/backward/line" cols={cols}/>
        </div>
        )
    }
}