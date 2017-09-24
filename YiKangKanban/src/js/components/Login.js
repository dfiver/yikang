import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import FetchList from './FetchList';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            redirectToReferrer: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    getInitialState() {
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch("/data/user/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({'passwd':this.refs.pass.value,'username':this.refs.user.value})
        }).catch(error => {
            console.log("登陆出现错误", error);
        }).then(res => res.json()).then(data => {
            if (data.success) {
                sessionStorage.token = true;
                this.setState({ redirectToReferrer: true })
            }
        });
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/backward/workshop' } }
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
        <div className="container">
            <div className="row">
                <div className="page-header">
                    <h1>欢迎您</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-8 col-md-6">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>用户名</label>
                            <input type="text" className="form-control" ref="user"/>
                        </div>
                        <div className="form-group">
                            <label>密码</label>
                            <input type="password" className="form-control" ref="pass"/>
                        </div>
                        <button type="submit" className="btn btn-default">登录</button>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(Login);