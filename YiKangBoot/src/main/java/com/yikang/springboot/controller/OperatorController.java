package com.yikang.springboot.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.entity.Operator;
import com.yikang.springboot.service.IOperatorService;
import com.yikang.springboot.vo.OperatorVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/operator")
public class OperatorController extends BaseController<Operator, IOperatorService> {
	@RequestMapping("/querylist")
	@ResponseBody
	JsonResult getOperatorByCondition(@RequestParam String name,
			@RequestParam Long shift,
			@RequestParam String comment ){
		Map<String, Object> conditions = new HashMap<>();
		conditions.put("name", name);
		conditions.put("shift", shift);
		conditions.put("comment", comment);
		List<OperatorVO> oprList = service.getOperatorByCondition(conditions);
		return renderSuccess(oprList);
	}
	
	@RequestMapping("/detail/save")
	@ResponseBody
	JsonResult saveOperator(@RequestBody Operator operator){
		boolean rlt = service.insertOrUpdate(operator);
		if(rlt){
			return renderSuccess(operator);
		}
		else{
			return renderError().setObj(operator);
		}
	}
	
	@RequestMapping("/detail/get")
	@ResponseBody
	JsonResult saveOperator(@RequestParam Long operatorId){
		Operator operator = service.selectById(operatorId);
		if(operator != null){
			return renderSuccess(operator);
		}
		else{
			return renderError();
		}
	}
}
