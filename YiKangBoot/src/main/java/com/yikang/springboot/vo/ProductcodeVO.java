package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Productcode;

/**
 * 生产线的返回数据格式
 * @author qzchp
 *
 */
public class ProductcodeVO extends Productcode{
	private KeyValue workshop;
	private KeyValue productfamily;
	
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
}
