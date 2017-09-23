import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';


export default class StopReason extends React.Component {
  constructor() {
    super();
    this.state = {
      dataTypeName: '停机原因管理',
      headerlist: [{
        name: 'mode',
        nickName: '停机原因类别',
        type: "select",
        width: 3,
        selectoptions: [{
          key: '1',
          value: '类别1',
        }, {
          key: '2',
          value: '类别2',
        }, {
          key: '3',
          value: '类别3',
        }]
      }, {
        name: 'stopreason',
        nickName: '停机原因',
        type: 'text',
        addAttr: {
          required: true,
          "data-required-error": "需要填写停机原因"
        },
        width: 3
      }, {
        name: 'comment',
        nickName: '停机原因备注',
        type: 'textarea',
        width: 4
      }],
      itemlist: [{
        mode: {
          key: '1',
          value: '类别1'
        },
        stopreason: '原因1',
        comment: '停机原因1备注'
      }, {
        mode: {
          key: '2',
          value: '类别2'
        },
        stopreason: '原因2',
        comment: '停机原因2备注'
      }, {
        mode: {
          key: '3',
          value: '类别3'
        },
        stopreason: '原因3',
        comment: '停机原因3备注'
      }],
      emptyitem: {
        mode: '',
        stopreason: '',
        comment: ''
      }
    }
  }

  componentWillMount() {
    console.log("StopReason will mount!");
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
                              emptyitem={this.state.emptyitem}/>
                </div>
            </div>
    );
  }
}