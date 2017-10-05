package com.yikang.springboot.service;

import java.util.List;
import java.util.Map;

import com.yikang.springboot.entity.OperatorWorkdetail;
import com.yikang.springboot.qo.WorkDetailQO;
import com.yikang.springboot.vo.WorkDetailSumDO;
import com.yikang.springboot.vo.WorkDetailVo;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface IOperatorWorkdetailService extends IVOService<OperatorWorkdetail> {

    public List<WorkDetailVo> queryWorkDetailByQO(WorkDetailQO qo);

	public List<WorkDetailSumDO> queryPaymentByCondition(Map<String, Object> cMap);
}
