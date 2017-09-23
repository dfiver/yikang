package com.yikang.springboot.mapper;

import java.util.List;
import java.util.Map;

import com.yikang.springboot.common.SuperMapper;
import com.yikang.springboot.entity.Operator;
import com.yikang.springboot.vo.OperatorVO;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface OperatorMapper extends SuperMapper<Operator> {
	List<OperatorVO> getOperatorWithCondtion(Map<String, Object> condition);
}