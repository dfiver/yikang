import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";


export default class JobEditPage extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const cols=[{
            label:"岗位名称",
            type:"input",
            name:"name"
        },{
            label:"岗位级别",
            type:"select",
            name:"joblevelId"
        },{
            label:"岗位星级要求",
            type:"input",
            name:"starlevel"
        },{
            label:"岗位备注",
            type:"input",
            name:"comment"
        }];
        const selectionSource={
            joblevelId:{
                url:'/data/joblevel/options',
                source:[]
            }
        };
        return(
            <EditPage title="岗位编辑页面" selectionSource={selectionSource} id={this.props.match.params.id} url="/data/job" listurl="/backward/job" cols={cols}/>
        )
    }
}