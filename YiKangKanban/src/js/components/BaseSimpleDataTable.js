import React from 'react';
import ReactDOM from 'react-dom';
import {
  BaseDataTableRow,
  BaseDataTableHeader,
  BaseDataTableEditableRow
} from './DataTable/DataTable.js';


/*
onAdd
*/
export default class BaseSimpleDataTable extends React.Component {
  constructor(props) {
    super();
    this.state = {
      messages: {
        alert: {
          show: 0,
          message: 'alert信息'
        },
        error: {
          show: 0,
          message: 'error信息'
        },
        success: {
          show: 0,
          message: 'success信息'
        }
      }
    };
  };

  componentWillMount() {
    console.log("BaseDataTable will mount!");
  };


  onRemove(index) {
    if (this.props.onRemove(index)) {
      this.onMessage("alert", "删除" + this.props.dataTypeName + "一条记录");
    }
  }

  onChange(index) {
    console.log("修改：", index);
    this.props.onChange(index);
  };

  onAdd() {
    this.props.onAdd();
    console.log("BaseDataTable onAdd");
  };

  onMessage(type, message) {
    if (this.state.messages[type]) {
      let messages = Object.assign({}, this.state.messages);
      ++messages[type].show;
      messages[type].message = message;

      this.setState({
        messages: messages
      });
      setTimeout(function() {
        if (messages[type].show) {
          let timeoutmessages = Object.assign({}, this.state.messages);
          --timeoutmessages[type].show;
          this.setState({
            messages: timeoutmessages
          })
        }
      }.bind(this), 2000);
    } else {
      console.log("无法识别的消息类型");
    }
  }


  render() {
    const htmlitemlist = this.props.itemlist.map((item, index) => (
      <BaseDataTableRow key={index} headerlist={this.props.headerlist} item={item} 
        onChange={this.onChange.bind(this, index)}
        onRemove={this.onRemove.bind(this, index)}
      />
    ));

    let successMessage = '';
    let errorMessage = '';
    let alertMessage = '';

    if (this.state.messages["success"].show) {
      successMessage =
        <div class="alert alert-success" role="alert">
          {this.state.messages["success"].message}
        </div>
    }
    if (this.state.messages["error"].show) {
      errorMessage =
        <div class="alert alert-danger" role="alert">
          {this.state.messages["error"].message}
        </div>
    }
    if (this.state.messages["alert"].show) {
      alertMessage =
        <div class="alert alert-warning" role="alert">
          {this.state.messages["alert"].message}
        </div>
    }

    return (
      <div>
        <div class="row" style={{marginTop:"-10px"}}>
          <div class="col-md-12" style={{marginTop:"-125px"}}>
            {successMessage}
            {errorMessage}
            {alertMessage}
          </div>
        </div>
        
          <table class="table table-striped table-hover">
             <thead>
                <BaseDataTableHeader headerlist={this.props.headerlist} onAdd={this.onAdd.bind(this)}/>
                    <tr>
                      {
                        this.props.headerlist.map((headerItem, columIndex) => (
                          <td key={columIndex} class ={"col-md-"+headerItem.width}>
                          {headerItem.searchable?
                            Object.is(headerItem.type, "select")?
                            <select class="form-control" onChange={(event)=>this.props.onFilterItemChange(columIndex, event.target.value)}>
                              <option value=""></option>
                              {
                                headerItem.selectoptions.map((option, index)=>(
                                  <option key={index} value={option.key}>{option.value}</option>
                                ))
                              }
                            </select>
                            :
                            <input type="text" class="form-control" name={headerItem.nickName} onChange={(event)=>this.props.onFilterItemChange(columIndex, event.target.value)}></input>
                            :
                            <input type="text" class="form-control" disabled></input>
                          }
                          </td>
                          ))
                      }
                    </tr>                
             </thead>
             <tbody>
               {htmlitemlist}
             </tbody>
          </table>
      </div>
    );
  }
}