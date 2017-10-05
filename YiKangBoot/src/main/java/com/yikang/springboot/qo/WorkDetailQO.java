package com.yikang.springboot.qo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * Created by wuxia on 2017/10/2.
 */
public class WorkDetailQO{
    private String workid;
    private String opname;
    @JsonFormat(timezone="GMT+8", pattern="yyyy-MM-dd")
    private Date startTime;
    @JsonFormat(timezone="GMT+8", pattern="yyyy-MM-dd")
    private Date endTime;
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

        public Date getStartTime() {
            return startTime;
        }

        public void setStartTime(Date startTime) {
            this.startTime = startTime;
        }

        public Date getEndTime() {
            return endTime;
        }

        public void setEndTime(Date endTime) {
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
