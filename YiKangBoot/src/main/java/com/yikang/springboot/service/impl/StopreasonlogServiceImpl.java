package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Stopreasonlog;
import com.yikang.springboot.mapper.StopreasonlogMapper;
import com.yikang.springboot.service.IStopreasonlogService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class StopreasonlogServiceImpl extends ServiceImpl<StopreasonlogMapper, Stopreasonlog> implements IStopreasonlogService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Stopreasonlog>());
	}
}
