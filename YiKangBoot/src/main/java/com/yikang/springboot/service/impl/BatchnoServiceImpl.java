package com.yikang.springboot.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Batchno;
import com.yikang.springboot.mapper.BatchnoMapper;
import com.yikang.springboot.qo.BatchnoQO;
import com.yikang.springboot.service.IBatchnoService;
import com.yikang.springboot.vo.BatchnoVO;


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
	public List<BatchnoVO> getBatchNoWithCondition(BatchnoQO qo) {
		return this.baseMapper.getBatchNoWithCondition(qo);
	}

	@Override
	public List<KeyValue> getOptionsByLineId(Long lineId) {
		Map<String, Object> conditions = new HashMap<String, Object>();
		conditions.put("lineId", lineId);
		return this.baseMapper.getOptionsByLineId(conditions);
	}
}
