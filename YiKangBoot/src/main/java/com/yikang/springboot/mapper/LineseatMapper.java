package com.yikang.springboot.mapper;

import java.util.List;

import com.yikang.springboot.common.SuperMapper;
import com.yikang.springboot.entity.Lineseat;
import com.yikang.springboot.vo.LineseatVO;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface LineseatMapper extends SuperMapper<Lineseat> {
	List<LineseatVO> getListViewList();
}