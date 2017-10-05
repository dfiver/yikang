package com.yikang.springboot.vo;

import java.util.HashMap;
import java.util.Map;

public class BonusSumDO {
	public Map<String, Float> getLevelHours() {
		return levelHours;
	}
	public void setLevelHours(Map<String, Float> levelHours) {
		this.levelHours = levelHours;
	}
	public String getMainHourLevel() {
		return mainHourLevel;
	}
	public void setMainHourLevel(String mainHourLevel) {
		this.mainHourLevel = mainHourLevel;
	}
	public float[] getJobSubsidiesOptions() {
		return jobSubsidiesOptions;
	}
	public void setJobSubsidiesOptions(float[] jobSubsidiesOptions) {
		this.jobSubsidiesOptions = jobSubsidiesOptions;
	}
	public float getStarSubsidies() {
		return starSubsidies;
	}
	public void setStarSubsidies(float starSubsidies) {
		this.starSubsidies = starSubsidies;
	}
	public float[] getTotalSubsidies() {
		return totalSubsidies;
	}
	public void setTotalSubsidies(float[] totalSubsidies) {
		this.totalSubsidies = totalSubsidies;
	}
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

	private String employeeName;
	private String employeeId;
	private Map<String, Float> levelHours = new HashMap<String, Float>();
	private String mainHourLevel = "";
	private float[] jobSubsidiesOptions = {0.0f, 0.0f};
    private float starSubsidies = 0.0f;
    private float[] totalSubsidies = {0.0f, 0.0f};
	public BonusSumDO(String employeeName, String employeeId) {
		super();
		this.employeeName = employeeName;
		this.employeeId = employeeId;
	}    
}
