import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';
import FetchList from './FetchList';

export default class Job extends React.Component {
    constructor() {
        super();
        this.state = {
            dataTypeName: '岗位类别管理',
            headerlist: [{
                name: 'jobname',
                nickName: '岗位名称',
                type: 'text',
                width: 3
            }, {
                name: 'joblevel',
                nickName: '岗位类别',
                type: "select",
                width: 2,
                selectoptions: [{
                    key: '1',
                    value: 'A'
                }, {
                    key: '2',
                    value: 'B'
                }, {
                    key: '3',
                    value: 'C'
                }]
            }, {
                name: 'starlevel',
                nickName: '岗位星级',
                type: 'text',
                width: 2
            }, {
                name: 'comment',
                nickName: '岗位备注',
                type: 'textarea',
                width: 3
            }],
            itemlist: [{
                jobname: '生产岗位1',
                joblevel: {
                    key: '1',
                    value: 'A类'
                },
                comment: '生产岗位1备注'
            }, {
                jobname: '生产岗位2',
                joblevel: {
                    key: '2',
                    value: 'B类'
                },
                comment: '生产岗位2备注'
            }, {
                jobname: '生产岗位3',
                joblevel: {
                    key: '3',
                    value: 'C类'
                },
                comment: '生产岗位3备注'
            }],
            emptyitem: {
                jobname: '',
                joblevel: '',
                comment: ''
            }
        }
    }

    componentWillMount() {
        //更新生产车间列表
        console.log("JobLevelSet will mount!");
        (new FetchList()).fetchList("/data/joblevel/options", (datalist => {
            console.log("workshop options:", datalist);
            let headerItem = Object.assign({}, this.state.headerlist[1], {
                selectoptions: datalist
            });
            let newHeaderlist = [].concat(this.state.headerlist);
            newHeaderlist.splice(1, 1, headerItem);
            this.setState({
                headerlist: newHeaderlist
            });
        }));
    }

    viewToEntity(viewItem) {
        return {
            id: viewItem.id,
            joblevelId: viewItem.joblevel.key,
            starlevel:viewItem.starlevel,
            name: viewItem.jobname,
            comment: viewItem.comment,
        }
    }
    onChange(item){
        let id = item.id;
        this.props.history.push('/backward/mjob/'+id);
    }
    onAdd(){
        this.props.history.push('/backward/mjob/0');
    }
    entityToView(entity) {
        return {
            id: entity.id,
            joblevel: entity.joblevel,
            starlevel: entity.starlevel,
            jobname: entity.name,
            comment: entity.comment
        }
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
                              viewToEntity = {this.viewToEntity}
                              entityToView = {this.entityToView}
                              fetchURL ={"/data/job"}
                                         onChange={this.onChange.bind(this)}
                                         onAdd={this.onAdd.bind(this)}/>
                </div>
            </div>
        );
    }
}