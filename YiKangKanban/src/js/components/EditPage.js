import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Row, Col,message,Select } from 'antd';
const { Option } = Select;

import { Form, Input, Button, Radio, Popconfirm } from 'antd';
const FormItem = Form.Item;

/**
 * title
 * url
 * listurl
 * cols
 * id
 * selectionSource
 */
export  default class EditPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:props.id,
            entity:{},
            cols:[],
            title:props.title,
            url:props.url,
            listurl:props.listurl,
            precols:props.cols,
            selectionSource:props.selectionSource
        }
    }
    componentWillMount(){
        console.log("precols",this.state.precols);
        this.state.precols.forEach((col)=>{
            col["loading"]=false;
            if(typeof this.state.selectionSource!='undefined' &&typeof this.state.selectionSource[col.name] != 'undefined'){
                col["loading"]=true;
                fetch(this.state.selectionSource[col.name].url)
                    .catch(error => console.log("fetch object error:", error))
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            col["loading"]=false;
                            this.state.selectionSource[col.name].source=data.obj;
                            this.setState(this.state);
                        }else{
                            message.error("未找到对象。");
                        }
                    });
            }
        });
        if(this.state.id>0) {
            fetch(this.state.url+"/getbyid?id="+this.state.id)
                .catch(error => console.log("fetch object error:", error))
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        this.setState({
                            ...this.state,
                            cols:this.state.precols,
                            entity:data.obj
                        });
                    }else{
                        message.error("未找到对象。");
                    }
                });
        }else{
            this.setState({
                ...this.state,
                cols:this.state.precols,
                entity:{}
            });
        }
    }
    submitForm(){
        console.log("compnents:", this);
        fetch(this.state.url+"/save",{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(this.state.entity)
        }).catch(error => console.log("fetch object error:", error))
            .then(res => res.json()).then(data => {
            if (data.success) {
                message.success("保存成功");
                this.context.router.history.push(this.state.listurl);
            } else {
                message.error("保存失败。");
            }
        });
    }
    handleChange(col,value){
        console.log(col,value);
        this.state.entity[col.name]=value;
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
                                    col["loading"]?null:
                                    <FormItem  label={col.label} key={index} {...formItemLayout}>
                                        {
                                            Object.is(col.type,"input")?
                                                <Input onChange={(event)=>this.handleChange(col,event.target.value)} defaultValue={this.state.entity[col.name]}/>:
                                                Object.is(col.type,"select")?
                                                    <Select onChange={(value)=>this.handleChange(col,value)} defaultValue={this.state.entity[col.name]}>
                                                        {
                                                            this.state.selectionSource[col.name].source.map((option,index)=>(
                                                                <Option key={index} value={option.key}>{option.value}</Option>
                                                            ))
                                                        }
                                                    </Select>:
                                                    Object.is(col.type,"password")?
                                                        <Popconfirm  title="确认重置吗？" onConfirm={(event)=>{
                                                            this.handleChange(col,123456);
                                                            this.submitForm();
                                                        }} okText="确认" cancelText="取消">
                                                            <Button >{col.label}</Button>
                                                        </Popconfirm>:null
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
                        <Link to={this.state.listurl}>返回列表</Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};