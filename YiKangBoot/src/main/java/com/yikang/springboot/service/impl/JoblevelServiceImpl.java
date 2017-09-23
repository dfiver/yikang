package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Joblevel;
import com.yikang.springboot.mapper.JoblevelMapper;
import com.yikang.springboot.service.IJoblevelService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class JoblevelServiceImpl extends ServiceImpl<JoblevelMapper, Joblevel> implements IJoblevelService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Joblevel>());
	}
}
