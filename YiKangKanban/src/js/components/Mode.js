import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';


export default class Mode extends React.Component {
  constructor() {
    super();
    this.state = {
      dataTypeName: '停机原因类别管理',
      headerlist: [{
        name: 'name',
        nickName: '停机原因类别',
        type: "text",
        addAttr: {
          required: true,
          "data-required-error": "需要填写停机原因类别"
        },
        width: 3
      }, {
        name: 'comment',
        nickName: '停机原因类别备注',
        type: 'textarea',
        width: 7
      }],
      itemlist: [],
      emptyitem: {
        name: '',
        comment: ''
      }
    }
  }

  componentWillMount() {
    console.log("BaseEditableDataTable will mount!");
  };

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
                      fetchURL={"/data/mode"}/>
        </div>
      </div>
    );
  }
}