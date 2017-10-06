import React from 'react';
import ReactDOM from 'react-dom';
import {
  BaseDataTableRow,
  BaseDataTableHeader,
  BaseDataTableEditableRow
} from './DataTable.js';
import {message} from 'antd';
import FetchList from '../FetchList';

/**
onItemDelete: 删除callback
headerlist: 表头项
itemlist:内容项
emptyitem: 空白对象
editRelayout: true
unaddable：是否能够新增
unaddableMessage: 不能新增的原因
disaddable: 是否有新增按钮
diseditable: 是否有编辑按钮
disdelable: 是否有删除按钮
*/
export default class LocalEditableDataTable extends React.Component {
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
      },

      state: "common", //common, add, change
      currentIndex: -1,
      tempItem: null,
    };
  };


  onAdd(index) {
    if (this.props.unaddable) {
      this.onMessage("alert", this.props.unaddableMessage || "不能新增");
    } 
    else {
      let tempItem = Object.assign({}, this.props.emptyitem);

      console.log("新建的记录：", tempItem);
      this.setState({
        state: "add",
        tempItem: tempItem
      });
      console.log("BaseDataTable onAdd");
    }
  };

  onRemove(index) {
    let id = this.props.itemlist[index].id;
    if (this.props.onItemDelete) {
      this.props.onItemDelete(index);
    }
    this.setState({
      state: "common",
      currentIndex: -1,
    });
  }

  onChange(index) {
    console.log("修改：", index);
    this.setState({
      state: "change",
      currentIndex: index,
      tempItem: Object.assign({}, this.props.itemlist[index])
    });
  };

  onSave(index) {
    console.log("保存：", index);
    if (this.props.onItemSave) {
      if(this.props.onItemSave(index, this.state.tempItem)){
        this.setState({
          state: "common",
          currentIndex: -1,
          tempItem: Object.assign({}, this.props.emptyitem),
        });        
      }
    }
  };

  onItemChange(columIndex, value) {
    let columName = this.props.headerlist[columIndex].name;
    console.log(columName, value);
    let tempItem = Object.assign({}, this.state.tempItem);
    tempItem[columName] = value;
    this.setState({
      tempItem: tempItem
    });
  };

  onSelectItemChange(columIndex, dict, targetValue) {
    console.log('targetValue', targetValue);
    console.log('dict', dict);
    let columName = this.props.headerlist[columIndex].name;
    let tempItem = Object.assign({}, this.state.tempItem);

    let key = null;
    let value = null;
    if (targetValue instanceof Array) {
      let keyArray = targetValue;
      let valueArray = [];
      for (let keyvalue of keyArray) {
        for (let item of dict) {
          if (Object.is(item.key, keyvalue)) {
            valueArray.push(item.value);
            break;
          }
        };
      }
      key = targetValue.join(",");
      value = valueArray.join(",");
    } else {
      key = targetValue;
      for (let item of dict) {
        if (Object.is(item.key.toString(), key)) {
          value = item.value;
          break;
        }
      };
    }

    tempItem[columName] = {
      key: key,
      value: value
    };
    console.log('tempItem', tempItem);
    this.setState({
      tempItem: tempItem
    });
  };

  onClick(index) {
    let item = this.props.itemlist[index];
    console.log("click item:" + item);
    if (this.props.onClick) {
      this.props.onClick(item);
    }
  }

  onCancel(index) {
    console.log("取消：", index);
    this.onMessage("alert", "取消此前操作成功");
    this.setState({
      state: "common",
      currentIndex: -1,
      tempItem: Object.assign({}, this.props.emptyitem)
    })
  }

  onMessage(type, msg) {
      if (Object.is(type,"success")) {
          message.info(msg);
      }
      if (Object.is(type,"error")) {
          message.error(msg);
      }
      if (Object.is(type,"alert")) {
          message.warn(msg);
      }
  }


  render() {
    const itemlist = this.props.itemlist;
    const htmlitemlist = itemlist.map((item, index) => (
      Object.is(this.state.state, "change") && this.state.currentIndex == index ?
      <BaseDataTableEditableRow key={index} headerlist={this.props.headerlist} item={this.state.tempItem} 
        onItemChange={this.onItemChange.bind(this)} 
        onSelectItemChange={this.onSelectItemChange.bind(this)}
        onCancel={this.onCancel.bind(this, index)}
        onSave={this.onSave.bind(this, index)}
        editRelayout={this.props.editRelayout}/> :
      <BaseDataTableRow key={index} headerlist={this.props.headerlist} item={item} 
        onChange = {this.onChange.bind(this, index)}
        onRemove={this.onRemove.bind(this, index)}
        onClick ={this.onClick.bind(this, index)}
        diseditable = {this.props.diseditable}
        disdelable = {this.props.disdelable}
      />
    ));

    const additemlist = Object.is(this.state.state, "add") ?
      <BaseDataTableEditableRow key={this.props.itemlist.length} headerlist={this.props.headerlist} 
        item={this.state.tempItem} 
        onItemChange={this.onItemChange.bind(this)} 
        onSelectItemChange={this.onSelectItemChange.bind(this)}
        onCancel={this.onCancel.bind(this, this.props.itemlist.length)}
        onSave={this.onSave.bind(this, this.props.itemlist.length)}
        editRelayout={this.props.editRelayout}/> : null;

    return (
      <div>
          <table class="table table-striped table-hover">
             <thead>
                <BaseDataTableHeader headerlist={this.props.headerlist} 
                onAdd={this.onAdd.bind(this, this.props.itemlist.length)}
                unaddable={this.props.unaddable}
                disaddable={this.props.disaddable}/>
             </thead>
             <tbody>
               {htmlitemlist}
               {additemlist}
             </tbody>
          </table>
      </div>
    );
  }
}