package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Reason;
import com.yikang.springboot.mapper.ReasonMapper;
import com.yikang.springboot.service.IReasonService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class ReasonServiceImpl extends ServiceImpl<ReasonMapper, Reason> implements IReasonService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.getListViewList();
	}
}
