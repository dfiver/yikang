package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Batchno;

public class BatchnoVO extends Batchno {
	private KeyValue workshop;
	private KeyValue productfamily;
	private KeyValue productcode;
	public KeyValue getWorkshop() {
		return workshop;
	}
	public void setWorkshop(KeyValue workshop) {
		this.workshop = workshop;
	}
	public KeyValue getProductfamily() {
		return productfamily;
	}
	public void setProductfamily(KeyValue productfamily) {
		this.productfamily = productfamily;
	}
	public KeyValue getProductcode() {
		return productcode;
	}
	public void setProductcode(KeyValue productcode) {
		this.productcode = productcode;
	}
}
