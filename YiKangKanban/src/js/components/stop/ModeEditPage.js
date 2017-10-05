import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";

export default class ModeEditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const cols=[{
            label:"停机原因类别名称",
            type:"input",
            name:"name"
        },{
            label:"备注",
            type:"input",
            name:"comment"
        }];
        return(
            <EditPage  title="停机原因类别编辑" id={this.props.match.params.id} url="/data/mode" listurl="/backward/mode" cols={cols}/>
        )
    }
}