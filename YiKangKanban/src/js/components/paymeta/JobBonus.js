import React from 'react';
import ReactDom from 'react-dom';

export default class JobBonus extends React.Component{
    constructor(props){
        super(props);
        this.state={
            joblevellist:null,
            jobbonus:{
                id:null,
                catagery: 2,
                key: props.type,
                value:[]
            },
            template:{
                name:null,
                bonus: 0.00,
                comment:'',
                editing: false
            }
        }
    }
    componentWillMount() {
        this.inner_loaddata();
    }
    init_bonusfromjoblevel(loadBonus){
        console.log("init bonus from joblevel",this.state.joblevellist,loadBonus);
        var tempMap = {};
        loadBonus.forEach((e,index)=>{
            tempMap[e.name]=e;
        });
        const jobBonus = this.state.joblevellist.map((job,index)=>{
            if(typeof tempMap[job.name] != 'undefined'){
                return tempMap[job.name];
            }else{
                return {
                    ...this.state.template,
                    name:job.name
                }
            }
        });
        this.state.jobbonus.value=jobBonus;
    }
    inner_loaddata(){
        var obj = {
            catagery: this.state.jobbonus.catagery,
            key: this.state.jobbonus.key,
        };

        //加载岗位级别信息。
        fetch("/data/joblevel/list", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .catch(error => {
                console.log("delete item error", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    if(data.obj!=null){
                        this.state.joblevellist=data.obj;
                    }
                    //查询工作的级别信息。
                    fetch("/data/dict/queryjobbonus", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj)
                    })
                        .catch(error => {
                            console.log("delete item error", error);
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.success) {
                                if(data.obj!=null){
                                    this.state.jobbonus.id=data.obj.id;
                                    this.init_bonusfromjoblevel(JSON.parse(data.obj.value));
                                }else{
                                    this.init_bonusfromjoblevel([]);
                                }
                                this.inner_resetEditing();
                            }
                        });
                }
            });


    }
    inner_resetEditing(){
        const newBonus = this.state.jobbonus.value.map((ele,index)=>{
            return {
                ...ele,
                editing: false
            }
        });
        this.setState({
                ...this.state,
                jobbonus:{
                    ...this.state.jobbonus,
                    value:newBonus
                }
            });
    }
    inner_editclick(job){
        this.state.jobbonus.value.forEach((e,index)=>{
            e.editing=false;
        });
        job.editing=true;
        this.setState(this.state);
    }
    inner_change(index,col,value){
        this.state.jobbonus.value[index][col]=value;
        // console.log(this.state);
    }
    inner_cancelclick(){
        this.inner_loaddata();
    }
    inner_saveclick(){
        var obj = {
            ...this.state.jobbonus,
            value:JSON.stringify(this.state.jobbonus.value)
        };
        fetch("/data/dict/savejobbonus", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .catch(error => {
                console.log("delete item error", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.inner_loaddata();
                }
            });
    }
    render(){
         var bonushtml = this.state.jobbonus.value.map((e,index)=>{
            return (
                e.editing?
                    <tr key={index}>
                        <td>{e.name}</td>
                        <td>
                            <input onChange={(event)=>this.inner_change(index,"bonus",event.target.value)} type="number" className="form-control" defaultValue={e.bonus}></input>
                        </td>
                        <td><input onChange={(event)=>this.inner_change(index,"comment",event.target.value)} className="form-control" defaultValue={e.comment}></input></td>
                        <td>
                            <button onClick={this.inner_saveclick.bind(this)} className="btn btn-sm btn-success">保存</button>
                            <button onClick={this.inner_cancelclick.bind(this)} className="btn btn-sm btn-default">取消</button>
                        </td>
                    </tr>:
                    <tr  key={index}>
                        <td>{e.name}</td>
                        <td>{e.bonus}</td>
                        <td>{e.comment}</td>
                        <td>
                            <button  onClick={this.inner_editclick.bind(this,e)}  className="btn btn-sm btn-primary">修改</button>
                        </td>
                    </tr>
            )
        });
        return(
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h5>岗位类别月补贴设置</h5>
                </div>
                <div className="panel-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr>
                            <th>岗位类别</th>
                            <th>补贴金额（月）</th>
                            <th>备注信息</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bonushtml}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}