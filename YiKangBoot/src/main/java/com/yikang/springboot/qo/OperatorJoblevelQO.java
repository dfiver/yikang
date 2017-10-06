package com.yikang.springboot.qo;

import com.yikang.springboot.entity.OperatorJoblevel;

public class OperatorJoblevelQO {
	private boolean removed;
	private OperatorJoblevel operatorJoblevel;
	public boolean isRemoved() {
		return removed;
	}

	public void setRemoved(boolean removed) {
		this.removed = removed;
	}

	public OperatorJoblevel getOperatorJoblevel() {
		return operatorJoblevel;
	}

	public void setOperatorJoblevel(OperatorJoblevel operatorJoblevel) {
		this.operatorJoblevel = operatorJoblevel;
	}
}
