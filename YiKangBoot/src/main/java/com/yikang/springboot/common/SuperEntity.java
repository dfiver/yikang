package com.yikang.springboot.common;

import com.baomidou.mybatisplus.activerecord.Model;

/**
 * <p>
 * 测试自定义实体父类 ， 这里可以放一些公共字段信息
 * </p>
 */
public abstract class SuperEntity<T extends SuperEntity<T>> extends Model<T>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
    
}
