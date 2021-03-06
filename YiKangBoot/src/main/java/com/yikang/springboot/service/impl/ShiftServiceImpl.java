package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Shift;
import com.yikang.springboot.mapper.ShiftMapper;
import com.yikang.springboot.service.IShiftService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class ShiftServiceImpl extends ServiceImpl<ShiftMapper, Shift> implements IShiftService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Shift>());
	}
}
