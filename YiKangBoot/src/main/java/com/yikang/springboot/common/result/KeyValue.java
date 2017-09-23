package com.yikang.springboot.common.result;

import java.io.Serializable;

public class KeyValue implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;	
	private Long key;
	private String value;
//	public KeyValue(Long id, String value) {
//		this.key = id;
//		this.value = value;
//	}
	public Long getKey() {
		return key;
	}
	public void setKey(Long key) {
		this.key = key;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}
