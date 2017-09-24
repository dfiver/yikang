import React from 'react';
import ReactDOM from 'react-dom';
import {
  BaseDataTableRow,
  BaseDataTableHeader,
  BaseDataTableEditableRow
} from './DataTable/DataTable.js';

import FetchList from './FetchList';

/**
editRelayout: true
onItemChange: callback
refreshHandler: callback
unaddable：是否能够新增
unaddableMessage: 不能新增的原因
disaddable: 是否有新增按钮
diseditable: 是否有编辑按钮
disdelable: 是否有删除按钮
*/
export default class BaseEditableDataTable extends React.Component {
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
      itemlist: []
    };
  };


  inter_refreshItemsFromURL(url) {
    (new FetchList()).fetchList(url,
      (datalist => {
        if (this.props.entityToView) {
          datalist = datalist.map((data, index) => this.props.entityToView(data));
        }
        this.setState({
          itemlist: datalist
        });
      }));
  }

  inter_refreshItems() {
    if (this.props.fetchURL) {
      this.inter_refreshItemsFromURL(this.props.fetchURL + "/list");
    }
  };

  inter_deleteItem(id) {
    if (this.props.fetchURL) {
      fetch(this.props.fetchURL + "/del?id=" + id)
        .catch(error => {
          console.log("delete item error", error);
          this.onMessage("error", "删除" + this.props.dataTypeName + "记录失败");
        })
        .then(res => res.json())
        .then(data => {
          let viewlist = [];
          if (this.props.entityToView) {
            viewlist = data.obj.map((data, index) => this.props.entityToView(data));
          } else {
            viewlist = data.obj;
          }
          this.setState({
            itemlist: viewlist
          });
          if (data.success) {
            this.onMessage("alert", "删除" + this.props.dataTypeName + "记录成功");
          } else {
            this.onMessage("alert", "删除" + this.props.dataTypeName + "记录失败");
          }
        });
    }
  }

  inter_saveItem(Item) {
    if (this.props.fetchURL) {
      let entity = Item;
      if (this.props.viewToEntity) {
        entity = this.props.viewToEntity(Item);
      }
      fetch(this.props.fetchURL + "/save", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(entity)
        })
        .catch(error => {
          console.log("delete item error", error);
          this.onMessage("error", "保存" + this.props.dataTypeName + "记录失败");
        })
        .then(res => res.json())
        .then(data => {
          let viewlist = [];
          if (this.props.entityToView) {
            viewlist = data.obj.map((data, index) => this.props.entityToView(data));
          } else {
            viewlist = data.obj;
          }
          this.setState({
            itemlist: viewlist
          });
          if (data.success) {
            this.onMessage("alert", "保存" + this.props.dataTypeName + "记录成功");
          } else {
            this.onMessage("alert", "保存" + this.props.dataTypeName + "记录失败");
          }
        });
    }
  }

  componentWillMount() {
    //本列表的刷新控制器
    if (this.props.refreshHandler) {
      this.props.refreshHandler((url) => {
        console.log("refresh", this.props.dataTypeName);
        this.inter_refreshItemsFromURL(url);
      });
    }
    console.log("BaseEditableDataTable will mount begin!");
    this.inter_refreshItems();
    console.log("BaseEditableDataTable will mount end!");
  };

  componentDidMount() {
    $("#table").on('click-row.bs.table', function(e, row, element) {
      console.log(row);
    });
  }



  onAdd(index) {
    if (this.props.unaddable) {
      this.onMessage("alert", this.props.unaddableMessage || "不能新增");
    } else {
      let tempItem = Object.assign({}, this.props.emptyitem);
<<<<<<< HEAD
      console.log("新建的记录：", tempItem);
      // this.props.headerlist.map((headeritem, colIndex) => (
      //   tempItem[headeritem.name] =
      //   (Object.is(headeritem.type, 'star') ||
      //     Object.is(headeritem.type, 'index')) ?
      //   index.toString() :
      //   Object.is(headeritem.type, 'select') ?
      //   headeritem.selectoptions[0] :
      //   ''
      //))
=======
      this.props.headerlist.map((headeritem, colIndex) => (
        tempItem[headeritem.name] =
        (Object.is(headeritem.type, 'star') ||
          Object.is(headeritem.type, 'index')) ?
        index.toString() :
        Object.is(headeritem.type, 'select') ?
        headeritem.selectoptions[0] :
        ''
      ));
>>>>>>> 2154a3cd0edb4f3fabd3ce25297baa2092e9e668
      this.setState({
        state: "add",
        tempItem: tempItem
      });
      console.log("BaseDataTable onAdd");
    }
  };

  onRemove(index) {
    let id = this.state.itemlist[index].id;
    this.inter_deleteItem(id);
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
      tempItem: Object.assign({}, this.state.itemlist[index])
    });
  };

  onSave(index) {
    console.log("保存：", index);
    this.inter_saveItem(this.state.tempItem);
    this.setState({
      state: "common",
      currentIndex: -1,
      tempItem: Object.assign({}, this.props.emptyitem),
    });
  };

  onItemChange(columIndex, value) {
    let columName = this.props.headerlist[columIndex].name;
    console.log(columName, value);
    let tempItem = Object.assign({}, this.state.tempItem);
    tempItem[columName] = value;
    this.setState({
      tempItem: tempItem
    });
    if (this.props.onItemChange) {
      this.props.onItemChange(columIndex, value);
    }
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
        if (Object.is(item.key, key)) {
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

    if (this.props.onItemChange) {
      this.props.onItemChange(columIndex, value);
    };
  };

  onClick(index) {
    let item = this.state.itemlist[index];
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
    const itemlist = this.state.itemlist;
    console.log("itemlist", itemlist);
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
      <BaseDataTableEditableRow key={this.state.itemlist.length} headerlist={this.props.headerlist} 
        item={this.state.tempItem} 
        onItemChange={this.onItemChange.bind(this)} 
        onSelectItemChange={this.onSelectItemChange.bind(this)}
        onCancel={this.onCancel.bind(this, this.state.itemlist.length)}
        onSave={this.onSave.bind(this, this.state.itemlist.length)}
        editRelayout={this.props.editRelayout}/> : null;

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

    console.log("BaseEditableDataTable.props.headerlist", this.props.headerlist);

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
                <BaseDataTableHeader headerlist={this.props.headerlist} 
                onAdd={this.onAdd.bind(this, this.state.itemlist.length)}
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