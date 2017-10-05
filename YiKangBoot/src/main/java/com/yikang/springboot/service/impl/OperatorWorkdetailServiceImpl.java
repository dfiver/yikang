package com.yikang.springboot.service.impl;

import com.yikang.springboot.qo.WorkDetailQO;
import com.yikang.springboot.vo.ProductlogWithProducecodeVO;
import com.yikang.springboot.vo.WorkDetailSumDO;
import com.yikang.springboot.vo.WorkDetailVo;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.OperatorWorkdetail;
import com.yikang.springboot.mapper.OperatorWorkdetailMapper;
import com.yikang.springboot.service.IOperatorWorkdetailService;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class OperatorWorkdetailServiceImpl extends ServiceImpl<OperatorWorkdetailMapper, OperatorWorkdetail> implements IOperatorWorkdetailService {
	@Override
	public Object getListViewList() {

		return this.baseMapper.selectList(new EntityWrapper<OperatorWorkdetail>());
	}


	@Override
	public List<WorkDetailVo> queryWorkDetailByQO(WorkDetailQO qo) {
    	//由于精确到天，因此，作为截至时间的一天也是包含在内的。
    	if(qo.getEndTime() != null) {
        	Calendar cal = Calendar.getInstance();
        	cal.setTime(qo.getEndTime());
        	cal.add(Calendar.DAY_OF_MONTH, 1);
        	qo.setEndTime(cal.getTime());
    	}
		List<WorkDetailVo> rltlist = this.baseMapper.queryWorkDetailList(qo);
		for(WorkDetailVo workdetail: rltlist) {
			int durationMinute = (int) ((workdetail.getWorkdetail().getEndtime().getTime() -
					workdetail.getWorkdetail().getStarttime().getTime())/(60*1000));
			workdetail.setDuration(durationMinute);
		}
		return rltlist;
	}


	@Override
	public List<WorkDetailSumDO> queryPaymentByCondition(Map<String, Object> cMap) {
		return this.baseMapper.queryPaymentByCondition(cMap);
	}
}
