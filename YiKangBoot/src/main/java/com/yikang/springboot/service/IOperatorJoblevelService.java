package com.yikang.springboot.service;

import com.yikang.springboot.entity.OperatorJoblevel;
import com.yikang.springboot.vo.OperatorJoblevelVO;

import java.util.List;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface IOperatorJoblevelService extends IVOService<OperatorJoblevel> {

	List<OperatorJoblevelVO> getListViewListByOperatorId(Long operatorId);
	
}
