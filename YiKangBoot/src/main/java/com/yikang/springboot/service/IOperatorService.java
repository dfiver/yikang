package com.yikang.springboot.service;

import com.yikang.springboot.entity.Operator;
import com.yikang.springboot.vo.OperatorVO;

import java.util.List;
import java.util.Map;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface IOperatorService extends IVOService<Operator> {

	List<OperatorVO> getOperatorByCondition(Map<String, Object> conditions);
	
}
