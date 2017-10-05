import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";

export default class LineSeatEditPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            lineid:this.props.match.params.lineid
        }
    }
    render(){
        const cols=[{
            label:"生产线",
            type:"select",
            name:"lineId",
            defaultValue: this.state.lineid,
            disable:true
        },{
            label:"坐席位置",
            type:"number",
            name:"serise"
        },{
            label:"岗位",
            type:"select",
            name:"jobId"
        },{
            label:"工位名称",
            type:"input",
            name:"name"
        },{
            label:"备注",
            type:"input",
            name:"comment"
        }];
        const selectionSource={
            jobId:{
                url:'/data/job/options',
                source:[]
            },
            lineId:{
                url:'/data/line/options',
                source:[],
            }
        };
        return (
            <EditPage  title="工位编辑" selectionSource={selectionSource} id={this.props.match.params.id} url="/data/lineseat" listurl={"/backward/lineseat/"+this.state.lineid} cols={cols}/>
        );
    }
}