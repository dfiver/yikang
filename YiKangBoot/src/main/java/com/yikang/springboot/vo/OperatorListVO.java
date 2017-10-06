package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Operator;

public class OperatorListVO extends Operator{
	private static final long serialVersionUID = 1L;
	private KeyValue shift;
	
	public KeyValue getShift() {
		return shift;
	}

	public void setShift(KeyValue shift) {
		this.shift = shift;
	}
}
