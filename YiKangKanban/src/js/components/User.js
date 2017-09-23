import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';


export default class User extends React.Component {
    constructor() {
        super();
        this.state = {
            dataTypeName: '用户管理',
            headerlist: [{
                name: 'username',
                nickName: '用户名',
                type: 'text',
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写用户名"
                },
                width: 1
            }, {
                name: 'realname',
                nickName: '真实姓名',
                type: 'text',
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写真实姓名"
                },
                width: 2
            }, {
                name: 'role',
                nickName: '用户角色',
                type: 'multiselect',
                selectoptions: [{
                    key: '1',
                    value: '管理员'
                }, {
                    key: '2',
                    value: '班长'
                }, {
                    key: '3',
                    value: '财务'
                }],
                width: 3

            }, {
                name: 'comment',
                nickName: '用户备注',
                type: 'textarea',
                width: 2
            }, {
                name: 'passwordState',
                nickName: '密码状态',
                type: 'reset',
                switchoptions: [{
                    state: true,
                    stateValue: '用户已设置密码',
                    btnTitle: '恢复初始密码',
                    enabled: true
                }, {
                    state: false,
                    stateValue: '系统初始密码',
                    btnTitle: '恢复初始密码',
                    enabled: false
                }],
                width: 2
            }],
            itemlist: [{
                username: 'usera',
                realname: '用户A',
                role: {
                    key: '1,2,3',
                    value: '管理员,班长,财务'
                },
                comment: '用户A备注',
                passwordState: true,
            }, {
                username: 'userb',
                realname: '用户B',
                role: {
                    key: '1,2',
                    value: '管理员,班长'
                },
                comment: '用户B备注',
                passwordState: true,
            }, {
                username: 'userc',
                realname: '用户C',
                role: {
                    key: '3',
                    value: '财务'
                },
                comment: '用户C备注',
                passwordState: true,
            }],
            emptyitem: {
                username: '',
                realname: '',
                role: '',
                comment: '',
                passwordState: false,
            }
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
                      emptyitem={this.state.emptyitem}/>
                </div>
            </div>
        );
    }
}