import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';


export default class BatchNo extends React.Component {
    constructor() {
        super();
        this.state = {
            dataTypeName: '批次号管理',
            productCodeList: [{
                name: 'workshop',
                nickName: "生产车间",
                type: "select",
                disabled: true,
                selectoptions: []
            }, {
                name: 'productfamily',
                nickName: "产品家族",
                type: "select",
                disabled: true,
                selectoptions: []
            }, {
                name: 'productcode',
                nickName: "产品型号",
                type: "select",
                disabled: false,
                selectoptions: []
            }],

            headerlist: [{
                name: 'workshop',
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
                }],
                uneditable: true,
                edit_width: 3,
                break: false,
            }, {
                name: 'productfamily',
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
                width: 2,
                uneditable: true,
                edit_width: 3,
                break: false,

            }, {
                name: 'productcode',
                nickName: '产品型号',
                type: 'select',
                selectoptions: [{
                    key: '1',
                    value: '产品型号1',
                }, {
                    key: '2',
                    value: '产品型号2',
                }, {
                    key: '3',
                    value: '产品型号3',
                }],
                width: 2,
                edit_width: 4,
                break: true,
            }, {
                name: 'batchno',
                nickName: '批次号',
                type: 'text',
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写批次号"
                },
                width: 2,
                edit_width: 3,
                break: false,
            }, {
                name: 'target',
                nickName: '批次数量',
                type: 'text',
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写批次数量"
                },
                width: 1,
                edit_width: 3,
                break: false,
            }, {
                name: 'comment',
                nickName: '备注',
                type: 'textarea',
                width: 1,
                edit_width: 4,
                break: true
            }],
            itemlist: [{
                workshop: {
                    key: '1',
                    value: '生产车间1'
                },
                productfamily: {
                    key: '1',
                    value: '产品家族1'
                },
                productcode: {
                    key: '1',
                    value: '产品型号1'
                },
                batchno: '0001',
                target: 1000,
                comment: '批次1备注'
            }, {
                workshop: {
                    key: '2',
                    value: '生产车间2'
                },
                productfamily: {
                    key: 2,
                    value: '产品家族2'
                },
                productcode: {
                    key: '1',
                    value: '产品型号1'
                },
                batchno: '0002',
                target: 2000,
                comment: '批次2备注'
            }, {
                workshop: {
                    key: '3',
                    value: '生产车间3'
                },
                productfamily: {
                    key: 3,
                    value: '产品家族3'
                },
                productcode: {
                    key: '1',
                    value: '产品型号1'
                },
                batchno: '0003',
                target: 3000,
                comment: '批次3备注'
            }],
            emptyitem: {
                workshop: '',
                productfamily: '',
                productcode: '',
                batchno: '',
                target: '',
                comment: ''
            },
            curProductCode: {
                workshop: null,
                productfamily: null,
                productcode: null,
            },
            currentBatchState: 0
        }
    }

    componentWillMount() {
        console.log("BatchNo will mount!");
        this.inter_refresh_productCode();
    };

    getProductCodeURL(productCode) {
        let workshopId = (productCode.workshop && productCode.workshop.key) ? productCode.workshop.key : "";
        let productfamilyId = (productCode.productfamily && productCode.productfamily.key) ? productCode.productfamily.key : "";
        let productcodeId = (productCode.productcode && productCode.productcode.key) ? productCode.productcode.key : "";
        //let productcodeId = "";
        let rlt = "workshopId=" + workshopId + "&productfamilyId=" + productfamilyId + "&productcodeId=" + productcodeId;
        console.log("fetchUrl", rlt);
        return rlt;
    }

    getProductCodeRestURL(productCode) {
        let workshopId = (productCode.workshop && productCode.workshop.key) ? productCode.workshop.key : "0";
        let productfamilyId = (productCode.productfamily && productCode.productfamily.key) ? productCode.productfamily.key : "0";
        let rlt = "workshop/" + workshopId + "/productfamily/" + productfamilyId;
        console.log("fetchRestURL", rlt);
        return rlt;
    }

    inter_refresh_productCode(productCode) {
        let _fetchUrl = "/data/productcode/list/options?" + this.getProductCodeURL(productCode || this.state.curProductCode);
        console.log(_fetchUrl);
        fetch(_fetchUrl)
            .catch(error => {
                console.log("get productcode error!", error);
            })
            .then(res => res.json())
            .then(data => {
                console.log("options:", data);
                if (data.success) {
                    let tempproductCodeList = [].concat(this.state.productCodeList);
                    let tempheaderlist = [].concat(this.state.headerlist);
                    tempproductCodeList[0].selectoptions = data.obj.workshop;
                    tempproductCodeList[1].selectoptions = data.obj.productfamily;
                    tempproductCodeList[2].selectoptions = data.obj.productcode;
                    tempheaderlist[0].selectoptions = data.obj.workshop;
                    tempheaderlist[1].selectoptions = data.obj.productfamily;
                    tempheaderlist[2].selectoptions = data.obj.productcode;


                    //选中产品型号后，新建批次号才可行
                    let productCode = Object.assign({}, this.state.curProductCode);
                    let emptyitem = Object.assign({}, this.state.emptyitem);
                    if (productCode.productcode && productCode.productcode.key) {
                        productCode.workshop = data.obj.workshop[0];
                        productCode.productfamily = data.obj.productfamily[0];
                        tempproductCodeList[0].disabled = true;
                        tempproductCodeList[1].disabled = true;
                        emptyitem.workshop = data.obj.workshop[0];
                        emptyitem.productfamily = data.obj.productfamily[0];
                        emptyitem.productcode = data.obj.productcode[0];
                    } else {
                        tempproductCodeList[0].disabled = false;
                        tempproductCodeList[1].disabled = false;
                    }
                    this.setState({
                        curProductCode: productCode,
                        productCodeList: tempproductCodeList,
                        headerlist: tempheaderlist,
                    });
                }
            })
    }

    onProductSelectChange(index, value) {
        console.log("productCode选择", index, value);
        let productCode = Object.assign({}, this.state.curProductCode);
        productCode[this.state.productCodeList[index].name] = {
            key: value
        };
        this.setState({
            curProductCode: productCode
        });
        this.inter_refresh_productCode(productCode);
    }

    // workshop: '',
    // productfamily: '',
    // productcode: '',
    // batchno: '',
    // target: '',
    // comment: ''
    viewToEntity(viewItem) {
        return {
            id: viewItem.id,
            name: viewItem.batchno,
            productcodeId: viewItem.productcode.key,
            target: viewItem.target,
            comment: viewItem.comment,
        };
    }

    entityToView(entity) {
        return {
            workshop: entity.workshop,
            productfamily: entity.productfamily,
            productcode: entity.productcode,
            batchno: entity.name,
            target: entity.target,
            comment: entity.comment,
        }
    }

    render() {

        let fetchURL = "";
        if (this.state.curProductCode.productcode && this.state.curProductCode.productcode.key) {
            fetchURL = "/data/batchno/" + this.state.currentBatchState + '/' + this.getProductCodeRestURL(this.state.curProductCode) + "/productcode/" + this.state.curProductCode.productcode.key
        } else {
            fetchURL = "/data/batchno/" + this.state.currentBatchState + '/' + this.getProductCodeRestURL(this.state.curProductCode);
        }

        let unaddable = !(this.state.curProductCode.productcode && this.state.curProductCode.productcode.key);

        let disaddable = (this.state.currentBatchState == '1') ||
            (this.state.currentBatchState == '2');

        let diseditable = (this.state.currentBatchState == '1') ||
            (this.state.currentBatchState == '2');

        let disdelable = (this.state.currentBatchState == '1') ||
            (this.state.currentBatchState == '2');

        return (
            <div class="container">
                <div class="row">
                    <div class="page-header">
                        <h1>{this.state.dataTypeName}</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h5>产品型号选择</h5>
                        </div>
                        <div class="panel-body">
                            {this.state.productCodeList.map((selectItem, index)=>(
                            <div key={index} class="col-xs-4">
                                <div class="form-group">
                                  <label class="control-label">{selectItem.nickName+':'}</label>
                                    <select 
                                        name="workshop"
                                        class="form-control" 
                                        value={this.state.curProductCode[selectItem.name]?this.state.curProductCode[selectItem.name].key:""}
                                        onChange={(event)=>this.onProductSelectChange(index, event.target.value)} 
                                        disabled={selectItem.disabled}
                                        >                                        
                                        <option key="" value=""></option>
                                        {
                                            selectItem.selectoptions?selectItem.selectoptions.map((option, index)=>(
                                            <option key={index} value={option.key}>{option.value}</option>
                                            )):null
                                        }
                                      </select>
                                </div>
                            </div>                                
                            ))}
                        </div>
                    </div>
                </div>                

                <div class="row">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4 class="col-xs-4">批次号管理</h4>
                            <form class="form-horizontal">
                                <div class="form-group">
                                    <label class="col-xs-2 col-xs-offset-2 control-label" for="bn_state">批次号状态</label>
                                    <div class="col-xs-3">
                                        <select class="form-control" id="bn_state" 
                                        value={this.state.currentBatchState}
                                        onChange={(event)=>this.setState({currentBatchState: event.target.value})}>
                                            <option value="0">新建</option>
                                            <option value="1">生产中</option>
                                            <option value="2">已完成</option>                                            
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="panel-body">
                            <BaseEditableDataTable dataTypeName={this.state.dataTypeName}
                                  headerlist={this.state.headerlist}
                                  emptyitem={this.state.emptyitem}
                                  viewToEntity = {this.viewToEntity}
                                  entityToView = {this.entityToView}
                                  fetchURL ={fetchURL}
                                  refreshHandler = {this.onReciveRefreshHandler}
                                  unaddable = {unaddable}
                                  unaddableMessage = {"请先选定产品型号"}
                                  disaddable = {disaddable}
                                  diseditable = {diseditable}
                                  disdelable = {disdelable}
                                  editRelayout={true}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}