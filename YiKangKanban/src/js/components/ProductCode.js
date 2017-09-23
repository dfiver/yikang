import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';
import FetchList from './FetchList';


export default class ProductCode extends React.Component {
    constructor() {
        super();
        this.state = {
            dataTypeName: '产品型号管理',
            headerlist: [{
                name: 'workshopname',
                nickName: '生产车间',
                type: "select",
                width: 2,
                selectoptions: [{
                    key: '1',
                    value: '生产车间1',
                }, {
                    key: '2',
                    value: '生产车间2',
                }, {
                    key: '3',
                    value: '生产车间3',
                }]
            }, {
                name: 'familyname',
                nickName: '产品家族',
                type: 'select',
                selectoptions: [{
                    key: '1',
                    value: '产品家族1',
                }, {
                    key: '2',
                    value: '产品家族2',
                }, {
                    key: '3',
                    value: '产品家族3',
                }],
                width: 2
            }, {
                name: 'productcode',
                nickName: '产品型号名称',
                type: 'text',
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写产品型号名称"
                },
                width: 2
            }, {
                name: 'target',
                nickName: 'target',
                type: 'text',
                addAttr: {
                    required: true,
                    pattern: "^[1-9][0-9]*$",
                    "data-required-error": "需要填写小时产量",
                    "data-pattern-error": "请输入数字"
                },
                width: 1
            }, {
                name: 'EU',
                nickName: 'EU',
                type: 'text',
                width: 1
            }, {
                name: 'comment',
                nickName: '生产线备注',
                type: 'textarea',
                width: 2
            }],
            itemlist: [{
                workshopname: {
                    key: '1',
                    value: '生产车间1'
                },
                familyname: {
                    key: '1',
                    value: '生产家族1'
                },
                productcode: '产品型号1',
                EU: 'EU1',
                target: '200',
                comment: '产品型号1备注'
            }, {
                workshopname: {
                    key: '2',
                    value: '生产车间2'
                },
                familyname: {
                    key: 2,
                    value: '生产家族2'
                },
                productcode: '产品型号2',
                EU: 'EU2',
                target: '300',
                comment: '产品型号2备注'
            }, {
                workshopname: {
                    key: '3',
                    value: '生产车间3'
                },
                familyname: {
                    key: 3,
                    value: '生产家族3'
                },
                productcode: '产品型号3',
                EU: 'EU3',
                target: '400',
                comment: '产品型号3备注'
            }],
            emptyitem: {
                workshopname: '',
                familyname: '',
                productcode: '',
                EU: '',
                target: '',
                comment: ''
            }
        }
    }

    //生产线变化
    componentWillMount() {
        console.log("ProductCode will mount!");
        //更新生产车间选项
        (new FetchList()).fetchList("/data/workshop/options", (datalist => {
            console.log("workshop options:", datalist);
            let headerItem = Object.assign({}, this.state.headerlist[0], {
                selectoptions: datalist
            });
            let newHeaderlist = [].concat(this.state.headerlist);
            newHeaderlist.splice(0, 1, headerItem);
            this.setState({
                headerlist: newHeaderlist,
                emptyitem: Object.assign({}, this.state.emptyitem, {
                    workshopname: datalist.length ? datalist[0] : null
                })
            });
        }));

        //更新生产家族选项
        (new FetchList()).fetchList("/data/productfamily/options", (datalist => {
            console.log("family options:", datalist);
            let headerItem = Object.assign({}, this.state.headerlist[1], {
                selectoptions: datalist
            });
            let newHeaderlist = [].concat(this.state.headerlist);
            newHeaderlist.splice(1, 1, headerItem);
            this.setState({
                headerlist: newHeaderlist,
                emptyitem: Object.assign({}, this.state.emptyitem, {
                    familyname: datalist.length ? datalist[0] : null
                })
            });
        }));
    };

    viewToEntity(viewItem) {
        return {
            id: viewItem.id,
            workshopId: viewItem.workshopname.key,
            productfamilyId: viewItem.familyname.key,
            productcode: viewItem.productcode,
            eu: viewItem.EU,
            target: viewItem.target,
            comment: viewItem.comment,
        }
    }

    entityToView(entity) {
        return {
            id: entity.id,
            workshopname: entity.workshop,
            familyname: entity.productfamily,
            productcode: entity.productcode,
            EU: entity.eu,
            target: entity.target,
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
                              emptyitem={this.state.emptyitem}
                              viewToEntity = {this.viewToEntity}
                              entityToView = {this.entityToView}
                              fetchURL ={"/data/productcode"}/>                              
                </div>
            </div>
        );
    }
}