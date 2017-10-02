package com.yikang.springboot.service;

import com.yikang.springboot.entity.Stopreasonlog;
import com.yikang.springboot.vo.StopreaonlogTimeDO;
import com.yikang.springboot.vo.StopreaonlogWithModeVO;

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
public interface IStopreasonlogService extends IVOService<Stopreasonlog> {

	List<StopreaonlogWithModeVO> queryByCondition(Map<String, Object> cMap);

	List<StopreaonlogTimeDO> selectSumsecGroupbyReason(Map<String, Object> cMap);
	
}
