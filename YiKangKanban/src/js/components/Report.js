import React from 'react'
import ReactDOM from 'react-dom'
import ReactAvatarEditor from 'react-avatar-editor'

export default class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '2017-09-10'
        }
    }

    changeDate(event){
        console.log(event.target.value);
        this.setState({date:event.target.value})
    }

    render(){
        return <input type="date" value={this.state.date} onChange={this.changeDate.bind(this)}></input>
    }
}