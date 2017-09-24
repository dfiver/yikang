package com.yikang.springboot.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.OperatorJoblevel;
import com.yikang.springboot.mapper.OperatorJoblevelMapper;
import com.yikang.springboot.service.IOperatorJoblevelService;
import com.yikang.springboot.vo.OperatorJoblevelVO;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class OperatorJoblevelServiceImpl extends ServiceImpl<OperatorJoblevelMapper, OperatorJoblevel> implements IOperatorJoblevelService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<OperatorJoblevel>());
	}

	@Override
	public List<OperatorJoblevelVO> getListViewListByOperatorId(Long operatorId) {
		return baseMapper.getListViewListByOperatorId(operatorId);
	}
}
