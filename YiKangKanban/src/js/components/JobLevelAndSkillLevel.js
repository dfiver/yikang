import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';
import DictStar from './DictStar';

export default class JobLevelAndSkillLevel extends React.Component {
    constructor() {
        super();
        this.state = {
            dataTypeName: '岗位级别及星级设置',
            jobLevelDataType: '岗位级别设置',
            headerlist: [{
                name: 'name',
                nickName: '岗位级别名称',
                type: "text",
                width: 3
            }, {
                name: 'comment',
                nickName: '岗位级别说明',
                type: 'textarea',
                width: 7
            }],
            itemlist: [{
                name: 'A类',
                comment: 'A类岗位'
            }, {
                name: 'B类',
                comment: 'B类岗位'
            }, {
                name: 'C类',
                comment: 'C类岗位'
            }],
            emptyitem: {
                name: '',
                comment: ''
            }
        }
    }
    onChange(item){
        let id = item.id;
        this.props.history.push('/backward/mjoblevelandskilllevel/'+id);
    }
    onAdd(){
        this.props.history.push('/backward/mjoblevelandskilllevel/0');
    }
    render() {
        return (
            <div>
            <div class="container">
                <div class="row">
                    <div class="page-header">
                        <h1>{this.state.dataTypeName}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3>{this.state.jobLevelDataType}</h3>
                            </div>
                            <div class="panel-body">
                                <BaseEditableDataTable dataTypeName={this.state.jobLevelDataType}
                                          headerlist={this.state.headerlist}
                                          emptyitem={this.state.emptyitem}
                                          fetchURL="/data/joblevel"
                                                       onChange={this.onChange.bind(this)}
                                                       onAdd={this.onAdd.bind(this)}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <DictStar/>
        </div>
        );
    }
}