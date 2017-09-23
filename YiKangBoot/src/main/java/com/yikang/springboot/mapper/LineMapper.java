package com.yikang.springboot.mapper;

import java.util.List;

import com.yikang.springboot.common.SuperMapper;
import com.yikang.springboot.entity.Line;
import com.yikang.springboot.vo.LineVO;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface LineMapper extends SuperMapper<Line> {
	List<LineVO> getListViewList();
}