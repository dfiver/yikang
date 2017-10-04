import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from '../EditPage';

export  default class FamilyEditPage extends React.Component{
    constructor(props){
        super(props);
        this.state={}
    }
    render(){
        const cols=[{
            label:"产品家族名称",
            type:"input",
            name:"name"
        },{
            label:"产品家族备注",
            type:"input",
            name:"comment"
        }];
        return (
            <EditPage title="产品家族编辑" id={this.props.match.params.id} url="/data/productfamily" listurl="/backward/productfamily" cols={cols}/>
        )
    }
}