package com.yikang.springboot.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.yikang.springboot.entity.Porductlog;
import com.yikang.springboot.vo.ProductlogWithProducecodeVO;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface IPorductlogService extends IVOService<Porductlog> {

	List<ProductlogWithProducecodeVO> queryProductlogList(Long lineId, Long shiftId, String date) throws ParseException;

	List<ProductlogWithProducecodeVO> queryReportListByCondition(Map<String, Object> conditions);
	
}
