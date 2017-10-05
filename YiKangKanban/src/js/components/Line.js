import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';
import FetchList from './FetchList';


export default class Line extends React.Component {
    constructor() {
        super();
        this.state = {
            dataTypeName: '生产线管理',
            headerlist: [{
                name: 'linename',
                nickName: '生产线名称',
                type: 'text',
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写生产线名称"
                },
                width: 2
            }, {
                name: 'workshopname',
                nickName: '生产车间名称',
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
                name: 'count',
                nickName: '工位数',
                type: 'text',
                virtual: true,
                width: 2
            }, {
                name: 'comment',
                nickName: '生产线备注',
                type: 'textarea',
                width: 4
            }],
            itemlist: [{
                workshopname: {
                    key: '1',
                    value: '生产车间1'
                },
                linename: '生产线1',
                comment: '生产线1备注'
            }, {
                workshopname: {
                    key: '2',
                    value: '生产车间2'
                },
                linename: '生产线2',
                comment: '生产线2备注'
            }, {
                workshopname: {
                    key: '3',
                    value: '生产车间3'
                },
                linename: '生产线3',
                comment: '生产线3备注'
            }],
            emptyitem: {
                workshopname: null,
                linename: null,
                comment: ''
            },

            currentLine: null,

            seatheadlist: [{
                name: 'index',
                nickName: '序号',
                type: "text",
                addAttr: {
                    required: true,
                    pattern: "^[1-9][0-9]*$",
                    "data-required-error": "需要填写序号",
                    "data-pattern-error": "请输入数字"
                },
                width: 2,
            }, {
                name: 'job',
                nickName: '岗位名称',
                type: "select",
                width: 2,
                selectoptions: [{
                    key: '1',
                    value: '岗位1',
                }, {
                    key: '2',
                    value: '岗位2',
                }, {
                    key: '3',
                    value: '岗位3',
                }]
            }, {
                name: 'name',
                nickName: '工位名称',
                type: "text",
                addAttr: {
                    required: true,
                    "data-required-error": "需要填写工位名称",
                },
                width: 2,
            }, {
                name: 'comment',
                nickName: '备注',
                type: "textarea",
                width: 4
            }],
            seatemptyitem: {
                index: null,
                job: null,
                name: null,
                comment: ''
            },
        };

        //生产线列表被选中的回调
        this.onClick = function(lineItem) {
            this.setState({
                currentLine: lineItem
            })
            if (this.seatRefresh) {
                this.seatRefresh("/data/lineseat/" + lineItem.id + "/list");
            }
        }.bind(this);

        //坐席列表返回的刷新句柄
        this.onReciveRefreshHandler = function(refreshHandler) {
            this.seatRefresh = refreshHandler;
        }.bind(this);

        this.seatRefresh = null;
    }

    componentWillMount() {
        //更新生产车间列表
        console.log("Line will mount!");
        (new FetchList()).fetchList("/data/workshop/options", (datalist => {
            console.log("workshop options:", datalist);
            let headerItem = Object.assign({}, this.state.headerlist[0], {
                selectoptions: datalist
            });
            let newHeaderlist = [].concat(this.state.headerlist);
            newHeaderlist.splice(0, 1, headerItem);
            this.setState({
                headerlist: newHeaderlist
            });
        }));
        //更新岗位列表
        console.log("Seat will mount!");
        (new FetchList()).fetchList("/data/job/options", (datalist => {
            console.log("job options:", datalist);
            let headerItem = Object.assign({}, this.state.seatheadlist[1], {
                selectoptions: datalist
            });
            let newHeaderlist = [].concat(this.state.seatheadlist);
            newHeaderlist.splice(1, 1, headerItem);
            this.setState({
                seatheadlist: newHeaderlist
            });
        }));
    }

    viewToLineEntity(viewItem) {
        return {
            id: viewItem.id,
            workshopId: viewItem.workshopname.key,
            name: viewItem.linename,
            comment: viewItem.comment,
        }
    }

    lineEntityToView(entity) {
        return {
            id: entity.id,
            workshopname: entity.workshop,
            linename: entity.name,
            comment: entity.comment,
            count: entity.count,
        }
    }



    onChange(item){
        let id = item.id;
        this.props.history.push('/backward/mline/'+id);
    }
    onAdd(){
        this.props.history.push('/backward/mline/0');
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
                                  viewToEntity = {this.viewToLineEntity}
                                  entityToView = {this.lineEntityToView}
                                  fetchURL ={"/data/line"}
                                                   onChange={this.onChange.bind(this)}
                                                   onAdd={this.onAdd.bind(this)}/>
                </div>
            </div>
        );
    }
}