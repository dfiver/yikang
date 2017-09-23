package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Lineseat;

public class LineseatVO extends Lineseat {
	private KeyValue line;
	private KeyValue job;
	public KeyValue getLine() {
		return line;
	}
	public void setLine(KeyValue line) {
		this.line = line;
	}
	public KeyValue getJob() {
		return job;
	}
	public void setJob(KeyValue job) {
		this.job = job;
	}
}
