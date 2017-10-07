package com.yikang.springboot.service;

import java.util.List;

import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Batchno;
import com.yikang.springboot.qo.BatchnoQO;
import com.yikang.springboot.vo.BatchnoVO;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface IBatchnoService extends IVOService<Batchno> {

	public List<BatchnoVO> getBatchNoWithCondition(BatchnoQO qo);

	public List<KeyValue> getOptionsByLineId(Long lineId);
}
