package com.yikang.springboot.qo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ResonReportQO {
	private Long lineId;
	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
	private Date beginDate;
	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
	private Date endDate;
	public Long getLineId() {
		return lineId;
	}
	public void setLineId(Long lineId) {
		this.lineId = lineId;
	}
	public Date getBeginDate() {
		return beginDate;
	}
	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
}
