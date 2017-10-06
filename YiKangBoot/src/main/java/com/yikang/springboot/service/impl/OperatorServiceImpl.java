package com.yikang.springboot.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Operator;
import com.yikang.springboot.entity.OperatorJoblevel;
import com.yikang.springboot.mapper.OperatorMapper;
import com.yikang.springboot.qo.OperatorDetailAndStarLevelQO;
import com.yikang.springboot.qo.OperatorJoblevelQO;
import com.yikang.springboot.service.IOperatorService;
import com.yikang.springboot.vo.OperatorVO;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class OperatorServiceImpl extends ServiceImpl<OperatorMapper, Operator> implements IOperatorService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Operator>());
	}

	@Override
	public List<OperatorVO> getOperatorByCondition(Map<String, Object> conditions) {
		List<OperatorVO> rlt = baseMapper.getOperatorWithCondtion(conditions);
		return rlt;
	}

	@Override
	@Transactional
	public boolean saveOperatorAndStarLevel(OperatorDetailAndStarLevelQO operatorQO) {
		Operator operator = operatorQO.getItem();
		boolean oprRlt = operator.insertOrUpdate();
		if(oprRlt) {
			Long operatorId = operator.getId();
			List<OperatorJoblevelQO> itemlist = operatorQO.getItemlist();
			for(OperatorJoblevelQO joblevel: itemlist) {
				if(joblevel.getOperatorJoblevel().getOperatorId() == null) {
					joblevel.getOperatorJoblevel().setOperatorId(operatorId);
				}
				if(joblevel.isRemoved())
					joblevel.getOperatorJoblevel().deleteById();
				else {					
					joblevel.getOperatorJoblevel().insertOrUpdate();
				}
			}
		}
		return true;
	}
}
