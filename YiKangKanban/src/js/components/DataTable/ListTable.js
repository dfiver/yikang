import React from 'react';
import ReactDOM from 'react-dom';

/**
 * headerlist
 * onAdd()
 * onChange(index)
 * onRemove(index)
 * onSave(index, item)
 */
export class ListTable extends React.Component {

    render() {
        console.log("itemlist", this.props.itemlist)
        return (
            <table class="table table-striped table-hover" style={{tableLayout:'fixed'}}> 
            <thead>
                <TableHeader headerlist={this.props.headerlist}/>
            </thead>
            <tbody>
                {this.props.itemlist.map((item, index)=> (
                <CommonRow key={index} headerlist={this.props.headerlist} item={item}
                    onChange = {()=>this.props.onChange(index)}
                    onRemove={()=>this.props.onRemove(index)}
                    onClick={()=>this.props.onClick(index)}
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
            verticalAlign: "middle",
            textAlign: "center"
        };
        if (headerItem.width) {
            style.width = headerItem.width
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
            </tr>
        )
    }
}

/**
 * onClick
 */
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
        return <tr onClick={()=>(this.props.onClick())}>
                {this.props.headerlist.map((headerItem, columIndex) => (
                    <CommonCell key={columIndex} { ...this.props } columIndex={columIndex}/>
                    ))
                }
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
        let style = {
            verticalAlign: "middle",
            textAlign: "center"
        };
        let headerItem = this.props.headerlist[this.props.columIndex];
        return (
            <td style={style}>
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