package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Porductlog;
import com.yikang.springboot.mapper.PorductlogMapper;
import com.yikang.springboot.service.IPorductlogService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class PorductlogServiceImpl extends ServiceImpl<PorductlogMapper, Porductlog> implements IPorductlogService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Porductlog>());
	}
}
