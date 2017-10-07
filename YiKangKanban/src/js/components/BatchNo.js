import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';


export default class BatchNo extends React.Component {
    constructor(props) {
        super(props);
        this.stateOptions = [{
                    key: 0,
                    value: '新建',
                },{
                    key: 1,
                    value: '生产中',
                },{
                    key: 2,
                    value: '完成',
                },];

        this.state = {
            dataTypeName: '批次号管理',
            headerlist: [{
                name: 'workshop',
                nickName: '生产车间',
                type: "select",
                width: 2,
                selectoptions: [],
            }, {
                name: 'productfamily',
                nickName: '产品家族',
                type: 'select',
                selectoptions: [],
                width: 2,

            }, {
                name: 'productcode',
                nickName: '产品型号',
                type: 'select',
                selectoptions: [],
                width: 1,
            }, {
                name: 'batchno',
                nickName: '批次号',
                type: 'text',
                width: 1,
            }, {
                name: 'target',
                nickName: '批次数量',
                type: 'text',
                width: 1,
            },{
                name: 'state',
                nickName: '状态',
                type: 'select',
                selectoptions: this.stateOptions,                
                width: 1,
            },
            {
                name: 'comment',
                nickName: '备注',
                type: 'textarea',
                width: 2,
            }],
            itemlist: [],
            emptyitem: {
                workshop: '',
                productfamily: '',
                productcode: '',
                batchno: '',
                state: '0',
                target: '',
                comment: ''
            },
        }
    }

    componentWillMount() {
        console.log("BatchNo will mount!");
    };


    viewToEntity(viewItem) {
        return {
            id: viewItem.id,
            name: viewItem.batchno,
            productcodeId: viewItem.productcode.key,
            target: viewItem.target,
            state: viewItem.state,
            comment: viewItem.comment,
        };
    }

    entityToView(entity) {
        let state = null;
        for(let i in this.stateOptions){
            if(this.stateOptions[i].key == entity.state){
                state = this.stateOptions[i];
            }
        }

        return {
            id: entity.id,
            workshop: entity.workshop,
            productfamily: entity.productfamily,
            productcode: entity.productcode,
            batchno: entity.name,
            target: entity.target,
            state: state,
            comment: entity.comment,
        }
    }

    onChange(item){
        let id = item.id;
        this.props.history.push('/backward/mbatchno/'+id);
    }
    onAdd(){
        this.props.history.push('/backward/mbatchno/0');
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
                            viewToEntity = {this.viewToEntity.bind(this)}
                            entityToView = {this.entityToView.bind(this)}
                            fetchURL ={"/data/batchno/"}
                            onChange={this.onChange.bind(this)}
                            onAdd={this.onAdd.bind(this)}/>
                </div>
            </div>
        );
    }
}