import React from 'react';
import ReactDOM from 'react-dom';
import EditPage from "../EditPage";

export default class BatchnoEditPage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            inited: false,
            outerSelectionSource:{
                workshop: [],
                productfamily: [],
                productcodeId: [],
            }
        };

        this.cols=[{
                name: 'workshop',
                label: '生产车间',
                type: "select",
                transient:  true,
            }, {
                name: 'productfamily',
                label: '产品家族',
                type: 'select',
                transient:true,
            }, {
                name: 'productcodeId',
                label: '产品型号',
                type: 'select',
            }, {
                name: 'name',
                label: '批次号',
                type: 'input',
            }, {
                name: 'target',
                label: '批次数量',
                type: 'input',
            },{
                name: 'state',
                label: '状态',
                type: 'select',
                defaultValue: '0',

            }, {
                name: 'comment',
                label: '备注',
                type: 'input',
            }];

        this.selectSource={
            state:{
                url:"/data/batchno/state/options",
                source:[{
                    key: 0,
                    value: '新建',
                },{
                    key: 1,
                    value: '生产中',
                },{
                    key: 2,
                    value: '完成',
                },],
            }
        };
        this.outerSelections={
            workshop:null,
            productfamily: null,
            productcodeId: null,
        };
    }

    inter_refresh_productCode() {
        let workshopParam = (this.outerSelections.workshop!=null)?this.outerSelections.workshop:'';
        let productfamilyParam = (this.outerSelections.productfamily!=null)?this.outerSelections.productfamily:'';
        let productcodeParam = (this.outerSelections.productcodeId!=null)?this.outerSelections.productcodeId:'';

        let _fetchUrl = "/data/productcode/list/options?"+"workshopId="+workshopParam
                        +"&productfamilyId="+productfamilyParam
                        +"&productcodeId="+productcodeParam;

        console.log("_fetchUrl",_fetchUrl);
        fetch(_fetchUrl)
            .catch(error => {
                console.log("get productcode error!", error);
            })
            .then(res => res.json())
            .then(data => {
                console.log("options:", data);
                if (data.success) {
                    let outerSelectionSource = [].concat(this.state.outerSelectionSource);
                    outerSelectionSource.workshop = data.obj.workshop.concat([{key:'',value:'--'}]);
                    outerSelectionSource.productfamily = data.obj.productfamily.concat({key:'',value:'--'});
                    outerSelectionSource.productcodeId = data.obj.productcode.concat({key:'',value:'--'});
                    this.setState({
                        outerSelectionSource: outerSelectionSource,
                        inited: true,
                    });
                }
            })
    }

    onOuterSelectChange(key, value){
        this.outerSelections[key] = value;
        this.inter_refresh_productCode();
    }

    componentWillMount(){
        if(this.props.match.params.id>0) {
            fetch("/data/batchno/getbyid?id="+this.props.match.params.id)
                .catch(error => console.log("fetch object error:", error))
                .then(res => res.json())
                .then(data => {
                    if (data.success){
                        this.outerSelections.productcodeId = data.obj.productcodeId;
                        this.inter_refresh_productCode();
                    }
                });
        }else{
            this.inter_refresh_productCode();
        }
    }

    render(){
        return(
        <div>
            {this.state.inited &&
            <EditPage title="批次号编辑" 
                selectionSource={this.selectSource}
                outerSelectionSource={this.state.outerSelectionSource}
                onOuterSelectChange={this.onOuterSelectChange.bind(this)}
                id={this.props.match.params.id} 
                url="/data/batchno" 
                listurl="/backward/batchno" 
                cols={this.cols}/>
            }
        </div>
        )
    }
}