package com.yikang.springboot.mapper;

import com.yikang.springboot.entity.Stopreasonlog;
import com.yikang.springboot.vo.StopreaonlogWithModeVO;

import java.util.List;
import java.util.Map;

import com.yikang.springboot.common.SuperMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface StopreasonlogMapper extends SuperMapper<Stopreasonlog> {

	List<StopreaonlogWithModeVO> queryByCondition(Map<String, Object> cMap);

}