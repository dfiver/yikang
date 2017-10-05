package com.yikang.springboot.vo;

import java.util.HashMap;
import java.util.Map;

public class BonusSumVO {
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
	public Map<String, String> getLevelHours() {
		return levelHours;
	}
	public void setLevelHours(Map<String, String> levelHours) {
		this.levelHours = levelHours;
	}
	public String getMainHourLevel() {
		return mainHourLevel;
	}
	public void setMainHourLevel(String mainHourLevel) {
		this.mainHourLevel = mainHourLevel;
	}
	public String[] getJobSubsidiesOptions() {
		return jobSubsidiesOptions;
	}
	public void setJobSubsidiesOptions(String[] jobSubsidiesOptions) {
		this.jobSubsidiesOptions = jobSubsidiesOptions;
	}
	public String getStarSubsidies() {
		return starSubsidies;
	}
	public void setStarSubsidies(String starSubsidies) {
		this.starSubsidies = starSubsidies;
	}
	public String[] getTotalSubsidies() {
		return totalSubsidies;
	}
	public void setTotalSubsidies(String[] totalSubsidies) {
		this.totalSubsidies = totalSubsidies;
	}
	private String employeeName;
	private String employeeId;
	private Map<String, String> levelHours = new HashMap<String, String>();
	private String mainHourLevel = "";
	private String[] jobSubsidiesOptions = {"0.00", "0.00"};
    private String starSubsidies = "0.00";
    private String[] totalSubsidies = {"0.00", "0.00"};
	public BonusSumVO(String employeeName, String employeeId) {
		super();
		this.employeeName = employeeName;
		this.employeeId = employeeId;
	}    
}
