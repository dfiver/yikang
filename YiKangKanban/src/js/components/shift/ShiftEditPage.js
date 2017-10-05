import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";


export default class ShiftEditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const cols=[{
            label:"班组名称",
            type:"input",
            name:"name"
        },{
            label:"负责人",
            type:"input",
            name:"owner"
        },{
            label:"班组备注",
            type:"input",
            name:"comment"
        }];
        return(
            <EditPage title="班组编辑页面" id={this.props.match.params.id} url="/data/shift" listurl="/backward/shift" cols={cols}/>
        )
    }
}