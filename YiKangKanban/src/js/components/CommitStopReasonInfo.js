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
export default class CommitStopReasonInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTypeName: '停机信息采集',
            currentDate: '', //当前日期
            currentTime: '', //当前时间
            emptyViewItem: {
                lineId: '',
                siftId: '',
                stopReason: '',
                mode: {
                    key: '',
                    value: ''
                },
                reasonType: '',
                beginTime: '',
                endTime: '',
                comment: '',
            },
            headerlist: [{
                name: 'stopReason',
                nickName: '停机原因',
                type: "select",
                selectoptions: [],
                width: '200px',
            }, {
                name: 'mode',
                nickName: '原因类别',
                type: "select",
                disabled: true,
                selectoptions: [],
                width: '200px'
            }, {
                name: 'date',
                nickName: '日期',
                type: "date",
                width: '150px'
            }, {
                name: 'beginTime',
                nickName: '开始时间',
                type: "time",
                width: '100px',
            }, {
                name: 'endTime',
                nickName: '结束时间',
                type: "time",
                width: '100px',
            }, {
                name: 'comment',
                nickName: 'Comment',
                type: 'textarea',
            }],

            itemlist: [],
        }
    }

    componentWillMount() {
        console.log("CommitProductInfo will mount!");
        this.init_currentDateTime();
        this.inter_refresh_reason();
        this.inter_refresh_mode();
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

    stopreason_ViewToEntity(viewItem) {
        return {
            id: viewItem.id,
            lineId: this.props.lineId,
            shiftId: this.props.shiftId,
            reasonId: viewItem.stopReason.key,
            starttime: viewItem.date + ' ' + viewItem.beginTime,
            endtime: viewItem.date + ' ' + viewItem.endTime,
            comment: viewItem.comment ? viewItem.comment : '',
        }
    }

    validateItem(viewItem) {
        return !!(viewItem.beginTime && viewItem.beginTime != '' &&
            viewItem.endTime && viewItem.endTime != '' &&
            viewItem.stopReason && viewItem.stopReason.key && viewItem.stopReason.key != '')
    }


    stopreason_EntityToView(entity) {
        let date = entity.stopreasonlog.starttime.split(' ')[0];
        let beginTimeValue = entity.stopreasonlog.starttime.split(' ')[1];
        let endTimeValue = entity.stopreasonlog.endtime.split(' ')[1];

        return {
            id: entity.stopreasonlog.id,
            shiftId: entity.stopreasonlog.shiftId,
            date: date,
            beginTime: beginTimeValue,
            endTime: endTimeValue,
            stopReason: {
                key: entity.reason.id,
                value: entity.reason.name,
            },
            mode: {
                key: entity.mode.id,
                value: entity.mode.name,
            },
            comment: entity.comment ? entity.comment : '',
            saved: true
        }
    }

    init_currentDateTime() {
        let date = new Date();
        console.log(dateformater.format(date));
        let currentDate = dateformater.format(date, 'YYYY-MM-DD');
        let currentTime = dateformater.format(date, 'HHH:mmm');
        this.state.currentDate = currentDate;
        this.state.currentTime = currentTime;
        console.log("当前时间：", currentDate + ' ' + currentTime);
    }


    inter_refresh_itemlist(shiftId) {
        //刷新提交信息列表
        let date = new Date();
        let currentDate = dateformater.format(date, 'YYYY-MM-DD');
        let _fetchUrl = "/data/stopreasonlog/list/query?shiftId=" + this.props.shiftId + "&date=" + currentDate + "&lineId=" + this.props.lineId

        new FetchList().fetchList(_fetchUrl, (datalist) => {
            if (datalist) {
                this.setState({
                    itemlist: datalist.map((item, index) => (this.stopreason_EntityToView(item)))
                })
            }
        });
    }

    inter_refresh_reason() {
        new FetchList().fetchList('/data/reason/options', (datalist) => {
            if (datalist && datalist.length) {
                let headerlist = [].concat(this.state.headerlist);
                headerlist[0].selectoptions = datalist;
                this.setState({
                    headerlist: headerlist
                });
            }
        })
    }

    inter_refresh_mode() {
        new FetchList().fetchList('/data/mode/options', (datalist) => {
            if (datalist && datalist.length) {
                let headerlist = [].concat(this.state.headerlist);
                headerlist[1].selectoptions = datalist;
                this.setState({
                    headerlist: headerlist
                });
            }
        })
    }


    onAdd() {
        let tempItemList = [].concat(this.state.itemlist);
        this.init_currentDateTime();
        let tempItem = Object.assign(this.state.emptyViewItem, {
            date: this.state.currentDate,
            beginTime: this.state.currentTime,
            endTime: this.state.currentTime,
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
            let _fetchUrl = '/data/stopreasonlog/del?id=' + id;
            fetch(_fetchUrl)
                .catch(error => {
                    console.log("del stopreasonlog error!", error);
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
            let _fetchUrl = '/data/stopreasonlog/get?id=' + id;
            fetch(_fetchUrl)
                .catch(error => {
                    console.log("get stopreasonlog error!", error);
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        let tempItem = this.stopreason_EntityToView(data.obj);
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
        let entity = this.stopreason_ViewToEntity(item);
        let _fetchUrl = "/data/stopreasonlog/save";
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
                    let tempItem = this.stopreason_EntityToView(data.obj);
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

    onSaveAll() {
        let entityArray = [];
        this.state.itemlist.map((item, index) => {
            if (this.validateItem(item) && !item.saved) {
                let entity = this.stopreason_ViewToEntity(item);
                entity.lineId = this.props.lineId;
                entityArray.push(entity);
            }
        })
        console.log("batch save");
        let _fetchUrl = "/data/stopreasonlog/batchsave";
        fetch(_fetchUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entityArray)
            })
            .catch(error => {
                console.log("save productInfo error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    //保存成功
                }
            })
            .then(() => this.inter_refresh_itemlist(this.props.shiftId));
    }

    onItemChange(index, columIndex, value) {
        console.log("item value:" + value);
        let tempItem = Object.assign({}, this.state.itemlist[index]);
        let key = this.state.headerlist[columIndex].name;
        tempItem[key] = value;
        if (Object.is(key, 'beginTime')) {
            let beginTime = tempItem['beginTime'];
            let endTime = tempItem['endTime'];
            if (beginTime > endTime) {
                tempItem['endTime'] = beginTime;
            }
        }
        if (Object.is(key, 'endTime')) {
            let beginTime = tempItem['beginTime'];
            let endTime = tempItem['endTime'];
            if (beginTime > endTime) {
                tempItem['beginTime'] = endTime;
            }
        }
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
        if (Object.is(key, 'stopReason')) {
            let _fetchUrl = '/data/reason/get?id=' + value;
            fetch(_fetchUrl)
                .catch(error => {
                    console.log("get stopReason error!", error);
                })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        tempItem['mode'] = data.obj.mode;
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
            <div class = "container-fluid">
                <div class="row">
                    <div class="col-xs-2">
                        <h5>停机信息</h5>
                    </div>
                </div>
                <div class="row">
                    <CommitTable headerlist={this.state.headerlist} 
                        itemlist={this.state.itemlist}
                        onAdd={this.onAdd.bind(this)} 
                        onChange={this.onChange.bind(this)}
                        onRemove={this.onRemove.bind(this)}
                        onCancel={this.onCancel.bind(this)}
                        onSave={this.onSave.bind(this)}
                        onSaveAll={this.onSaveAll.bind(this)}
                        onItemChange = {(index,columIndex, value) => this.onItemChange(index, columIndex, value)}
                        onSelectItemChange = {(index, columIndex, value) => this.onSelectItemChange(index, columIndex, value)}
                        validateItem = {this.validateItem}
                        />
                </div>
            </div>
        );
    }
}