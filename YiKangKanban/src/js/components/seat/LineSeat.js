import React from 'react';
import ReactDOM from 'react-dom';
import BaseEditableDataTable from "../BaseEditableDataTable";
import FetchList from "../FetchList";

export default class LineSeat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            lineid:this.props.match.params.lineid,
            linename:'',
            seatheadlist: [{
                name: 'index',
                nickName: '序号',
                type: "text",
                width: 2,
            }, {
                name: 'job',
                nickName: '岗位名称',
                type: "select",
                width: 2,
                selectoptions: [{
                    key: '1',
                    value: '岗位1',
                }, {
                    key: '2',
                    value: '岗位2',
                }, {
                    key: '3',
                    value: '岗位3',
                }]
            }, {
                name: 'name',
                nickName: '工位名称',
                type: "text",
                width: 2,
            }, {
                name: 'comment',
                nickName: '备注',
                type: "textarea",
                width: 4
            }],
            seatemptyitem: {
                index: null,
                job: null,
                name: null,
                comment: ''
            },
        }
    }

    componentWillMount() {
        fetch("/data/line/getbyid?id="+this.state.lineid)
            .catch(error => console.log("fetch object error:", error))
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.setState({
                        ...this.state,
                        linename:data.obj.name
                    });
                }else{
                    message.error("未找到对象。");
                }
            });
        // //更新生产车间列表
        // console.log("Line will mount!");
        // (new FetchList()).fetchList("/data/workshop/options", (datalist => {
        //     console.log("workshop options:", datalist);
        //     let headerItem = Object.assign({}, this.state.headerlist[0], {
        //         selectoptions: datalist
        //     });
        //     let newHeaderlist = [].concat(this.state.headerlist);
        //     newHeaderlist.splice(0, 1, headerItem);
        //     this.setState({
        //         headerlist: newHeaderlist
        //     });
        // }));
        // //更新岗位列表
        // console.log("Seat will mount!");
        // (new FetchList()).fetchList("/data/job/options", (datalist => {
        //     console.log("job options:", datalist);
        //     let headerItem = Object.assign({}, this.state.seatheadlist[1], {
        //         selectoptions: datalist
        //     });
        //     let newHeaderlist = [].concat(this.state.seatheadlist);
        //     newHeaderlist.splice(1, 1, headerItem);
        //     this.setState({
        //         seatheadlist: newHeaderlist
        //     });
        // }));
    }

    viewToSeatEntity(viewItem) {
        return {
            id: viewItem.id,
            //lineId: viewItem.line.key, lineId界面上没有，服务端根据参数补充进去的
            jobId: viewItem.job.key,
            serise: viewItem.index,
            name: viewItem.name,
            comment: viewItem.comment,
        }
    }

    seatEntityToView(entity) {
        return {
            id: entity.id,
            line: entity.line,
            job: entity.job,
            index: entity.serise,
            name: entity.name,
            comment: entity.comment
        }
    }
    onChange(item){
        let id = item.id;
        this.props.history.push('/backward/mlineseat/'+this.state.lineid+'/'+id);
    }
    onAdd(){
        this.props.history.push('/backward/mlineseat/'+this.state.lineid+'/0');
    }
    render(){
        return(
            <div class="container">
                <div class="row">
                    <div class="page-header">
                        <h1>{this.state.linename}生产线工位管理</h1>
                    </div>
                </div>
                <div class="row">
                    <BaseEditableDataTable dataTypeName={this.state.dataTypeName}
                        headerlist={this.state.seatheadlist}
                        emptyitem={this.state.seatemptyitem}
                        viewToEntity = {this.viewToSeatEntity}
                        entityToView = {this.seatEntityToView}
                        fetchURL ={"/data/lineseat/"+this.state.lineid}
                                           onChange={this.onChange.bind(this)}
                                           onAdd={this.onAdd.bind(this)}/>
                </div>
            </div>
        );
    }
}