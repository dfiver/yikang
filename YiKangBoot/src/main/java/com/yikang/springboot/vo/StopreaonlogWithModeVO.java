package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Mode;
import com.yikang.springboot.entity.Reason;
import com.yikang.springboot.entity.Stopreasonlog;

public class StopreaonlogWithModeVO {
	private Stopreasonlog stopreasonlog;
	private Reason reason;
	private Mode mode;
	private KeyValue line;
	public Stopreasonlog getStopreasonlog() {
		return stopreasonlog;
	}
	public void setStopreasonlog(Stopreasonlog stopreasonlog) {
		this.stopreasonlog = stopreasonlog;
	}
	public Reason getReason() {
		return reason;
	}
	public void setReason(Reason reason) {
		this.reason = reason;
	}
	public Mode getMode() {
		return mode;
	}
	public void setMode(Mode mode) {
		this.mode = mode;
	}
	public KeyValue getLine() {
		return line;
	}
	public void setLine(KeyValue line) {
		this.line = line;
	}
}
