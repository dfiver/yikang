import React from 'react';
import ReactDOM from 'react-dom';
import SimpleSelect from './SimpleSelect/SimpleSelect';
import BaseEditableDataTable from './BaseEditableDataTable';

export default class CommitProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTypeName: '生产信息管理',
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
            lineSelection: {
                name: 'line',
                nickName: "生产线",
                type: "select",
                disabled: true,
                selectoptions: []
            },
            batchnoSelection: {
                name: 'workshop',
                nickName: "批次号",
                type: "select",
                disabled: true,
                selectoptions: []
            },

            curProductCode: {
                workshop: null,
                productfamily: null,
                productcode: null,
            },
            emptyCommitInfo: {
                id: null,
                line: null,
                batchno: null,
                startTime: null,
                endTime: null,
                done: 0,
                crap: 0,
                rework: 0
            },
            headerlist: [{
                name: 'date',
                nickName: '日期',
                type: "date",
                width: 2,
                edit_width: 4,
                break: false
            }, {
                name: 'beginHour',
                nickName: '开始时间',
                type: "select",
                selected: 0,
                selectoptions: [],
                width: 1,
                edit_width: 4,
                break: false
            }, {
                name: 'beginHour',
                nickName: '结束时间',
                type: "select",
                selected: 1,
                selectoptions: [],
                width: 1,
                edit_width: 4,
                break: true
            }, {
                name: 'productCode',
                nickName: 'productCode',
                type: "select",
                selectoptions: [{
                    key: '2001',
                    value: '2001'
                }, {
                    key: '2002',
                    value: '2002'
                }, {
                    key: '2003',
                    value: '2003'
                }, {
                    key: '2004',
                    value: '2004'
                }],
                width: 1,
                edit_width: 6,
                break: false
            }, {
                name: 'batchNo',
                nickName: 'batchNo',
                type: "select",
                selectoptions: [{
                    key: '200101',
                    value: '200101'
                }, {
                    key: '200201',
                    value: '200201'
                }, {
                    key: '200102',
                    value: '200102'
                }, {
                    key: '200103',
                    value: '200103'
                }],
                width: 1,
                edit_width: 6,
                break: true
            }, {
                name: 'target',
                nickName: 'target',
                type: "text",
                addAttr: {
                    editable: false
                },
                width: 1,
                edit_width: 3,
                break: false
            }, {
                name: 'done',
                nickName: 'done',
                type: "text",
                width: 1,
                edit_width: 3,
                break: false
            }, {
                name: 'crap',
                nickName: 'crap',
                type: 'text',
                width: 1,
                edit_width: 3,
                break: false
            }, {
                name: 'rework',
                nickName: 'rework',
                type: 'text',
                width: 1,
                edit_width: 3,
                break: true
            }],
            itemlist: [{
                date: '2017-07-25',
                beginHour: {
                    key: '05:00',
                    value: '05:00'
                },
                endHour: {
                    key: '06:00',
                    value: '06:00'
                },
                productCode: {
                    key: '2001',
                    value: '2001'
                },
                batchNo: {
                    key: '200101',
                    value: '200101'
                },
                target: 100,
                done: 103,
                crap: 5,
                rework: 2
            }, {
                date: '2017-07-25',
                beginHour: {
                    key: '05:00',
                    value: '05:00'
                },
                endHour: {
                    key: '06:00',
                    value: '06:00'
                },
                productCode: {
                    key: '2001',
                    value: '2001'
                },
                batchNo: {
                    key: '200101',
                    value: '200101'
                },
                target: 100,
                done: 103,
                crap: 5,
                rework: 2
            }],
            emptyitem: {
                date: '2017-09-13',
                beginHour: {
                    key: '05:00',
                    value: '05:00'
                },
                endHour: {
                    key: '06:00',
                    value: '06:00'
                },
                productCode: {
                    key: '2001',
                    value: '2001'
                },
                batchNo: {
                    key: '200101',
                    value: '200101'
                },
                target: 100,
                done: 0,
                crap: 0,
                rework: 0
            }
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

    inter_refresh_line() {
        let _fetchUrl = "/data/line/options?workshopId=" + this.state.curProductCode.workshop;
        console.log(_fetchUrl);
        fetch(_fetchUrl)
            .catch(error => {
                console.log("get line error!", error);
            })
            .then(res => res.json())
            .then(data => {
                console.log("options:", data);
                if (data.success) {
                    this.state.lineSelection = data.obj;
                    this.setState({
                        lineSelection: this.state.lineSelection
                    })
                }
            });
    }

    inter_refresh_batchno() {

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
                        this.state.batchnoSelection.disabled = true;
                    } else {
                        tempproductCodeList[0].disabled = false;
                        tempproductCodeList[1].disabled = false;
                        this.state.batchnoSelection.disabled = true;
                        this.inter_refresh_batchno()
                    }
                    this.setState({
                        curProductCode: productCode,
                        productCodeList: tempproductCodeList,
                        headerlist: tempheaderlist,
                        lineSelection: this.state.lineSelection,
                        batchnoSelection: this.state.batchnoSelection
                    });

                }
            })
    }

    onProductSelectChange(index, value) {
        console.log("productCode选择", index, value);
        this.state.curProductCode[this.state.productCodeList[index].name] = {
            key: value
        };
        this.setState({
            curProductCode: this.state.curProductCode
        });
        this.inter_refresh_productCode(this.state.curProductCode);

        //如果选择了生产车间，则可以选择生产线了
        if (index == 0 && value != '') {
            this.state.lineSelection.disabled = false;
            this.inter_refresh_line();
        } else {
            this.state.lineSelection.disabled = true;
            this.lineSelection.selectoptions = [];
        }
        this.setState({
            lineSelection: this.state.lineSelection
        })
    }

    onLineSelectChange(value) {
        console.log("line选择", index, value);
        this.state.emptyCommitInfo.line = {
            key: value,
            value: null
        }
        this.setstate({
            emptyCommitInfo: emptyCommitInfo
        })
    }

    onBatchSelectChange(value) {
        console.log("批次号选择", index, value);
        this.state.emptyCommitInfo.batchno = {
            key: value,
            value: null
        }
        this.setstate({
            emptyCommitInfo: emptyCommitInfo
        })
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
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h4>基本信息设定</h4>
                            </div>
                            <div class="panel-body">
                                <form class="form-horizontal">
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
                                    <div class="form-group">
                                        <label class="control-label">{this.state.lineSelection.nickName+':'}</label>
                                        <select 
                                            name="workshop"
                                            class="form-control" 
                                            value={this.state.emptyCommitInfo.line?this.state.emptyCommitInfo.line.key:""}
                                            onChange={(event)=>this.onLineSelectChange(index, event.target.value)} 
                                            disabled={this.state.lineSelection.disabled}
                                            >                                        
                                            <option key="" value=""></option>
                                            {
                                                this.state.lineSelection.selectoptions?this.state.lineSelection.selectoptions.map((option, index)=>(
                                                <option key={index} value={option.key}>{option.value}</option>
                                                )):null
                                            }
                                          </select>
                                        <label class="control-label">{this.state.batchnoSelection.nickName+':'}</label>
                                        <select 
                                            name="workshop"
                                            class="form-control" 
                                            value={this.state.emptyCommitInfo.batchno?this.state.emptyCommitInfo.batchno.key:""}
                                            onChange={(event)=>this.onBatchSelectChange(index, event.target.value)} 
                                            disabled={this.state.batchnoSelection.disabled}
                                            >                                        
                                            <option key="" value=""></option>
                                            {
                                                this.state.batchnoSelection.batchnoSelection?this.state.batchnoSelection.map((option, index)=>(
                                                <option key={index} value={option.key}>{option.value}</option>
                                                )):null
                                            }
                                          </select>
                                    </div>
                                </form>
                            </div>
                        </div>     
                </div>

                <div class="row" style={{marginTop:"50px"}}>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h4>生产信息录入</h4>
                        </div>
                        <div class="panel-body">
                            <BaseEditableDataTable dataTypeName={this.state.dataTypeName}
                                  headerlist={this.state.headerlist}
                                  itemlist={this.state.itemlist}
                                  emptyitem={this.state.emptyitem}
                                  editRelayout={true}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}