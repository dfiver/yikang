package com.yikang.springboot.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Batchno;
import com.yikang.springboot.entity.Productcode;
import com.yikang.springboot.service.IBatchnoService;
import com.yikang.springboot.service.IProductcodeService;
import com.yikang.springboot.vo.BatchnoWithProductCodeVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/batchno")
public class BatchnoController extends OptionalDataController<Batchno, IBatchnoService> {
	
	@Autowired
	IProductcodeService productcodeService;
	
	@RequestMapping("/options/list")
	@ResponseBody
	public JsonResult getOptionsByLineId(@RequestParam Long lineId){
		return renderSuccess().setObj(service.getOptionsByLineId(lineId));
	}
	
	@RequestMapping("/getwithpcode")
	@ResponseBody
	public JsonResult getBatchnoWithProductCode(@RequestParam Long id){
		Batchno bn = service.selectById(id);
		Productcode pc = productcodeService.selectById(bn.getProductcodeId());
		BatchnoWithProductCodeVO bpVO = new BatchnoWithProductCodeVO();
		bpVO.setBatchno(bn);
		bpVO.setProductcode(pc);
		return renderSuccess().setObj(bpVO);
		
	}
	
	@RequestMapping("/{state}/workshop/{workshopId}/productfamily/{familyId}/list")
	@ResponseBody
	public JsonResult getBatchNoWithoutProductCode(
			@PathVariable Integer state,
			@PathVariable Long workshopId,
			@PathVariable Long familyId){
			Map<String, Object> conditions = new HashMap<>();
			conditions.put("state", state);
			conditions.put("workshopId", workshopId);
			conditions.put("familyId", familyId);
			Object rlt = service.getBatchNoWithCondition(conditions);			
			return renderSuccess(rlt);
	}
	
	/**
	 * 理论上已完成和进行中是不能删除的，这部分交给前台控制
	 */
	@RequestMapping("/**/del")
	@ResponseBody
	public JsonResult del(@RequestParam Long id){
		return super.del(id);
	}
	
	@RequestMapping("/{state}/**/productcode/{productcodeId}/list")
	@ResponseBody
	public JsonResult getBatchNoWithProductCode(
			@PathVariable Integer state,
			@PathVariable Long productcodeId){
		Map<String, Object> conditions = new HashMap<>();
		conditions.put("state", state);
		conditions.put("productcodeId", productcodeId);
		Object rlt = service.getBatchNoWithCondition(conditions);			
		return renderSuccess(rlt);
	}	
	
	@RequestMapping("/{state}/workshop/{workshopId}/productfamily/{familyId}/save")
	@ResponseBody
	public JsonResult save(@RequestBody Batchno batchNo,
						@PathVariable Integer state,
						@PathVariable Long workshopId,
						@PathVariable Long familyId){		
		if(batchNo.getState() == null){
			batchNo.setState(state);
		}
		boolean success = service.insertOrUpdate(batchNo);
		Map<String, Object> conditions = new HashMap<>();
		conditions.put("state", state);
		conditions.put("workshopId", workshopId);
		conditions.put("familyId", familyId);
		Object rlt = service.getBatchNoWithCondition(conditions);
		if(success)
			return renderSuccess(rlt);
		else
			return renderError().setObj(rlt);
	}
	
	@RequestMapping("/{state}/**/productcode/{productcodeId}/save")	
	@ResponseBody
	public JsonResult save(@RequestBody Batchno batchNo,
						@PathVariable Integer state,
						@PathVariable Long productcodeId){			
		if(batchNo.getState() == null){
			batchNo.setState(state);
		}
		boolean success = service.insertOrUpdate(batchNo);
		Map<String, Object> conditions = new HashMap<>();
		conditions.put("state", state);
		conditions.put("productcodeId", productcodeId);
		Object rlt = service.getBatchNoWithCondition(conditions);
		if(success)
			return renderSuccess(rlt);
		else
			return renderError().setObj(rlt);
	}
}
