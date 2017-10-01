import React from 'react';
import ReactDOM from 'react-dom';
import JobBonus from "./paymeta/JobBonus";
import JobStarBonus from "./paymeta/JobStarBonus";

export default class PayMeta extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="page-header">
                    <h1>补贴基础数据设置</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <JobBonus type="month"/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <JobBonus type="hour"/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <JobStarBonus type="star"/>
                </div>
            </div>          
        </div>
        );
    }
}