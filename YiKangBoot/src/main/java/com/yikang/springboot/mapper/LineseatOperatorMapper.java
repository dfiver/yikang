package com.yikang.springboot.mapper;

import java.util.List;

import com.yikang.springboot.common.SuperMapper;
import com.yikang.springboot.entity.LineseatOperator;
import com.yikang.springboot.vo.LineseatOperatorVO;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author WuHonglin
 * @since 2017-09-30
 */
public interface LineseatOperatorMapper extends SuperMapper<LineseatOperator> {
	List<LineseatOperatorVO> getLineseatOperatorByLineId(Long lineId);
}