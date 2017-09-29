import React from 'react';
import ReactDOM from 'react-dom';
import CommitProductInfo from './CommitProductInfo';
import CommitStopReasonInfo from './CommitStopReasonInfo';
import FetchList from './FetchList';
import dateformater from 'dateformater';
import {
    ListTable,
    TableHeader,
    CommonRow,
    CommonCell
} from './DataTable/ListTable';


/*
props.match.params.lineId //生产线编号
*/
export default class CommitProductAndStopReasonLineSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataTypeName: '生产停机信息采集',
            itemlist: [],
            headerlist: [{
                name: 'workshopname',
                nickName: '生产车间名称',
                type: "text",
                width: 2,
            }, {
                name: 'linename',
                nickName: '生产线名称',
                type: 'text',
                width: 2
            }, {
                name: 'comment',
                nickName: '生产线备注',
                type: 'textarea',
                width: 4
            }],
        }
    }

    componentWillMount() {
        console.log("CommitProductAndStopReasonLineSelect will mount!");
        this.inter_refresh_line();
    };

    inter_refresh_line() {
        let _fetchUrl = "/data/line/list";
        console.log(_fetchUrl);
        fetch(_fetchUrl)
            .catch(error => {
                console.log("get line list error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let itemlist = data.obj;
                    this.setState({
                        itemlist: itemlist.map((item, index) => {
                            return {
                                id: item.id,
                                workshopname: item.workshop.value,
                                linename: item.name,
                                comment: item.comment,
                            }
                        })
                    })
                }
            });
    }

    onClick(index) {
        let lineId = this.state.itemlist[index].id;
        console.log("lineId:" + lineId);
        window.location.href = "/backward/commitproductandstopreaon/" + lineId;
    }

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="page-header">
                        <h1>{this.state.dataTypeName}</h1>
                    </div>
                </div>
                <div class="row" style={{marginTop:"10px"}}>
                    <ListTable headerlist = {this.state.headerlist}
                        itemlist = {this.state.itemlist}
                        onClick ={this.onClick.bind(this)}/>
                </div>
            </div>
        );
    }
}