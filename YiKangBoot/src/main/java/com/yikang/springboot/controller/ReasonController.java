package com.yikang.springboot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.entity.Mode;
import com.yikang.springboot.entity.Reason;
import com.yikang.springboot.qo.ProductAndStopQueryQO;
import com.yikang.springboot.service.IModeService;
import com.yikang.springboot.service.IReasonService;
import com.yikang.springboot.vo.ReasonVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/reason")
public class ReasonController extends OptionalDataController<Reason, IReasonService> {
	
	@Autowired
	IModeService modeService;
	
	@Override
	public Object getAll(){
		return this.service.getListViewList();
	}
	
	@RequestMapping("/get")
	@ResponseBody
	JsonResult getStopReasonById(@RequestParam Long id){
		Reason reason = service.selectById(id);
		Long modeId = reason.getModeId();
		Mode mode = modeService.selectById(modeId);
		ReasonVO vo = new ReasonVO();
		vo.setId(reason.getId());
		vo.setComment(reason.getComment());
		vo.setModeId(reason.getModeId());
		vo.setName(reason.getName());
		vo.setMode(mode.option());
		return renderSuccess().setObj(vo);	
	}
	
	@RequestMapping("/query")
	@ResponseBody
	JsonResult queryByCondition(@RequestBody ProductAndStopQueryQO condition){
		return null;
	}
}
