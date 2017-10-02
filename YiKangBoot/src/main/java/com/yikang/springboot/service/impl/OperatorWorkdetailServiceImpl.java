package com.yikang.springboot.service.impl;

import com.yikang.springboot.qo.WorkDetailQO;
import com.yikang.springboot.vo.ProductlogWithProducecodeVO;
import com.yikang.springboot.vo.WorkDetailVo;
import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.OperatorWorkdetail;
import com.yikang.springboot.mapper.OperatorWorkdetailMapper;
import com.yikang.springboot.service.IOperatorWorkdetailService;

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
		return this.baseMapper.queryWorkDetailList(qo);
	}
}
