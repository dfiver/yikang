package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Reason;

public class ReasonVO extends Reason {
	private KeyValue mode;

	public KeyValue getMode() {
		return mode;
	}

	public void setMode(KeyValue mode) {
		this.mode = mode;
	}
}
