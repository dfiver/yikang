package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.OperatorWorkdetail;
import com.yikang.springboot.mapper.OperatorWorkdetailMapper;
import com.yikang.springboot.service.IOperatorWorkdetailService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class OperatorWorkdetailServiceImpl extends ServiceImpl<OperatorWorkdetailMapper, OperatorWorkdetail> implements IOperatorWorkdetailService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<OperatorWorkdetail>());
	}
}
