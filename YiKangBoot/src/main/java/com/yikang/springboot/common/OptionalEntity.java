package com.yikang.springboot.common;

import com.yikang.springboot.common.result.KeyValue;

public abstract class OptionalEntity<T extends OptionalEntity<T>> 
									extends SuperEntity<T> 
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public abstract KeyValue option();

}
