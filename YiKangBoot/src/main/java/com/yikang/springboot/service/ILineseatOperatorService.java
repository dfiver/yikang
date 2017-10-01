package com.yikang.springboot.service;

import com.yikang.springboot.entity.LineseatOperator;
import com.yikang.springboot.vo.LineseatOperatorVO;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author WuHonglin
 * @since 2017-09-30
 */
public interface ILineseatOperatorService extends IVOService<LineseatOperator> {

	List<LineseatOperatorVO> getLineseatOperatorByLineId(Long lineId);
	
}
