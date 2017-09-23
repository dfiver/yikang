package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Workshop;
import com.yikang.springboot.mapper.WorkshopMapper;
import com.yikang.springboot.service.IWorkshopService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class WorkshopServiceImpl extends ServiceImpl<WorkshopMapper, Workshop> implements IWorkshopService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Workshop>());
	}
}
