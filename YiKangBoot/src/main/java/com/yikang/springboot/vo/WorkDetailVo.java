package com.yikang.springboot.vo;

import com.yikang.springboot.entity.*;

/**
 * Created by wuxia on 2017/10/2.
 */
public class WorkDetailVo {
    private Operator operator;
    private OperatorWorkdetail workdetail;
    private Lineseat seat;
    private Job job;
    private Line line;

    public Line getLine() {
        return line;
    }

    public void setLine(Line line) {
        this.line = line;
    }

    public Operator getOperator() {
        return operator;
    }

    public void setOperator(Operator operator) {
        this.operator = operator;
    }

    public OperatorWorkdetail getWorkdetail() {
        return workdetail;
    }

    public void setWorkdetail(OperatorWorkdetail workdetail) {
        this.workdetail = workdetail;
    }

    public Lineseat getSeat() {
        return seat;
    }

    public void setSeat(Lineseat seat) {
        this.seat = seat;
    }

    public Job getJob() {
        return job;
    }

    public void setJob(Job job) {
        this.job = job;
    }
}
