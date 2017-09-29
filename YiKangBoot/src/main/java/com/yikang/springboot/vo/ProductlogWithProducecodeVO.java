package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Porductlog;
import com.yikang.springboot.entity.Productcode;

public class ProductlogWithProducecodeVO {
	private Productcode productcode;
	private Porductlog productlog;
	private KeyValue batchno;
	private KeyValue line;
	public Productcode getProductcode() {
		return productcode;
	}
	public void setProductcode(Productcode productcode) {
		this.productcode = productcode;
	}
	public Porductlog getProductlog() {
		return productlog;
	}
	public void setProductlog(Porductlog productlog) {
		this.productlog = productlog;
	}
	public KeyValue getBatchno() {
		return batchno;
	}
	public void setBatchno(KeyValue batchno) {
		this.batchno = batchno;
	}
	public KeyValue getLine() {
		return line;
	}
	public void setLine(KeyValue line) {
		this.line = line;
	}
}
