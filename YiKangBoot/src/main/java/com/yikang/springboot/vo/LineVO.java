package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Line;

/**
 * 生产线的返回数据格式
 * @author qzchp
 *
 */
public class LineVO extends Line{
	private KeyValue workshop;
	private Integer count;

	public KeyValue getWorkshop() {
		return workshop;
	}

	public void setWorkshop(KeyValue workshop) {
		this.workshop = workshop;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
}
