package com.yikang.springboot.mapper;

import java.util.List;
import java.util.Map;

import com.yikang.springboot.common.SuperMapper;
import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Batchno;
import com.yikang.springboot.qo.BatchnoQO;
import com.yikang.springboot.vo.BatchnoVO;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface BatchnoMapper extends SuperMapper<Batchno> {

	List<BatchnoVO> getBatchNoWithCondition(BatchnoQO qo);

	List<KeyValue> getOptionsByLineId(Map<String, Object> conditions);
}