package com.yikang.springboot.mapper;

import com.yikang.springboot.entity.OperatorWorkdetail;
import com.yikang.springboot.common.SuperMapper;
import com.yikang.springboot.qo.WorkDetailQO;
import com.yikang.springboot.vo.WorkDetailSumDO;
import com.yikang.springboot.vo.WorkDetailVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface OperatorWorkdetailMapper extends SuperMapper<OperatorWorkdetail> {

    List<WorkDetailVo> queryWorkDetailList(WorkDetailQO qo);
	List<WorkDetailSumDO> queryPaymentByCondition(Map<String, Object> cMap);

}