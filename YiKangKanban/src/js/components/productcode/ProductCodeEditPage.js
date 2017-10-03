import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";

export  default class ProductCodeEditPage extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const cols=[{
            label:"生产车间",
            type:"select",
            name:"workshopId"
        },{
            label:"产品家族",
            type:"select",
            name:"productfamilyId"
        },{
            label:"产品型号名称",
            type:"input",
            name:"productcode"
        },{
            label:"目标每小时产量",
            type:"input",
            name:"target"
        },{
            label:"Cycle Time",
            type:"input",
            name:"cycletime"
        },{
            label:"EU",
            type:"input",
            name:"eu"
        },{
            label:"产品型号备注",
            type:"input",
            name:"comment"
        }];
        const selectionSource={
            workshopId:{
                url:'/data/workshop/options',
                source:[]
            },
            productfamilyId:{
                url:'/data/productfamily/options',
                source:[]
            }
        };
        return(
            <EditPage title="产品家族编辑" selectionSource={selectionSource} id={this.props.match.params.id} url="/data/productcode" listurl="/backward/productcode" cols={cols}/>
        )
    }
}