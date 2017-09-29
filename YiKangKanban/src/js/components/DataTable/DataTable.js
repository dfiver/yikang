import '../../../asset/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Switch from 'rc-switch';

/**
headerlist
item
onItemChange
onSelectItemChange
onCancel
onSave
*/
export class BaseDataTableEditableRow extends React.Component {

  constructor(props) {
    super();
    this.state = {
      onSave: props.onSave
    }
    console.log(props.onSave);

    this.onSave = function(e) {
      if (e.isDefaultPrevented()) {
        console.log("合法性校验失败了啊");
      } else {
        e.preventDefault();
        console.log("合法性校验成功");
        this.props.onSave(e);
      }
    }.bind(this);
  }

  componentDidMount() {
    console.log("BaseDataTableEditableRow componentDidMount")
    $("#basedataform").validator().on("submit", this.onSave);
  }

  render() {

    let layout = '';
    if (!this.props.editRelayout) {
      layout = <div class="row">
                        {
                        this.props.headerlist.map((headerItem, columIndex) => (
                        <BaseDataTableEditableCell key={columIndex} { ...this.props } columIndex={columIndex}/>
                        ))
                        }
                        <div class="col-md-2">
                          <a href="#" class="btn btn-sm btn-default pull-right" onClick={this.props.onCancel}>
                            <span class="glyphicon glyphicon-remove-circle"></span>
                            &nbsp;取消
                          </a> 
                          <button type="submit" class = "btn btn-sm btn-success pull-right">
                            <span class="glyphicon glyphicon-floppy-disk"></span>
                            &nbsp;保存
                          </button>
                        </div>
                    </div>
    } else {
      let rowArray = [];
      let beginIndex = 0;
      let endIndex = 0;
      let i;
      for (i in this.props.headerlist) {
        ++endIndex;
        this.props.headerlist[i].columIndex = endIndex - 1;
        if (this.props.headerlist[i].break) {
          rowArray.push(this.props.headerlist.slice(beginIndex, endIndex));
          beginIndex = endIndex;
        }
      }
      console.log(rowArray);
      layout =
        <div>
                {rowArray.map((row, lineIndex) =>(
                    <div class="row" key={lineIndex}>
                    {row.map((headerItem, itemIndex)=>(
                        <BaseDataTableEditableCell key={headerItem.columIndex} { ...this.props } columIndex={headerItem.columIndex}/>
                    ))}
                    </div>
                ))}
                    <div class="row">
                       <div class="col-md-12">
                          <a href="#" class="btn btn-sm btn-default pull-right" onClick={this.props.onCancel}>
                            <span class="glyphicon glyphicon-remove-circle"></span>
                            &nbsp;取消
                          </a> 
                          <button type="submit" class = "btn btn-sm btn-success pull-right">
                            <span class="glyphicon glyphicon-floppy-disk"></span>
                            &nbsp;保存
                          </button>
                        </div>
                    </div>                    
                </div>
    }

    return (
      <tr> 
          <td class= 'info' colSpan={this.props.headerlist.length+1}>
          <form id="basedataform" data-toggle="validator" role="form">
              {layout}
          </form>
          </td>
      </tr>
    )
  }
}

export class BaseDataTableEditableCell extends React.Component {
  componentDidMount() {
    let headeritem = this.props.headerlist[this.props.columIndex];
    console.log(headeritem.addAttr);
    for (let key in headeritem.addAttr) {
      $(this.refs.inputItem).attr(key, headeritem.addAttr[key]);
    }
  }

  render() {
    console.log("this.props:",this.props);
    let headerItem = this.props.headerlist[this.props.columIndex];
    let itemWidth = this.props.editRelayout ? headerItem.edit_width : headerItem.width;
    let selectoptions = [];
    if (Object.is(headerItem.type, "multigroupselect")) {
      console.log('headerItem', headerItem);
      headerItem.groupoptions.map(function(groupoption, index) {
        console.log('groupoption.options', groupoption.options);
        selectoptions = selectoptions.concat(groupoption.options);
      });
      console.log('selectoptions', selectoptions);
    }
    return (
      <div class={"col-md-"+itemWidth}>
            {               
                Object.is(headerItem.type, "textarea") ?
                <div class="form-group">
                    <label class="control-label">{headerItem.nickName+':'}</label>
                    <textarea ref="inputItem"
                        name = {headerItem.name}
                        class="form-control" 
                        value={this.props.item[headerItem.name]} 
                        onChange={(event)=>(this.props.onItemChange(this.props.columIndex, event.target.value))}
                        disabled = {headerItem.uneditable?true:false}>
                  </textarea>
                  <div class="help-block with-errors"></div>
                </div>
                :
                Object.is(headerItem.type, "select") ?
                <div class="form-group">
                  <label class="control-label">{headerItem.nickName+':'}</label>
                  {headerItem.uneditable?
                  <select 
                    name={headerItem.name}
                    class="form-control" 
                    ref="inputItem"
                    defaultValue={this.props.item[headerItem.name].key}
                    disabled = {true}>
                    {
                      headerItem.selectoptions.map((option, index)=>(
                        <option key={index} value={option.key}>{option.value}</option>
                      ))
                    }
                  </select>
                  :
                  <select 
                    name={headerItem.name}
                    class="form-control" 
                    ref="inputItem"
                    value={this.props.item[headerItem.name].key}
                    onChange={headerItem.uneditable?"":(event)=>(this.props.onSelectItemChange(this.props.columIndex, headerItem.selectoptions, event.target.value))}>
                    {
                      headerItem.selectoptions.map((option, index)=>(
                        <option key={index} value={option.key}>{option.value}</option>
                      ))
                    }
                  </select>
                  }                  
                  <div class="help-block with-errors"></div>
                </div>
                :
                Object.is(headerItem.type, "multiselect") ?
                <div class="form-group">
                  <label class="control-label">{headerItem.nickName+':'}</label>
                  <MultiSelect headerItem={headerItem} 
                        selectoptions = {headerItem.selectoptions}
                        value={this.props.item[headerItem.name].key}
                        onComplete = {(value)=>(this.props.onSelectItemChange(this.props.columIndex, headerItem.selectoptions, value))}
                        disabled = {headerItem.uneditable?true:false}/>
                  <div class="help-block with-errors"></div>
                </div>
                :
                Object.is(headerItem.type, "multigroupselect") ?
                <div class="form-group">
                  <label class="control-label">{headerItem.nickName+':'}</label>
                  <MultiGroupSelect headerItem={headerItem} value={this.props.item[headerItem.name].key.split(",")}
                        onComplete = {(value)=>(
                          this.props.onSelectItemChange(this.props.columIndex, selectoptions, value)
                          )}
                        disabled = {headerItem.uneditable?true:false}/>
                  <div class="help-block with-errors"></div>
                </div>
                :
                Object.is(headerItem.type, "reset") ?
                  this.props.item[headerItem.name]?
                  <div class="form-group">
                    <label class="control-label">{headerItem.nickName+':'}</label>
                    <span>
                      {headerItem.switchoptions[0].stateValue}
                    </span>
                    {headerItem.switchoptions[0].enabled?
                      <button class={"btn btn-sm btn-warning pull-left"}
                          onClick={(event)=>{
                                      event.preventDefault();
                                      this.props.onItemChange(this.props.columIndex, false);}}>
                          {headerItem.switchoptions[0].btnTitle}
                      </button>
                      :
                      <button class={"btn btn-sm pull-left disabled"}
                        onClick={(event)=>event.preventDefault()}>
                          {headerItem.switchoptions[0].btnTitle}
                      </button>
                    }
                  </div>
                    :
                  <div class="form-group">
                    <label class="control-label">{headerItem.nickName+':'}</label>
                    <span>
                      {headerItem.switchoptions[1].stateValue}
                    </span>
                    {headerItem.switchoptions[1].enabled?
                      <button class={"btn btn-sm btn-warning pull-left"}
                          onClick={(event)=>this.props.onItemChange(this.props.columIndex, false)}>
                          {headerItem.switchoptions[1].btnTitle}
                      </button>
                      :
                      <button class={"btn btn-sm pull-left disabled"}
                        onClick={(event)=>event.preventDefault()}>
                          {headerItem.switchoptions[1].btnTitle}
                      </button>
                    }
                  </div> 
                :
                Object.is(headerItem.type, "switch")?
                <div>
                    <label class="control-label">{headerItem.nickName+':'}</label>
                    <span>{this.props.item[headerItem.name]? 
                          headerItem.switchoptions[0].stateValue:
                          headerItem.switchoptions[1].stateValue}
                    </span>
                    <Switch 
                        checked={this.props.item[headerItem.name]}
                        onChange={()=>this.props.onItemChange(this.props.columIndex, !this.props.item[headerItem.name])}
                        disabled={this.props.item[headerItem.name]? 
                          (!headerItem.switchoptions[0].enabled):
                          (!headerItem.switchoptions[1].enabled)}/>
                </div>
                :
                Object.is(headerItem.type, "star") ?
                <StarTableCell starNum={this.props.item[headerItem.name]}/>:
                <div class="form-group">
                  <label class="control-label">{headerItem.nickName+':'}</label>
                  <input class="form-control" 
                        ref="inputItem"
                        name={headerItem.name}
                        type={headerItem.type} 
                        value={this.props.item[headerItem.name]} 
                        onChange={(event)=>(this.props.onItemChange(this.props.columIndex, event.target.value))}
                        disabled = {headerItem.uneditable?true:false}/>
                  <div class="help-block with-errors"/>
                </div>
            }
            </div>
    )
  }
}

/*
onComplete
headerItem
value
*/
class MultiSelect extends React.Component {
  componentDidMount() {
    console.log("MultiSelect did mount!:"+this.props);
    $(this.refs.multiselect).selectpicker('val', this.props.selectoptions);
    $(this.refs.multiselect).on('hidden.bs.select', function(e) {
      this.props.onComplete($(e.target).val());
    }.bind(this));
  };

  render() {
    return (
      <div>
    {
      this.props.uneditable ?
      <select ref="multiselect" disabled={true} 
            class="selectpicker form-control" 
            multiple 
            title={"请选择"+this.props.headerItem.nickName}
            name={this.props.headerItem.name}>
      {
        this.props.selectoptions.map((option, index)=>(
        <option key={index} value={option.key}>{option.value}</option>
        ))
      }
      </select> : <select ref="multiselect" 
        class="selectpicker form-control" 
        multiple 
        title={"请选择"+this.props.headerItem.nickName}
        name={this.props.headerItem.name}>
      {
        this.props.selectoptions.map((option, index)=>(
        <option key={index} value={option.key}>{option.value}</option>
        ))
      }
      </select>
    }
    </div>);
  }
};

/*
onComplete
headerItem
value
*/
class MultiGroupSelect extends React.Component {
  componentDidMount() {
    console.log("MultiGroupSelect did mount!",this.props);
    $(this.refs.multigroupselect).selectpicker('val', this.props.value);
    $(this.refs.multigroupselect).on('hidden.bs.select', function(e) {
      this.props.onComplete($(e.target).val());
    }.bind(this));
  };

  render() {
    return (
      <select ref="multigroupselect" class="selectpicker form-control" multiple title={"请选择"+this.props.headerItem.nickName}
            name={this.props.headerItem.name}>
            {
              this.props.headerItem.groupoptions.map((groupoption, index) =>(
                <optgroup key={index + groupoption.name} label={groupoption.name}>
                  {
                    groupoption.options.map((option, subindex)=>(
                      <option key={subindex} value={option.key}>{option.value}</option>
                    ))
                  }
                </optgroup>
                ))
            }
          </select>
    );
  }
};

/**
headerlist
item
onChange
onRemove
disdelable
diseditable
*/
export class BaseDataTableRow extends React.Component {

  onClick(event) {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  }

  render() {
    return (
      <tr onClick={(event)=>(this.onClick(event))}>
      {
        this.props.headerlist.map((headerItem, columIndex) => (
          <td key={columIndex} style={{verticalAlign:"middle", textAlign: "center"}}>{
            (Object.is(headerItem.type, 'select')||
              Object.is(headerItem.type, 'multiselect')||
              Object.is(headerItem.type, 'multigroupselect'))?
            (this.props.item[headerItem.name]&&this.props.item[headerItem.name].value)?this.props.item[headerItem.name].value:""
            :
            Object.is(headerItem.type, 'reset')?
            (this.props.item[headerItem.name]? 
              headerItem.switchoptions[0].stateValue:headerItem.switchoptions[1].stateValue):
            Object.is(headerItem.type, 'switch')?
            (this.props.item[headerItem.name]?
              headerItem.switchoptions[0].stateValue:headerItem.switchoptions[1].stateValue):
            Object.is(headerItem.type, 'star')?
            <StarTableCell key={columIndex} starNum={this.props.item[headerItem.name]}/>:
            Object.is(headerItem.type, 'starlist')?
            <StarList starlist={this.props.item[headerItem.name]}/>:
            Object.is(headerItem.type, 'image')?
                <img src={this.props.item[headerItem.name]} height={headerItem.imageHeight}
                        width={headerItem.imageWidth}/>:
            this.props.item[headerItem.name]}
          </td>
        ))
      }
      <td style={{verticalAlign:"middle"}}>
        {this.props.disdelable?"":
        <button class="btn btn-sm btn-danger pull-right" onClick={this.props.onRemove}>
          <span class="glyphicon glyphicon-trash"></span>
          &nbsp;删除
        </button> 
        }
        {this.props.diseditable?"":
        <button class = "btn btn-sm btn-primary pull-right" onClick={this.props.onChange}>
          <span class="glyphicon glyphicon-pencil"></span>
          &nbsp;修改
        </button>
        }
      </td>
    </tr>
    )
  }
}

export class StarTableCell extends React.Component {
  render() {
    var stars = [];
    for (var i = 0; i < this.props.starNum; i++) {
      stars.push(<span  key={i} class="glyphicon glyphicon-star"></span>);
    }
    return (
      <span>
        {stars}
      </span>
    )
  }
}

export class StarList extends React.Component {
  render() {
    this.props.starlist.map((item, index) => {
      console.log("index:" + index + "item:" + item);
    });
    return (
      <table>
          <tbody>
            {this.props.starlist.map((item, index)=>(
                <tr key={index}>
                    <td>{item.key}</td>
                    <td><StarTableCell starNum={item.value}/></td>
                </tr>                
            ))}
          </tbody>
      </table>
    )
  }
}

/**
headerlist
addable
*/
export class BaseDataTableHeader extends React.Component {
  render() {
    console.log("BaseDataTableHeader.props.headerlist", this.props.headerlist);
    return (
      <tr>
      {
        this.props.headerlist.map((headerItem, columIndex) => (
          <th key={columIndex} class ={"col-md-"+headerItem.width} style={{fontSize:"larger",verticalAlign:"middle", textAlign: "center"}}>{headerItem.nickName}</th>
          ))
      }
      <th class="col-md-2">
        <button class="btn btn-success btn-sm pull-right" onClick={this.props.onAdd} disabled={this.props.unaddable?true:false}>
            <span class="glyphicon glyphicon-plus"></span>
              &nbsp;新增
        </button> 
      </th>
    </tr>
    )
  }
}