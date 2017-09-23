import React from 'react';
import ReactDom from 'react-dom'


/**
options={
    selected: key1,
    items[{
        key:key1,
        value:value1
        },
        {
        key:key2,
        value:value2
        }]    
}
*/
export default class SimpleSelect extends React.Component{
    render(){
        return(
            <select class="form-control" defaultValue={this.props.options.selected}>
            {
                this.props.options.items.map((item, index)=> (
                    <option key={index} value={item.key}>{item.value}</option>
                    ))
            }
            </select>
        );
    }
}