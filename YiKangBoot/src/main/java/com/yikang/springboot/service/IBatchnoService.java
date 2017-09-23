package com.yikang.springboot.service;

import java.util.Map;

import com.yikang.springboot.entity.Batchno;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface IBatchnoService extends IVOService<Batchno> {

	public Object getBatchNoWithCondition(Map<String, Object> conditions);
}
