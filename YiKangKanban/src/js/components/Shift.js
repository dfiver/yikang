import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';
import FetchList from './FetchList';

export default class Job extends React.Component {
    constructor() {
        super();
        this.state = {
            dataTypeName: '班组管理',
            headerlist: [{
                name: 'name',
                nickName: '班组名称',
                type: 'text',
                width: 3
            }, {
                name: 'owner',
                nickName: '负责人',
                type: "text",
                width: 2
            }, {
                name: 'comment',
                nickName: '备注',
                type: 'textarea',
                width: 3
            }],
            itemlist: [{
                name: '生产岗位1',
                owner: '张三',
                comment: '生产岗位1备注'
            }],
            emptyitem: {
                name: '',
                owner: '',
                comment: ''
            }
        }
    }

    componentWillMount() {
        //更新班组列表
        console.log("Shift will mount!");
    }


    onChange(item){
        let id = item.id;
        this.props.history.push('/backward/mshift/'+id);
    }
    onAdd(){
        this.props.history.push('/backward/mshift/0');
    }

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="page-header">
                        <h1>{this.state.dataTypeName}</h1>
                    </div>
                </div>
                <div class="row">
                  <BaseEditableDataTable dataTypeName={this.state.dataTypeName}
                                headerlist={this.state.headerlist}
                                emptyitem={this.state.emptyitem}
                                fetchURL ={"/data/shift"}
                                onChange={this.onChange.bind(this)}
                                onAdd={this.onAdd.bind(this)}/>
                </div>
            </div>
        );
    }
}