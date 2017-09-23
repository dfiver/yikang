package com.yikang.springboot.vo;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Job;

/**
 * 岗位表的返回数据格式
 * @author qzchp
 *
 */
public class JobVO extends Job{
	private KeyValue joblevel;

	public KeyValue getJoblevel() {
		return joblevel;
	}

	public void setJoblevel(KeyValue joblevel) {
		this.joblevel = joblevel;
	}

}
