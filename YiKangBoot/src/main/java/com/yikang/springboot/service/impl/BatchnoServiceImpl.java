package com.yikang.springboot.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Batchno;
import com.yikang.springboot.mapper.BatchnoMapper;
import com.yikang.springboot.service.IBatchnoService;


/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class BatchnoServiceImpl extends ServiceImpl<BatchnoMapper, Batchno> implements IBatchnoService {

	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Batchno>());
	}

	@Override
	public Object getBatchNoWithCondition(Map<String, Object> conditions) {
		return this.baseMapper.getBatchNoWithCondition(conditions);
	}
}
