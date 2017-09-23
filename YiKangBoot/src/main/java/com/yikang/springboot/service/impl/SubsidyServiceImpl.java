package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Subsidy;
import com.yikang.springboot.mapper.SubsidyMapper;
import com.yikang.springboot.service.ISubsidyService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class SubsidyServiceImpl extends ServiceImpl<SubsidyMapper, Subsidy> implements ISubsidyService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Subsidy>());
	}
}
