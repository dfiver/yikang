package com.yikang.springboot.vo;

public class WorkDetailSumDO {
	private String employeeName;
	private String employeeId;
	private Long operatorId;
	private Long joblevelId;
	private Integer seumsec;
	
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public Long getOperatorId() {
		return operatorId;
	}
	public void setOperatorId(Long operatorId) {
		this.operatorId = operatorId;
	}
	public Long getJoblevelId() {
		return joblevelId;
	}
	public void setJoblevelId(Long joblevelId) {
		this.joblevelId = joblevelId;
	}
	public Integer getSeumsec() {
		return seumsec;
	}
	public void setSeumsec(Integer seumsec) {
		this.seumsec = seumsec;
	}
}
