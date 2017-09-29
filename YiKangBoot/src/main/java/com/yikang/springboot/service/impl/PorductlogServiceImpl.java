package com.yikang.springboot.service.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Porductlog;
import com.yikang.springboot.mapper.PorductlogMapper;
import com.yikang.springboot.service.IPorductlogService;
import com.yikang.springboot.vo.ProductlogWithProducecodeVO;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class PorductlogServiceImpl extends ServiceImpl<PorductlogMapper, Porductlog> implements IPorductlogService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Porductlog>());
	}

	@Override
	public List<ProductlogWithProducecodeVO> queryProductlogList(Long lineId, Long shiftId, String date) throws ParseException {
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		conditionMap.put("lineId", lineId);
		conditionMap.put("shiftId", shiftId);
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Date beginDateTime = sf.parse(date);
		Calendar ca = Calendar.getInstance();
		ca.setTime(beginDateTime);
		ca.add(Calendar.DAY_OF_MONTH, 1);
		Date endDateTime = ca.getTime();
		conditionMap.put("beginTime", beginDateTime);
		conditionMap.put("endTime", endDateTime);
		return this.baseMapper.queryProductlogByCondition(conditionMap);
	}

	@Override
	public List<ProductlogWithProducecodeVO> queryReportListByCondition(Map<String, Object> conditions) {
		return this.baseMapper.queryProductlogByCondition(conditions);
	}
}
