package com.yikang.springboot.vo;

import java.util.ArrayList;
import java.util.List;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Operator;

public class OperatorVO extends Operator {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private List<OperatorJoblevelVO> levels = new ArrayList<>();
	private KeyValue shift;
	
	public KeyValue getShift() {
		return shift;
	}

	public void setShift(KeyValue shift) {
		this.shift = shift;
	}

	public List<OperatorJoblevelVO> getLevels() {
		return levels;
	}

	public void setLevels(List<OperatorJoblevelVO> levels) {
		this.levels = levels;
	}
}
