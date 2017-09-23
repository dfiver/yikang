package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Lineseat;
import com.yikang.springboot.mapper.LineseatMapper;
import com.yikang.springboot.service.ILineseatService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class LineseatServiceImpl extends ServiceImpl<LineseatMapper, Lineseat> implements ILineseatService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.getListViewList();
	}
}
