package com.yikang.springboot.vo;

import com.yikang.springboot.entity.Batchno;
import com.yikang.springboot.entity.Productcode;

public class BatchnoWithProductCodeVO {
	private Batchno batchno;
	private Productcode productcode;

	public Productcode getProductcode() {
		return productcode;
	}

	public void setProductcode(Productcode productcode) {
		this.productcode = productcode;
	}

	public Batchno getBatchno() {
		return batchno;
	}

	public void setBatchno(Batchno batchno) {
		this.batchno = batchno;
	}
}
