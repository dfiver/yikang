package com.yikang.springboot.qo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ProductAndStopQueryQO {
	
	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")
	private Date beginTime;
	
	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")
	private Date endTime;
	
	private Long shiftId;
	private Long lineId;
	private Long workshopId;
	private Long productfamilyId;
	private Long productcodeId;
	private Long batchnoId;
	
	public Date getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(Date beginTime) {
		this.beginTime = beginTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Long getShiftId() {
		return shiftId;
	}
	public void setShiftId(Long shiftId) {
		this.shiftId = shiftId;
	}
	public Long getLineId() {
		return lineId;
	}
	public void setLineId(Long lineId) {
		this.lineId = lineId;
	}
	public Long getWorkshopId() {
		return workshopId;
	}
	public void setWorkshopId(Long workshopId) {
		this.workshopId = workshopId;
	}
	public Long getProductfamilyId() {
		return productfamilyId;
	}
	public void setProductfamilyId(Long productfamilyId) {
		this.productfamilyId = productfamilyId;
	}
	public Long getProductcodeId() {
		return productcodeId;
	}
	public void setProductcodeId(Long productcodeId) {
		this.productcodeId = productcodeId;
	}
	public Long getBatchnoId() {
		return batchnoId;
	}
	public void setBatchnoId(Long batchnoId) {
		this.batchnoId = batchnoId;
	}
}
