import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';


export default class ProductFamily extends React.Component {
  constructor() {
    super();
    this.state = {
      dataTypeName: '产品家族管理',
      headerlist: [{
        name: 'name',
        nickName: '产品家族名称',
        type: "text",
        width: 3
      }, {
        name: 'comment',
        nickName: '产品家族备注',
        type: 'textarea',
        width: 7
      }],
      itemlist: [{
        name: '产品家族1',
        comment: '产品家族1备注'
      }, {
        name: '产品家族2',
        comment: '产品家族2备注'
      }, {
        name: '产品家族3',
        comment: '产品家族3备注'
      }],
      emptyitem: {
        name: '',
        comment: ''
      }
    }
  }

  componentWillMount() {
    console.log("ProductFamily will mount!");
  };
    onChange(item){
        let id = item.id;
        this.props.history.push('/backward/mproductfamily/'+id);
    }
    onAdd(){
        this.props.history.push('/backward/mproductfamily/0');
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
                      fetchURL="/data/productfamily/"
                      onChange={this.onChange.bind(this)}
                      onAdd={this.onAdd.bind(this)}/>
        </div>
      </div>
    );
  }
}