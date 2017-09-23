package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.OperatorJoblevel;

public class OperatorJoblevelVO extends OperatorJoblevel {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private KeyValue job;

	public KeyValue getJob() {
		return job;
	}

	public void setJob(KeyValue job) {
		this.job = job;
	}
}
