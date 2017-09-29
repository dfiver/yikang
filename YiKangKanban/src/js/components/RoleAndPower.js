import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';


export default class RoleAndPower extends React.Component {
    constructor() {
        super();
        this.state = {
            dataTypeName: '角色权限管理',
            headerlist: [{
                name: 'rolename',
                nickName: '角色',
                type: 'text',
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写角色名称"
                },
                width: 2
            }, {
                name: 'power',
                nickName: '权限',
                type: 'multigroupselect',
                groupoptions: [{
                    name: '基础数据管理',
                    options: [{
                        key: '1',
                        value: '生产车间管理'
                    }, {
                        key: '2',
                        value: '产品家族管理'
                    }, {
                        key: '3',
                        value: '生产线管理'
                    }, {
                        key: '4',
                        value: '岗位类别管理'
                    }, {
                        key: '5',
                        value: '岗位技能及岗位级别管理'
                    }, {
                        key: '6',
                        value: '生产型号管理'
                    }, {
                        key: '7',
                        value: '批次号管理'
                    }, {
                        key: '8',
                        value: '停机原因类别管理'
                    }, {
                        key: '9',
                        value: '停机原因管理'
                    }, {
                        key: '10',
                        value: '用户管理'
                    }, {
                        key: '11',
                        value: '角色权限管理'
                    }, {
                        key: '12',
                        value: '操作人员管理'
                    }, {
                        key: '13',
                        value: '补贴数据设置'
                    }, {
                        key: '14',
                        value: '薪资管理'
                    }, {
                        key: '15',
                        value: '人员工作明细清单'
                    }, ]
                }, {
                    name: '运营数据管理',
                    options: [{
                        key: '16',
                        value: '生产信息管理'
                    } ]
                }, {
                    name: '报表展示',
                    options: [{
                        key: 18,
                        value: '生产和停机信息列表'
                    }, {
                        key: 19,
                        value: 'GAP图表'
                    }, ]
                }],
                width: 4
            }, {
                name: 'comment',
                nickName: '角色备注',
                type: 'text',
                width: 3
            }],
            itemlist: [{
                rolename: '管理员',
                power: {
                    key: '1,2,3',
                    value: '生产车间管理,产品家族管理,产品线管理'
                },
                comment: '管理员角色备注',
                state: true,
            }, {
                rolename: '班长',
                power: {
                    key: '1,2',
                    value: '生产车间管理,产品家族管理,'
                },
                comment: '用户B备注',
                state: true,
            }, {
                rolename: '财务人员',
                power: {
                    key: '3',
                    value: '财务'
                },
                comment: '用户C备注',
                state: true,
            }],
            emptyitem: {
                rolename: '',
                power: '',
                comment: '',
                state: true,
                power:{
                    key: '',
                    value: ''
                }
            }
        }
    }
    viewToEntity(viewItem) {
        console.log("viewItem====",viewItem);
        return {
            id:viewItem.id,
            name: viewItem.rolename,
            comment: viewItem.comment,
            permission:viewItem.power.key
        }
    }
    entityToView(entity) {
        console.log("entity====",entity);
        return {
            id:entity.id,
            rolename: entity.name,
            power:{
                key: entity.permission,
                value: entity.permission
            },
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
                      itemlist={this.state.itemlist}
                      fetchURL={"/data/role"}
                      viewToEntity = {this.viewToEntity}
                      entityToView = {this.entityToView}
                      emptyitem={this.state.emptyitem}/>
                </div>
            </div>
        );
    }
}