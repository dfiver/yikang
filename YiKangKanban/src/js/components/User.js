import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';
import FetchList from './FetchList';


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
                type: 'select',
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
    componentWillMount(){
            console.log("User will mount!");
            //更新生产车间选项
            (new FetchList()).fetchList("/data/role/options", (datalist => {
                console.log("role options:", datalist);
                let headerItem = Object.assign({}, this.state.headerlist[2], {
                    selectoptions: datalist
                });
                let newHeaderlist = [].concat(this.state.headerlist);
                newHeaderlist.splice(2, 1, headerItem);
                this.setState({
                    headerlist: newHeaderlist,
                    emptyitem: Object.assign({}, this.state.emptyitem, {
                        role: datalist.length ? datalist[0] : null
                    })
                });
            }));

    }
    viewToEntity(viewItem) {
        return {
            id:viewItem.id,
            username: viewItem.username,
            name: viewItem.realname,
            passwd: '',
            roleId: viewItem.role.key,
            comment: viewItem.comment
        }
    }
    entityToView(entity) {
        return {
            id:entity.id,
            username: entity.username,
            realname: entity.name,
            passwd: '',
            role:{
                key: entity.roleId,
                value: this.headerlist[2].selectoptions.find((e)=>{
                    console.log("key:",e.key);
                    console.log("roleId",entity.roleId);
                    return e.key==entity.roleId;
                }).value
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
                      fetchURL={"/data/user"}
                      viewToEntity = {this.viewToEntity}
                      entityToView = {this.entityToView}
                      emptyitem={this.state.emptyitem}/>
                </div>
            </div>
        );
    }
}