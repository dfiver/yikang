package com.yikang.springboot.service.impl;

import com.yikang.springboot.entity.Lineseat;
import com.yikang.springboot.entity.Mode;
import com.yikang.springboot.mapper.ModeMapper;
import com.yikang.springboot.service.IModeService;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class ModeServiceImpl extends ServiceImpl<ModeMapper, Mode> implements IModeService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Mode>());
	}
}
