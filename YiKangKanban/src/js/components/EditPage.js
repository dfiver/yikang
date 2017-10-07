/**
 * title
 * url
 * listurl
 * cols
 * id
 * selectionSource
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Checkbox,  Row, Col,message,Select,InputNumber } from 'antd';
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;


import { Form, Input, Button, Radio, Popconfirm } from 'antd';
import BaseEditableDataTable from "./BaseEditableDataTable";
const FormItem = Form.Item;


/**
*outerSelectionSource 
*onSelectItemChange
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
            selectionSource:props.selectionSource,
            haveSubmit: (typeof props.haveSubmit =='undefined'?true:props.haveSubmit),
            haveListLink: (typeof props.haveListLink =='undefined'?true:props.haveListLink)
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
                        this.state.precols.forEach((col)=>{
                            if(Object.is(col.type,"checkbox")){
                                if(typeof data.obj[col.name] != 'undefined'){
                                    data.obj[col.name]=data.obj[col.name].split(",");
                                }
                            }
                        });
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
            let temp = {
                ...this.state,
                cols:this.state.precols,
                entity:{}
            };
            this.state.precols.forEach((col)=>{
                if(typeof col.defaultValue!='undefined'){
                    temp.entity[col.name]=col.defaultValue;
                }
            });
            this.setState(temp);
        }
    }
    submitForm(){
        let tempEntity = Object.assign({},this.state.entity);
        this.state.cols.forEach((col,index)=>{
            if(Object.is(col.type,"checkbox")){
                let tempArr=tempEntity[col.name];
                var sortedArr = tempArr.sort((a, b) => (parseInt(a) > parseInt(b) ? 1 : -1));
                tempEntity[col.name]=sortedArr.join(",");
            }
            if(col.transient){
                delete tempEntity[col.name];
            }
        });
        console.log("Log entity compare:",tempEntity,this.state.entity);
        fetch(this.state.url+"/save",{
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(tempEntity)
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

    handleSelectChange(col, value){
        if(col.name in this.state.selectionSource){
            this.handleChange(col, value);
        }
        else if(col.name in this.props.outerSelectionSource){
            this.props.onOuterSelectChange(col.name, value);
            this.handleChange(col, value);
        }
    }

    render(){
        const formItemLayout =  {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        } ;
        const buttonItemLayout =  {
            wrapperCol: { span: 14, offset: 4 },
        } ;
        console.log("this.props.outerSelectionSource", this.props.outerSelectionSource);
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
                                                Object.is(col.type,"number")?
                                                    <InputNumber onChange={(event)=>this.handleChange(col,event.target.value)} defaultValue={this.state.entity[col.name]}/>:
                                                Object.is(col.type,"select")?
                                                    <Select disabled={col.disable || false} onChange={(value)=>this.handleSelectChange(col,value)} defaultValue={(this.state.entity[col.name]?this.state.entity[col.name].toString():null) || col.defaultValue }>
                                                        {
                                                            (col.name in this.state.selectionSource)?
                                                            this.state.selectionSource[col.name].source.map((option,index)=>(
                                                                <Option key={index} value={option.key}>{option.value}</Option>
                                                            )):
                                                                (col.name in this.props.outerSelectionSource)?
                                                                this.props.outerSelectionSource[col.name].map((option, index)=>(
                                                                    <Option key={index} value={option.key}>{option.value}</Option>
                                                                ))
                                                                :''
                                                        }
                                                    </Select>:
                                                    Object.is(col.type,"password")?
                                                        <Popconfirm  title="确认重置吗？" onConfirm={(event)=>{
                                                            this.handleChange(col,123456);
                                                            this.submitForm();
                                                        }} okText="确认" cancelText="取消">
                                                            <Button >{col.label}</Button>
                                                        </Popconfirm>:
                                                        Object.is(col.type,"link")?
                                                            <Button onClick={()=>{
                                                                this.context.router.history.push(col.url+"/"+this.state.id);
                                                            }}>{col.label}</Button>:
                                                            Object.is(col.type,"checkbox")?
                                                                <CheckboxGroup defaultValue={this.state.entity[col.name]?this.state.entity[col.name]:[]} onChange={(values)=>{this.handleChange(col,values)}}>
                                                                    {
                                                                        this.state.selectionSource[col.name].source.map((option,index)=>(
                                                                            <div key={index}><Checkbox  value={option.key}>{option.value}</Checkbox></div>
                                                                        ))
                                                                    }
                                                                </CheckboxGroup>:
                                                                Object.is(col.type,"readonly")?
                                                                    <div>{this.state.entity[col.name]}</div>:
                                                                    Object.is(col.type,"passwordinput")?
                                                                        <Input onChange={(event)=>this.handleChange(col,event.target.value)} defaultValue={"******"}/>:null
                                        }
                                    </FormItem>
                                ))
                            }
                            {
                                this.state.haveSubmit?
                                <FormItem {...buttonItemLayout}>
                                    <Button onClick={this.submitForm.bind(this)} type="primary">提交</Button>
                                </FormItem>:null
                            }
                        </Form>
                    </Col>
                </Row>
                {
                    this.state.haveListLink ?
                        <Row gutter={16}>
                            <Col span={14} offset={1}>
                                <Link to={this.state.listurl}>返回列表</Link>
                            </Col>
                        </Row>:null
                }
            </div>
        )
    }
}

EditPage.contextTypes = {
    router: React.PropTypes.object
};