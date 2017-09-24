package com.yikang.springboot.controller;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.entity.OperatorJoblevel;
import com.yikang.springboot.service.IOperatorJoblevelService;
import com.yikang.springboot.vo.OperatorJoblevelVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/operatorJoblevel")
public class OperatorJoblevelController extends BaseController<OperatorJoblevel, IOperatorJoblevelService> {
	
	@RequestMapping("/{operatorId}/list")
	@ResponseBody
	public JsonResult getOperatorJoblevel(@PathVariable Long operatorId){
		List<OperatorJoblevelVO> rltList = service.getListViewListByOperatorId(operatorId); 
		return renderSuccess().setObj(rltList);
	}
	
	@RequestMapping("/{operatorId}/del")
	@ResponseBody
	public JsonResult del(@PathVariable Long operatorId, @RequestParam Long id){
		if(id != null){
			return (service.deleteById(id)?renderSuccess():renderError())
					.setObj(service.getListViewListByOperatorId(operatorId));
		}
		else{
			return renderError()
					.setObj(service.getListViewListByOperatorId(operatorId));
		}
	}
	
	@RequestMapping("/{operatorId}/save")
	@ResponseBody
	JsonResult add(@PathVariable Long operatorId,
			@RequestBody OperatorJoblevel operatorJoblevel){
		return (operatorJoblevel.insertOrUpdate()?renderSuccess():renderError())
				.setObj(service.getListViewListByOperatorId(operatorId));
	}
}
