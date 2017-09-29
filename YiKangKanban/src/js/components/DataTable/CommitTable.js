import React from 'react';
import ReactDOM from 'react-dom';

/**
 * headerlist
 * onAdd()
 * onChange(index)
 * onRemove(index)
 * onSave(index, item)
 */
export class CommitTable extends React.Component {

    render() {
        console.log("itemlist", this.props.itemlist)
        return (
            <table class="table table-bordered" style={{tableLayout:'fixed'}}> 
            <thead>
                <TableHeader headerlist={this.props.headerlist}
                    onAdd={this.props.onAdd}/>
            </thead>
            <tbody>
                {this.props.itemlist.map((item, index)=> (
                item.saved?
                <CommonRow key={index} headerlist={this.props.headerlist} item={item}
                    onChange = {()=>this.props.onChange(index)}
                    onRemove={()=>this.props.onRemove(index)}
                    />
                :
                <EditableRow key={index} 
                    headerlist={this.props.headerlist} 
                    item={item} 
                    onCancel = {()=>this.props.onCancel(index)}
                    onSave = {(item)=>this.props.onSave(index, item)}
                    onItemChange = {(columIndex, value) => this.props.onItemChange(index, columIndex, value)}
                    onSelectItemChange = {(columIndex, value) => this.props.onSelectItemChange(index, columIndex, value)}
                    validateItem ={()=>this.props.validateItem(item)}
                    />))
                }
            </tbody>
        </table>
        )
    }
}

/**
headerlist
addable
*/
export class TableHeader extends React.Component {
    getStyle(headerItem) {
        let style = {
            fontSize: "larger",
            verticalAlign: "middle",
            textAlign: "center"
        };
        if (Object.is(headerItem.type, 'date')) {
            style.width = '180px'
        }
        if (Object.is(headerItem.name, 'batchNo')) {
            style.width = '180px'
        }
        return style;
    }
    render() {
        return (
            <tr>
              {
                this.props.headerlist.map((headerItem, columIndex) => (
                  <th key={columIndex} style={this.getStyle(headerItem)}>{headerItem.nickName}</th>
                  ))
              }
              <th style={{width:'150px'}}>
                <button class="btn btn-success btn-sm pull-right" onClick={this.props.onAdd} disabled={this.props.unaddable?true:false}>
                    <span class="glyphicon glyphicon-plus"></span>
                      &nbsp;新增
                </button> 
              </th>
            </tr>
        )
    }
}

export class CommonRow extends React.Component {
    constructor(props) {
        super();
        this.state = {
            onSave: props.onSave
        }
        console.log(props.onSave);

        this.onSave = function(e) {
            this.props.onSave(e);
        }.bind(this);
    }

    render() {
        return <tr>
                {this.props.headerlist.map((headerItem, columIndex) => (
                    <CommonCell key={columIndex} { ...this.props } columIndex={columIndex}/>
                    ))
                }
                <td>
                  <button class="btn btn-sm btn-default pull-right" onClick={this.props.onChange}>
                    <span class="glyphicon glyphicon-remove-circle"></span>
                    &nbsp; 编辑
                  </button> 
                  <button class = "btn btn-sm btn-success pull-right" onClick={this.props.onRemove}>
                    <span class="glyphicon glyphicon-floppy-disk"></span>
                    &nbsp; 删除
                  </button>
                </td>
            </tr>
    }
}

/**
 * headerlist
 * columIndex
 * onItemChange(columnIndex, value)
 */
export class CommonCell extends React.Component {
    render() {
        let headerItem = this.props.headerlist[this.props.columIndex];

        return (
            <td>
            {               
                Object.is(headerItem.type, "select") ?
                <span>{this.props.item[headerItem.name].value}</span>
                :
                <span>{this.props.item[headerItem.name]}</span>
            }
            </td>
        )
    }
}


/**
 * item
 * onSave(item)
 * onCancel
 */
export class EditableRow extends React.Component {
    render() {
        console.log("validateItem", this.props.validateItem());
        return <tr>
                {this.props.headerlist.map((headerItem, columIndex) => (
                    <EditableCell key={columIndex} { ...this.props }
                        columIndex={columIndex}
                        onItemChange={(columnIndex,value)=>this.props.onItemChange(columIndex, value)}
                        onSelectItemChange={(columIndex,value) =>this.props.onSelectItemChange(columIndex, value)}/>
                    ))
                }
                <td>
                  <button class="btn btn-sm btn-default pull-right" onClick={this.props.onCancel}>
                    <span class="glyphicon glyphicon-remove-circle"></span>
                    &nbsp;取消
                  </button> 
                  <button class = "btn btn-sm btn-success pull-right" 
                        disabled = {!this.props.validateItem()}
                        onClick={()=>this.props.onSave(this.props.item)}>
                    <span class="glyphicon glyphicon-floppy-disk"></span>
                    &nbsp;保存
                  </button>
                </td>
            </tr>
    }
}

/**
 * headerlist
 * columIndex
 * onItemChange(columnIndex, value)
 */
export class EditableCell extends React.Component {
    render() {
        let headerItem = this.props.headerlist[this.props.columIndex];
        console.log('headerItem.name', headerItem.name);
        console.log("this.props.item[headerItem.name].key", this.props.item[headerItem.name].key)
        return (
            <td>
            {          
                Object.is(headerItem.type, "textarea") ?
                <textarea ref="inputItem"
                    name = {headerItem.name}
                    class="form-control" 
                    rows = "1"
                    value={this.props.item[headerItem.name]} 
                    onChange={(event)=>(this.props.onItemChange(this.props.columIndex, event.target.value))}>
                </textarea>
                :
                Object.is(headerItem.type, "select") ?
                <select 
                    name={headerItem.name}
                    class="form-control" 
                    ref="inputItem"
                    value={this.props.item[headerItem.name].key}
                    onChange={(event)=>(this.props.onSelectItemChange(this.props.columIndex, event.target.value))}
                    disabled = {headerItem.disabled?true:false}>
                    <option value=''></option>
                    {
                      headerItem.selectoptions.map((option, index)=>(
                        <option key={index} value={option.key}>{option.value}</option>
                      ))
                    }
                </select>
                :
                <input class="form-control" 
                    ref="inputItem"
                    name={headerItem.name}
                    type={headerItem.type}
                    value={this.props.item[headerItem.name]} 
                    onChange={(event)=>(this.props.onItemChange(this.props.columIndex, event.target.value))}
                    disabled = {headerItem.disabled?true:false}/>
            }
            </td>
        )
    }
}