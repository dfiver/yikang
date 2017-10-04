import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Row, Col,message,Select } from 'antd';

import { Form, Input, Button, Radio } from 'antd';
const FormItem = Form.Item;

export  default class WorkShopEditPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:props.match.params.id,
            workshop:{},
            cols:[],
            title:"生产车间修改"
        }
    }
    componentWillMount(){
        if(this.state.id>0) {
            fetch("/data/workshop/getbyid?id="+this.state.id)
                .catch(error => console.log("fetch object error:", error))
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        this.setState({
                            ...this.state,
                            cols:[{
                                label:"生产车间名称",
                                type:"input",
                                name:"name"
                            },{
                                label:"备注",
                                type:"input",
                                name:"comment"
                            }],
                            workshop:data.obj
                        });
                    }else{
                        message.error("未找到对象。");
                    }
                });
        }else{
            this.setState({
                ...this.state,
                cols:[{
                    label:"生产车间名称",
                    type:"input",
                    name:"name"
                },{
                    label:"备注",
                    type:"input",
                    name:"comment"
                }],
                workshop:{}
            });
        }
    }
    submitForm(){
        console.log("props:" , this.props);
        fetch("/data/workshop/save",{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(this.state.workshop)
        }).catch(error => console.log("fetch object error:", error))
            .then(res => res.json()).then(data => {
                if (data.success) {
                    this.props.history.push('/backward/workshop');
                } else {
                    message.error("保存失败。");
                }
            });
    }
    handleChange(col,value){
        this.state.workshop[col.name]=value;
    }
    render(){
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        } ;
        const buttonItemLayout =  {
            wrapperCol: { span: 14, offset: 4 },
        } ;
        return(
            <div>
                <Row gutter={16}>
                    <Col span={14} offset={1}>
                        <div className="page-header">
                            <h1>{this.state.title}</h1>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col span={24} >
                        <Form layout="horizontal">
                            {
                                this.state.cols.map((col,index)=>(
                                    <FormItem  label={col.label} key={index} {...formItemLayout}>
                                        {
                                            Object.is(col.type,"input")?<Input onChange={(event)=>this.handleChange(col,event.target.value)} defaultValue={this.state.workshop[col.name]}/>:null
                                        }
                                    </FormItem>
                                ))
                            }
                            <FormItem {...buttonItemLayout}>
                                <Button onClick={this.submitForm.bind(this)} type="primary">提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={14} offset={1}>
                        <Link to="/backward/workshop">返回列表</Link>
                    </Col>
                </Row>
            </div>
        )
    }
}