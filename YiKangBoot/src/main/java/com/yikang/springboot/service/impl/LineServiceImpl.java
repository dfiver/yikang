package com.yikang.springboot.service.impl;

import com.yikang.springboot.entity.Line;
import com.yikang.springboot.mapper.LineMapper;
import com.yikang.springboot.service.ILineService;
import com.yikang.springboot.vo.LineVO;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import java.util.List;

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
public class LineServiceImpl extends ServiceImpl<LineMapper, Line> implements ILineService {

	@Override
	public List<LineVO> getListViewList() {
		return this.baseMapper.getListViewList();
	}
	
}
