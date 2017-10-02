package com.yikang.springboot.vo;

import com.baomidou.mybatisplus.annotations.TableField;

public class StopreaonlogTimeDO {
	public Long getReasonId() {
		return reasonId;
	}
	public void setReasonId(Long reasonId) {
		this.reasonId = reasonId;
	}
	public Integer getSecond() {
		return second;
	}
	public void setSecond(Integer second) {
		this.second = second;
	}
	
	@TableField("reason_id")
	private Long reasonId;
	private Integer second;
}
