import React from 'react';
import ReactDOM from 'react-dom';
import SimpleSelect from './SimpleSelect/SimpleSelect';
import {
    CommitTable,
    TableHeader,
    CommonRow,
    CommonCell,
    EditableRow,
    EditableCell
} from './DataTable/CommitTable'

import FetchList from './FetchList';
import dateformater from 'dateformater';

/*
 * props.match.params.lineId //生产线编号
 * lineId  : 必填项
 * shiftId : 必填项
 * 
 */
export default class CommitProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTypeName: '生产信息管理',
            currentDate: '', //当前日期
            currentTime: 0, //当前小时
            timeOptions: [],
            endtimeOptions: [],
            emptyItem: {
                batchNo: '',
                lineId: '',
                shiftId: '',
                planQuantity: '',
                productCode: '',
                date: '',
                beginTime: '',
                endTime: '',
                target: '',
                realQuntity: '',
                crap: '',
                rework: '',
                comment: '',
            },
            headerlist: [{
                name: 'batchNo',
                nickName: 'batchNo',
                type: "select",
                selectoptions: [],
                width: 1,
            }, {
                name: 'planQuantity',
                nickName: '计划产量',
                type: "number",
                disabled: true,
                width: 1
            }, {
                name: 'productCode',
                nickName: '产品编号',
                type: 'text',
                disabled: true,
                width: 1,
            }, {
                name: 'date',
                nickName: '日期',
                type: "date",
                width: 1,
            }, {
                name: 'beginTime',
                nickName: '开始时间',
                type: "select",
                selected: 0,
                selectoptions: [],
                width: 1,
            }, {
                name: 'endTime',
                nickName: '结束时间',
                type: "select",
                selected: 1,
                selectoptions: [],
                width: 1,
            }, {
                name: 'planQuantity',
                nickName: 'Quntity',
                type: "number",
                disabled: true,
                width: 1,
            }, {
                name: 'realQuntity',
                nickName: 'RealQuntity',
                type: "number",
                width: 1,
            }, {
                name: 'crap',
                nickName: 'Crap',
                type: 'number',
                width: 1,
            }, {
                name: 'rework',
                nickName: 'Rework',
                type: 'number',
                width: 1,
            }, {
                name: 'comment',
                nickName: 'Comment',
                type: 'textarea',
                width: 1,
            }],

            itemlist: [],
        }
    }

    componentWillMount() {
        console.log("CommitProductInfo will mount!");
        this.init_timeOptions();
        this.init_currentDateTime();
        this.inter_refresh_line();
        this.inter_refresh_batchno();
        if (this.props.shiftId && this.props.shiftId != '') {
            this.inter_refresh_itemlist(this.props.shiftId)
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.shiftId != nextProps.shiftId &&
            nextProps.shiftId && nextProps.shiftId != '') {
            this.inter_refresh_itemlist(nextProps.shiftId);
        }
    }

    productInfo_ViewToEntity(viewItem) {
        return {
            id: viewItem.id,
            lineId: this.props.lineId,
            shiftId: viewItem.shiftId,
            batchnoId: viewItem.batchNo.key,
            starttime: viewItem.date + ' ' + viewItem.beginTime.value,
            endtime: viewItem.date + ' ' + viewItem.endTime.value,
            done: viewItem.realQuntity,
            crap: viewItem.crap,
            rework: viewItem.rework,
            comment: viewItem.comment ? viewItem.comment : '',
        }
    }

    validateItem(viewItem) {
        return !!(viewItem.shiftId && viewItem.shiftId != '' &&
            viewItem.batchNo && viewItem.batchNo.key != '' &&
            viewItem.date && viewItem.date != '' &&
            viewItem.beginTime && viewItem.beginTime != '' &&
            viewItem.endTime && viewItem.endTime != '' &&
            viewItem.realQuntity && viewItem.realQuntity != 0 &&
            viewItem.crap && viewItem.crap != 0 &&
            viewItem.rework && viewItem.rework != 0)
    }


    productInfo_EntityToView(entity) {
        let date = entity.productlog.starttime.split(' ')[0];
        let beginTimeValue = entity.productlog.starttime.split(' ')[1];
        let endTimeValue = entity.productlog.endtime.split(' ')[1];
        let beginTime;
        let endTime;
        this.state.timeOptions.map((timeItem, index) => {
            if (Object.is(timeItem.value, beginTimeValue)) {
                beginTime = timeItem;
            }
        });
        this.state.endtimeOptions.map((timeItem, index) => {
            if (Object.is(timeItem.value, endTimeValue)) {
                endTime = timeItem;
            }
        });

        return {
            id: entity.productlog.id,
            shiftId: entity.productlog.shiftId,
            batchNo: entity.batchno,
            productCode: entity.productcode.productcode,
            date: date,
            beginTime: beginTime,
            endTime: endTime,
            planQuantity: entity.productcode.target,
            realQuntity: entity.productlog.done,
            crap: entity.productlog.crap,
            rework: entity.productlog.rework,
            comment: entity.productlog.comment ? entity.productlog.comment : '',
            saved: true
        }
    }


    init_timeOptions() {
        let timeOptions = [];
        let endtimeOptions = [];
        for (let i = 0; i < 24; ++i) {
            timeOptions.push({
                key: i,
                value: i >= 10 ? i + ':00:00' : '0' + i + ':00:00',
            });
            endtimeOptions.push({
                key: i,
                value: i + 1 >= 0 ? (i + 1) + ':00:00' : '0' + (i + 1) + ':00:00',
            })

        }
        console.log(timeOptions);
        this.state.timeOptions = timeOptions;
        this.state.endtimeOptions = endtimeOptions;
        this.state.headerlist[4].selectoptions = timeOptions;
        this.state.headerlist[5].selectoptions = endtimeOptions;
    }

    init_currentDateTime() {
        let date = new Date();
        console.log(dateformater.format(date));
        let currentDate = dateformater.format(date, 'YYYY-MM-DD');
        let currentTime = dateformater.format(date, 'HH');
        this.state.currentDate = currentDate;
        this.state.currentTime = parseInt(currentTime);
        console.log("当前日期：", currentDate);
        console.log("当前时间：", currentTime);
    }


    inter_refresh_itemlist(shiftId) {
        //刷新提交信息列表
        let _fetchUrl = "/data/porductlog/list/query?shiftId=" + shiftId + "&date=" + this.state.currentDate + "&lineId=" + this.props.lineId

        new FetchList().fetchList(_fetchUrl, (datalist) => {
            if (datalist) {
                this.setState({
                    itemlist: datalist.map((item, index) => (this.productInfo_EntityToView(item)))
                })
            }
        });
    }

    inter_refresh_line() {
        if (!!this.props.lineId) {
            let _fetchUrl = "/data/line/get?id=" + this.props.lineId;
            console.log(_fetchUrl);
            fetch(_fetchUrl)
                .catch(error => {
                    console.log("get line error!", error);
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        this.state.line = data.obj;
                        this.setState({
                            line: this.state.line
                        })
                    }
                });
        }
    }

    inter_refresh_batchno() {
        if (!!this.props.lineId) {
            let _fetchUrl = "/data/batchno/options/list?lineId=" + this.props.lineId;
            console.log(_fetchUrl);
            fetch(_fetchUrl)
                .catch(error => {
                    console.log("get batchNo Options error!", error);
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        this.state.headerlist[0].selectoptions = data.obj;
                        this.setState({
                            headerlist: this.state.headerlist
                        })
                    }
                });
        }
    }



    onAdd() {
        let tempItemList = [].concat(this.state.itemlist);
        this.init_currentDateTime();
        let tempItem = Object.assign(this.state.emptyItem, {
            lineId: this.props.lineId,
            batchNo: {
                key: '',
                value: ''
            },
            shiftId: this.props.shiftId,
            date: this.state.currentDate,
            beginTime: this.state.timeOptions[this.state.currentTime],
            endTime: this.state.endtimeOptions[(this.state.currentTime)],
            saved: false,
        })
        tempItemList.push(tempItem);
        console.log(tempItemList);
        this.setState({
            itemlist: tempItemList
        });
    };

    onChange(index) {
        let tempItemList = [].concat(this.state.itemlist);
        tempItemList[index].saved = false;
        this.setState({
            itemlist: tempItemList
        })
    }

    onRemove(index) {
        if (this.state.itemlist[index].id && !Object.is(this.state.itemlist[index].id, '')) {
            let id = this.state.itemlist[index].id;
            let _fetchUrl = '/data/porductlog/del?id=' + id;
            fetch(_fetchUrl)
                .catch(error => {
                    console.log("del productlog error!", error);
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        let tempItemList = [].concat(this.state.itemlist);
                        tempItemList.splice(index, 1);
                        this.setState({
                            itemlist: tempItemList
                        })
                    }
                });
        }
    }

    onRefresh(index) {
        if (this.state.itemlist[index].id && !Object.is(this.state.itemlist[index].id, '')) {
            let id = this.state.itemlist[index].id;
            let _fetchUrl = '/data/productlog/get?id=' + id;
            fetch(_fetchUrl)
                .catch(error => {
                    console.log("get productlog error!", error);
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        let tempItem = this.productInfo_EntityToView(data.obj);
                        tempItem.saved = true;
                        let tempItemList = [].concat(this.state.itemlist);
                        tempItemList[index] = tempItem;
                        this.setState({
                            itemlist: tempItemList
                        });
                    }
                });
        }

    }

    onCancel(index) {
        if (this.state.itemlist[index].id && !Object.is(this.state.itemlist[index].id, '')) {
            let tempItemList = [].concat(this.state.itemlist);

        } else {
            let tempItemList = [].concat(this.state.itemlist);
            tempItemList.splice(index, 1);
            this.setState({
                itemlist: tempItemList
            })
        }
    }

    onSave(index, item) {
        console.log("onSave", index, item);
        let entity = this.productInfo_ViewToEntity(item);
        let _fetchUrl = "/data/porductlog/save";
        item.lineId = this.props.lineId;
        fetch(_fetchUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entity)
            })
            .catch(error => {
                console.log("save productInfo error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let tempItem = this.productInfo_EntityToView(data.obj);
                    tempItem.saved = true;
                    let tempItemList = [].concat(this.state.itemlist);
                    tempItemList[index] = tempItem;
                    this.setState({
                        itemlist: tempItemList
                    });
                }
            });


        console.log("entity:", entity);
    }

    onItemChange(index, columIndex, value) {
        console.log("item value:" + value);
        let tempItem = Object.assign({}, this.state.itemlist[index]);
        let key = this.state.headerlist[columIndex].name;
        tempItem[key] = value;
        let tempItemList = [].concat(this.state.itemlist);
        tempItemList[index] = tempItem;
        this.setState({
            itemlist: tempItemList
        });
    }
    onSelectItemChange(index, columIndex, value) {
        let tempItem = Object.assign({}, this.state.itemlist[index]);
        let key = this.state.headerlist[columIndex].name;
        let itemValue;
        let selectoptions = this.state.headerlist[columIndex].selectoptions;
        selectoptions.map((keyvalue, index) => {
            if (Object.is(keyvalue.key.toString(), value.toString())) {
                itemValue = keyvalue;
            }
        });
        tempItem[key] = itemValue;
        let tempItemList = [].concat(this.state.itemlist);
        tempItemList[index] = tempItem;
        this.setState({
            itemlist: tempItemList
        });
        if (Object.is(key, 'batchNo')) {
            let _fetchUrl = '/data/batchno/getwithpcode?id=' + value;
            fetch(_fetchUrl)
                .catch(error => {
                    console.log("get batchNo error!", error);
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        tempItem['planQuantity'] = data.obj.productcode.target;
                        tempItem['productCode'] = data.obj.productcode.productcode;
                        tempItem['target'] = data.obj.batchno.target;
                        let itemlist = [].concat(this.state.itemlist);
                        itemlist.splice(index, 1, tempItem);
                        this.setState({
                            itemlist: itemlist
                        });
                    }
                });
        }
    }


    render() {
        return (
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4>生产信息</h4>
                </div>
                <div class="panel-body">
                    <CommitTable headerlist={this.state.headerlist} 
                        itemlist={this.state.itemlist}
                        onAdd={this.onAdd.bind(this)} 
                        onChange={this.onChange.bind(this)}
                        onRemove={this.onRemove.bind(this)}
                        onCancel={this.onCancel.bind(this)}
                        onSave={this.onSave.bind(this)}
                        onItemChange = {(index,columIndex, value) => this.onItemChange(index, columIndex, value)}
                        onSelectItemChange = {(index, columIndex, value) => this.onSelectItemChange(index, columIndex, value)}
                        validateItem = {this.validateItem}
                        />
                </div>
            </div>
        );
    }
}