import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from './BaseEditableDataTable';
import FetchList from './FetchList';


export default class StopReason extends React.Component {
  constructor() {
    super();
    this.state = {
      inited: false,
      dataTypeName: '停机原因管理',
      headerlist: [{
          name: 'name',
          nickName: '停机原因',
          type: 'text',
          addAttr: {
              required: true,
              "data-required-error": "需要填写停机原因"
          },
          width: 3
      },{
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
      },  {
        name: 'comment',
        nickName: '停机原因备注',
        type: 'textarea',
        width: 4
      }],
      itemlist: [],
      emptyitem: {
        mode: '',
        stopreason: '',
        comment: ''
      }
    }
  }

  componentWillMount() {
    console.log("Reason will mount!");
    new FetchList().fetchList("/data/mode/options", (datalist)=>{
      let headerlist = [].concat(this.state.headerlist);
      headerlist[0].selectoptions = datalist;
      this.setState(
          {headerlist:headerlist}
        )
    })
  };

  reason_viewToEntity(viewitem){
    console.log(viewitem);
      return{
        id: viewitem.id,
        modeId: viewitem.mode.key,
        name: viewitem.name,
        comment: viewitem.comment,
      }
  }
    onChange(item){
        let id = item.id;
        this.props.history.push('/backward/mstopreason/'+id);
    }
    onAdd(){
        this.props.history.push('/backward/mstopreason/0');
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
                              itemlist={this.state.itemlist}
                              emptyitem={this.state.emptyitem}
                              viewToEntity={this.reason_viewToEntity}
                              fetchURL={"/data/reason"}
                                         onChange={this.onChange.bind(this)}
                                         onAdd={this.onAdd.bind(this)}/>
                </div>
            </div>
     );
  }
}