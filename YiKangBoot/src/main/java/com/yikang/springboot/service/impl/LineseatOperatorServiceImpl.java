package com.yikang.springboot.service.impl;

import com.yikang.springboot.entity.LineseatOperator;
import com.yikang.springboot.mapper.LineseatOperatorMapper;
import com.yikang.springboot.service.ILineseatOperatorService;
import com.yikang.springboot.vo.LineseatOperatorVO;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import java.util.List;

import org.apache.catalina.mapper.Mapper;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author WuHonglin
 * @since 2017-09-30
 */
@Service
public class LineseatOperatorServiceImpl extends ServiceImpl<LineseatOperatorMapper, LineseatOperator> implements ILineseatOperatorService {

	@Override
	public Object getListViewList() {
		return null;
	}

	@Override
	public List<LineseatOperatorVO> getLineseatOperatorByLineId(Long lineId) {
		return this.baseMapper.getLineseatOperatorByLineId(lineId);
	}
	
}
