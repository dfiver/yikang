import React from 'react';
import ReactDOM from 'react-dom';
import BaseSimpleDataTable from './BaseSimpleDataTable';
import FetchList from './FetchList';


export default class Operator extends React.Component {
    constructor() {
        super();
        this.state = {
            dataTypeName: '操作员管理',
            headerlist: [{
                name: 'avatar',
                nickName: '照片',
                type: 'image',
                imageHeight: '60px',
                imageWidth: '60px',
                width: 2,
                searchable: false,
            }, {
                name: 'name',
                nickName: '姓名',
                type: 'text',
                width: 1,
                searchable: true,
            }, {
                name: 'shift',
                nickName: '班次',
                type: 'select',
                selectoptions: [],
                width: 2,
                searchable: true,
            }, {
                name: 'comment',
                nickName: '备注',
                type: 'text',
                width: 3,
                searchable: true,
            }],
            itemlist: [{
                avatar: '/images/20170802020028.jpg',
                name: '操作员A',
                shift: 'A',
                comment: '操作员A备注'
            }, {
                avatar: '/images/20170802020028.jpg',
                name: '操作员A',
                shift: 'B',
                comment: '操作员A备注',
            }, {
                avatar: '/images/20170802020028.jpg',
                name: '操作员A',
                shift: 'C',
                comment: '操作员A备注',
            }],
        };

        this.condition = {
            name: "",
            shift: 0,
            comment: ""
        };
        this.queryState = false;
    }

    entityToView(entity) {
        return {
            id: entity.id,
            name: entity.name,
            avatar: entity.avatar,
            comment: entity.comment,
            shift: entity.shift,
        }
    }

    componentWillMount() {
        //刷新班次列表
        new FetchList().fetchList("/data/shift/options", (datalist) => {
            let tempheaderlist = [].concat(this.state.headerlist);
            tempheaderlist[2].selectoptions = datalist;
            this.setState({
                headerlist: tempheaderlist
            });
        });

        //刷新操作员列表
        this.inter_refreshItems();
    }

    getStrFromCondtion(condition) {
        return "name=" + condition.name + "&shift=" + condition.shift + "&comment=" + condition.comment;
    }

    inter_refreshItems() {
        new FetchList().fetchList("/data/operator/querylist?" + this.getStrFromCondtion(this.condition),
            ((datalist) => {
                this.setState({
                    itemlist: datalist.map((item, index) => this.entityToView(item))
                });
            }));
    }


    onChange(index) {
        console.log("点击" + index + "的修改按钮");
        let id = this.state.itemlist[index].id;
        this.props.history.push('/backward/operatordetail/'+id);
    }
    onAdd() {
        console.log("点击新增按钮");
        this.props.history.push('/backward/operatordetail/0');
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
                    <BaseSimpleDataTable dataTypeName={this.state.dataTypeName}
                      headerlist={this.state.headerlist}
                      itemlist={this.state.itemlist}
                      onChange={this.onChange.bind(this)}
                      onAdd={this.onAdd.bind(this)}/>
                </div>
            </div>
        );
    }
}