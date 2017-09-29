package com.yikang.springboot.mapper;

import java.util.List;
import java.util.Map;

import com.yikang.springboot.common.SuperMapper;
import com.yikang.springboot.entity.Porductlog;
import com.yikang.springboot.vo.ProductlogWithProducecodeVO;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface PorductlogMapper extends SuperMapper<Porductlog> {

	List<ProductlogWithProducecodeVO> queryProductlogByCondition(Map<String, Object> conditionMap);

}