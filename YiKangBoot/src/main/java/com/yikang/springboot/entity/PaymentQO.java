package com.yikang.springboot.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class PaymentQO {
	private String employeeId;
	private String employeeName;
	@JsonFormat(timezone="GMT+8", pattern="yyyy-MM")
	private Date currentMonth;
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public Date getCurrentMonth() {
		return currentMonth;
	}
	public void setCurrentMonth(Date currentMonth) {
		this.currentMonth = currentMonth;
	}
}
