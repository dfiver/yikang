package com.yikang.springboot.controller;


import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.utils.BeanToMapUtil;
import com.yikang.springboot.entity.Batchno;
import com.yikang.springboot.entity.Porductlog;
import com.yikang.springboot.entity.Productcode;
import com.yikang.springboot.qo.ProductAndStopQueryQO;
import com.yikang.springboot.service.IBatchnoService;
import com.yikang.springboot.service.IPorductlogService;
import com.yikang.springboot.service.IProductcodeService;
import com.yikang.springboot.vo.ProductlogWithProducecodeVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/porductlog")
public class PorductlogController extends BaseController<Porductlog, IPorductlogService> {
	
	@Autowired
	IBatchnoService batchnoService;
	
	@Autowired
	IProductcodeService productcodeService;
	
	@Override
	public JsonResult save(@RequestBody Porductlog entity){
		Porductlog condition = new Porductlog();
		condition.setLineId(entity.getLineId());
		condition.setStarttime(entity.getStarttime());
		condition.setEndtime(entity.getEndtime());
		condition.setDelflag(0);
		EntityWrapper<Porductlog> wrapper = new EntityWrapper<Porductlog>(condition);
		Porductlog productlog = service.selectOne(wrapper);
		if(productlog != null){
			return renderError().setMsg("该时段数据已存在");
		}
		
		boolean insertRlt = entity.insertOrUpdate();
		if(insertRlt){
			Long batchNoId = entity.getBatchnoId();
			Batchno batchNo = batchnoService.selectById(batchNoId);
			Long productcodeId = batchNo.getProductcodeId();
			Productcode productcode = productcodeService.selectById(productcodeId);
			ProductlogWithProducecodeVO rltVO = new ProductlogWithProducecodeVO();
			rltVO.setProductlog(entity);
			rltVO.setProductcode(productcode);
			rltVO.setBatchno(batchNo.option());
			return renderSuccess().setObj(rltVO);
		}
		return renderError();
	}
	
	@RequestMapping("/get")
	@ResponseBody
	public JsonResult getProductlogById(@RequestParam Long id){
		Porductlog entity = service.selectById(id);
		if(entity != null){
			Long batchNoId = entity.getBatchnoId();
			Batchno batchNo = batchnoService.selectById(batchNoId);
			Long productcodeId = batchNo.getProductcodeId();
			Productcode productcode = productcodeService.selectById(productcodeId);
			ProductlogWithProducecodeVO rltVO = new ProductlogWithProducecodeVO();
			rltVO.setProductlog(entity);
			rltVO.setProductcode(productcode);
			return renderSuccess().setObj(rltVO);
		}
		return renderError();
	}
	
	@RequestMapping("/list/query")
	@ResponseBody
	public JsonResult queryProductlogList(@RequestParam Long lineId, 
			@RequestParam Long shiftId,
			@RequestParam String date){
		List<ProductlogWithProducecodeVO> rltList;
		try {
			rltList = service.queryProductlogList(lineId, shiftId, date);
			return renderSuccess().setObj(rltList);
		} catch (ParseException e) {
			e.printStackTrace();
			return renderError().setMsg(e.getMessage());
		}
	}
	
	@RequestMapping("/query")
	@ResponseBody
	JsonResult queryByCondition(@RequestBody ProductAndStopQueryQO condition){
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		
		try {
			conditionMap = BeanToMapUtil.convertBean(condition);
		} catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
			e.printStackTrace();
			return renderError().setMsg(e.getMessage());
		}
		List<ProductlogWithProducecodeVO> rltList = service.queryReportListByCondition(conditionMap);		
		return renderSuccess().setObj(rltList);
	}

}
