import React from 'react';
import ReactDOM from 'react-dom';
import SimpleSelect from './SimpleSelect/SimpleSelect';
import {
    Modal
} from 'react-bootstrap';

export default class LineSeatOperator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            modal_curOperatorId: '',
            modal_operatorId: '',
        }
    }

    closeUpDownModal() {
        this.setState({
            isModalOpen: false
        });
    }

    onChangeUpDown() {
        console.log("on change up down");
    }

    onOpenUpDownModal(index) {
        console.log("on open updown modal", index);
        let lineseat = this.state.lineJobList[index];
        this.setState({
            isModalOpen: true,
            modal_seatId: lineseat.seatId,
            modal_curOperatorId: lineseat.operator ? lineseat.operator.id : '',
        });
    }

    modalOnKeyDown(event) {
        console.log(event.keycode);
    }

    onClearOpeatorId() {
        this.setState({
            modal_operatorId: ''
        });
    }

    onInputOperatorId(event) {
        console.log("keycode:", event.keyCode);
        if ((event.keyCode >= 65 && event.keyCode <= 90) || //字符A~Z
            (event.keyCode >= 48 && event.keyCode <= 57)) //字符0~9
        {
            if (this.state.modal_operatorId.length < 10) {
                this.setState({
                    modal_operatorId: this.state.modal_operatorId + event.key
                })
            }
        }
    }

    render() {
        return (
            <div class="container-fluid">
                <div class="row">
                {this.state.lineJobList.map((item, index)=>(
                    <div  key={index} class="pull-left operator-info" 
                        onClick={(event)=>this.onOpenUpDownModal(index)}>
                        <div class="operator-info_job">
                            <span class="label label-primary">C</span>
                            <span>{item.seatName}</span>
                        </div>
                        {item.operator?
                        <div>
                            <img class="operator-info_image" src={item.operator.avatar||'/images/none.png'}/>
                            <div class="operator-info_name operator-info_name_default">{item.operator.name}</div>
                            <div class="operator-info_star">
                            {item.operator.jobStar.map((item, index)=>(
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
                        <Modal.Title>请刷员工卡{this.state.modal_curOperatorId==''?'上岗':'下岗'}</Modal.Title>
                      </Modal.Header>                        
                        <Modal.Body>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-xs-12">
                                        <span style={{fontSize:'20px'}}>员工卡号：{this.state.modal_operatorId}</span>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button class='btn btn-default' onClick={this.onClearOpeatorId.bind(this)}>
                                清空
                            </button>                        
                            <button class='btn btn-primary' onClick={this.onChangeUpDown.bind(this)}>
                                {this.state.modal_curOperatorId==''?'上岗':'下岗'}
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}