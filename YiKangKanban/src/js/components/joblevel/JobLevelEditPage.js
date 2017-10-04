import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";

export default class JobLevelEditPage extends React.Component{
    constructor(props){
        super(props);
        this.state={};
    }
    render(){
        const cols=[{
            label:"岗位级别名称",
            type:"input",
            name:"name"
        },{
            label:"岗位级别备注",
            type:"input",
            name:"comment"
        }];
        return(
            <EditPage title="岗位级别编辑" id={this.props.match.params.id} url="/data/joblevel" listurl="/backward/joblevelandskilllevel" cols={cols}/>
        )
    }
}