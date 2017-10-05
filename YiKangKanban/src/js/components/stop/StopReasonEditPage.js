import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";

export default class StopReasonEditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const cols=[{
            label:"停机原因名称",
            type:"input",
            name:"name"
        },{
            label:"停机原因类别",
            type:"select",
            name:"modeId"
        },{
            label:"停机原因注释",
            type:"input",
            name:"comment"
        }];
        const selectionSource={
            modeId:{
                url:'/data/mode/options',
                source:[]
            }
        };
        return (
            <EditPage  title="停机原因编辑" selectionSource={selectionSource} id={this.props.match.params.id} url="/data/reason" listurl="/backward/stopreason" cols={cols}/>
        );
    }
}