import React from 'react';
import ReactDOM from 'react-dom';
import SimpleSelect from './SimpleSelect/SimpleSelect';
import {
    Modal
} from 'react-bootstrap';


/**
 * lineId:'909087628014452748'
 */
export default class LineSeatOperator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lineId: props.lineId,
            lineseatList: [],
            lineJobList: [{
                seatId: 'LineA-001-1',
                seatName: '点胶1',
                jobLevel: 'C Level',
                jobStars: 4,
                operator: {
                    id: '001',
                    avatar: '/images/1.jpg',
                    name: '斯蒂芬库里',
                    jobStar: [1, 1, 1, 1, 1],
                },
            }, {
                seatId: 'LineA-001-2',
                seatName: '点胶2',
                jobLevel: 'B Level',
                jobStars: 4,
                operator: {
                    id: '002',
                    avatar: '/images/2.jpg',
                    name: '斯蒂芬库里',
                    jobStar: [1, 1, 1, 1, 1],
                },
            }, {
                seatId: 'LineA-001-3',
                seatName: '点胶3',
                jobLevel: 'C Level',
                jobStars: 4,
                operator: {
                    id: '001',
                    avatar: '/images/2.jpg',
                    name: '斯蒂芬库里',
                    jobStar: [1, 1, 1, 1, 1],
                },
            }, {
                seatId: 'LineA-001-4',
                seatName: '点胶4',
                jobLevel: 'C Level',
                jobStars: 4,
                operator: null,
            }, {
                seatId: 'LineA-001-4',
                seatName: '点胶4',
                jobLevel: 'C Level',
                jobStars: 4,
                operator: null,
            }, {
                seatId: 'LineA-001-4',
                seatName: '点胶4',
                jobLevel: 'C Level',
                jobStars: 4,
                operator: null,
            }, {
                seatId: 'LineA-001-4',
                seatName: '点胶4',
                jobLevel: 'C Level',
                jobStars: 4,
                operator: null,
            }, {
                seatId: 'LineA-001-4',
                seatName: '点胶4',
                jobLevel: 'C Level',
                jobStars: 4,
                operator: null,
            }],

            //员工卡号
            isModalOpen: false,
            modal_seatId: '',
            modal_curWordId: '',
            modal_workId: '',
        }
    }

    closeUpDownModal() {
        this.setState({
            isModalOpen: false
        });
    }

    onChangeUpDown() {
        console.log("on change up down");
        this.inter_updown_lineseatoperator(this.state.modal_workId, this.state.modal_seatId);
    }

    onOpenUpDownModal(index) {
        console.log("on open updown modal", index);
        let lineseat = this.state.lineseatList[index];
        this.setState({
            isModalOpen: true,
            modal_seatId: lineseat.seatId,
            modal_curWordId: lineseat.operator ? lineseat.operator.id : '',
            modal_workId: '',
        });
    }

    modalOnKeyDown(event) {
        console.log(event.keycode);
    }

    onClearOpeatorId() {
        this.setState({
            modal_workId: ''
        });
    }

    onInputOperatorId(event) {
        console.log("keycode:", event.keyCode);
        if ((event.keyCode >= 65 && event.keyCode <= 90) || //字符A~Z
            (event.keyCode >= 48 && event.keyCode <= 57)) //字符0~9
        {
            if (this.state.modal_workId.length < 10) {
                this.setState({
                    modal_workId: this.state.modal_workId + event.key
                })
            }
        }
    }

    lineseatoperator_EntityToView(e) {
        let jobStars = [];
        let operatorJobStars = [];
        for (let i = 0; i < e.maxStarlevel; ++i) {
            jobStars[i] = i < e.jobStarlevel ? 1 : 0;
            operatorJobStars[i] = i < e.operatorjobStarlevel ? 1 : 0;
        }
        let operator = null;
        if (e.id) {
            operator = {
                id: e.id,
                operatorId: e.operatorId,
                name: e.operatorName,
                workid: e.operatorWorkId,
                avatar: e.operatorAvatar,
                jobStar: operatorJobStars,
            }
        }
        return {
            seatId: e.lineseatId,
            seatName: e.seatName,
            jobLevel: e.joblevel,
            jobStars: jobStars,
            maxStars: e.maxStarlevel,
            operator: operator,
        }
    }

    inter_fetch_lineseatoperator() {
        let _fetchUrl = '/data/lineseatoperator/querybylineid?lineId=' + this.state.lineId;
        fetch(_fetchUrl)
            .catch(error => {
                console.log("get lineseatoperator error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    let entityArray = data.obj;
                    let lineseatList = entityArray.map((item, index) => this.lineseatoperator_EntityToView(item))
                    this.setState({
                        lineseatList: lineseatList
                    })
                }
            });
    }

    inter_updown_lineseatoperator(workId, lineseatId) {
        let _fetchUrl = '/data/lineseatoperator/updownseat?workid=' + workId + '&lineseatId=' + lineseatId;
        fetch(_fetchUrl)
            .catch(error => {
                console.log("updown lineseatoperator error!", error);
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.onSuccessUpDown(data);
                } else {
                    this.onErrorUpDown(data);
                }
            });
    }

    onSuccessUpDown(data) {
        console.log("上下岗成功", data.msg);
        this.inter_fetch_lineseatoperator();
        this.closeUpDownModal();
    }

    onErrorUpDown(data) {
        console.log("上下岗失败", data.msg);
    }

    componentWillMount() {
        this.inter_fetch_lineseatoperator();
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                {this.state.lineseatList.map((item, index)=>(
                    <div  key={index} class="pull-left operator-info" 
                        onClick={(event)=>this.onOpenUpDownModal(index)}>
                        <div class="operator-info_job">
                            <span class="label label-primary">{item.jobLevel}</span>
                            <span>{item.seatName}</span>
                        </div>
                        {item.operator?
                        <div>
                            <img class="operator-info_image" src={item.operator.avatar||'/images/none.png'}/>
                            <div class="operator-info_name operator-info_name_default">{item.operator.name}</div>
                            <div class="operator-info_star">
                {
                    item.operator.jobStar.map((item, index) => (
                                    item?
                                    <span key={index} class="glyphicon glyphicon-star"></span>:
                                    <span key={index} class="glyphicon glyphicon-star-empty"></span>
                                ))
                            }
                            </div>
                        </div>
                        :
                        <div>
                            <img class="operator-info_image" src={"/images/none.png"}/>
                            <div class="operator-info_name operator-info_name_none">未上岗</div>
                            <div class="operator-info_star">
                                <span class="glyphicon"></span>
                            </div>
                        </div>
                        }
                    </div>
                    ))
                }
                </div>
                
                {/*模态窗口*/}

                <div>
                    <Modal show={this.state.isModalOpen}
                        onHide={this.closeUpDownModal.bind(this)}
                        onKeyDown={(event)=>this.onInputOperatorId(event)}>
                      <Modal.Header closeButton>
                        <Modal.Title>请刷员工卡{this.state.modal_curWordId==''?'上岗':'下岗'}</Modal.Title>
                      </Modal.Header>                        
                        <Modal.Body>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <span style={{fontSize:'20px'}}>员工卡号：{this.state.modal_workId}</span>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button class='btn btn-default' onClick={this.onClearOpeatorId.bind(this)}>
                                清空
                            </button>                        
                            <button class='btn btn-primary' onClick={this.onChangeUpDown.bind(this)}>
                                {this.state.modal_curWordId==''?'上岗':'下岗'}
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}