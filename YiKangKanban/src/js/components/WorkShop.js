import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';

export default class WorkShop extends React.Component {
  constructor() {
    super();
    this.state = {
      dataTypeName: '生产车间管理',
      headerlist: [{
        name: 'name',
        nickName: '生产车间名称',
        type: "text",
        addAttr: {
          required: true,
          "data-required-error": "需要填写生产车间名称"
        },
        width: 3
      }, {
        name: 'comment',
        nickName: '生产车间备注',
        type: 'textarea',
        width: 7
      }],
      itemlist: [{
        name: '生产车间1',
        comment: '生产车间1备注'
      }, {
        name: '生产车间2',
        comment: '生产车间2备注'
      }, {
        name: '生产车间3',
        comment: '生产车间3备注'
      }],
      emptyitem: {
        name: '',
        comment: ''
      }
    }
  }
    onChange(item){
        let id = item.id;
        this.props.history.push('/backward/mworkshop/'+id);
    }
    onAdd(){
        this.props.history.push('/backward/mworkshop/0');
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
                      fetchURL={"/data/workshop"}
                      onChange={this.onChange.bind(this)}
                      onAdd={this.onAdd.bind(this)}/>
        </div>
      </div>
    );
  }
}