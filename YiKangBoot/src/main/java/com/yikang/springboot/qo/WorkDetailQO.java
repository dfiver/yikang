package com.yikang.springboot.qo;

import java.sql.Timestamp;

/**
 * Created by wuxia on 2017/10/2.
 */
public class WorkDetailQO{
    private String workid;
    private String opname;
    private Timestamp startTime;
    private Timestamp endTime;
    private Long lineId;
    private Long seatId;

    public String getWorkid() {
        return workid;
    }

    public void setWorkid(String workid) {
        this.workid = workid;
    }

    public String getOpname() {
            return opname;
        }

        public void setOpname(String opname) {
            this.opname = opname;
        }

        public Timestamp getStartTime() {
            return startTime;
        }

        public void setStartTime(Timestamp startTime) {
            this.startTime = startTime;
        }

        public Timestamp getEndTime() {
            return endTime;
        }

        public void setEndTime(Timestamp endTime) {
            this.endTime = endTime;
        }

        public Long getLineId() {
            return lineId;
        }

        public void setLineId(Long lineId) {
            this.lineId = lineId;
        }

        public Long getSeatId() {
            return seatId;
        }

        public void setSeatId(Long seatId) {
            this.seatId = seatId;
        }
}
