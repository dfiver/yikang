package com.yikang.springboot.vo;

public class StopreaonlogStatVO {
	private String name;
	private Integer minute;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getMinute() {
		return minute;
	}
	public void setMinute(Integer minute) {
		this.minute = minute;
	}
	public float getPercent() {
		return percent;
	}
	public void setPercent(float percent) {
		this.percent = percent;
	}
	private float percent;
}
