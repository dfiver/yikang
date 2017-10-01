package com.yikang.springboot.vo;

import java.util.Date;

public class LineseatOperatorVO {
	
	private Long id;
	private Long lineseatId;
	private String seatName;
	private String joblevel;
	private Integer maxStarlevel;
	private Integer jobStarlevel;
	
	private Long operatorId;
	private String operatorWorkid;
	private String operatorName;
	private String operatorAvatar;
	private Integer operatorjobStarlevel;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getLineseatId() {
		return lineseatId;
	}
	public void setLineseatId(Long lineseatId) {
		this.lineseatId = lineseatId;
	}
	public String getSeatName() {
		return seatName;
	}
	public void setSeatName(String seatName) {
		this.seatName = seatName;
	}
	public Long getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(Long operatorId) {
		this.operatorId = operatorId;
	}
	public String getOperatorWorkid() {
		return operatorWorkid;
	}
	public void setOperatorWorkid(String operatorWorkid) {
		this.operatorWorkid = operatorWorkid;
	}
	public String getOperatorAvatar() {
		return operatorAvatar;
	}
	public void setOperatorAvatar(String operatorAvatar) {
		this.operatorAvatar = operatorAvatar;
	}
	public Integer getOperatorjobStarlevel() {
		return operatorjobStarlevel;
	}
	public void setOperatorjobStarlevel(Integer operatorjobStarlevel) {
		this.operatorjobStarlevel = operatorjobStarlevel;
	}
	public Integer getJobStarlevel() {
		return jobStarlevel;
	}
	public void setJobStarlevel(Integer jobStarlevel) {
		this.jobStarlevel = jobStarlevel;
	}
	public String getJoblevel() {
		return joblevel;
	}
	public void setJoblevel(String joblevel) {
		this.joblevel = joblevel;
	}
	public String getOperatorName() {
		return operatorName;
	}
	public void setOperatorName(String operatorName) {
		this.operatorName = operatorName;
	}
	public Integer getMaxStarlevel() {
		return maxStarlevel;
	}
	public void setMaxStarlevel(Integer maxStarlevel) {
		this.maxStarlevel = maxStarlevel;
	}
}
