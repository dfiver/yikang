package com.yikang.springboot.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Batchno;
import com.yikang.springboot.entity.Productcode;
import com.yikang.springboot.qo.BatchnoQO;
import com.yikang.springboot.service.IBatchnoService;
import com.yikang.springboot.service.IProductcodeService;
import com.yikang.springboot.vo.BatchnoVO;
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
	
	/**
	 * 生产信息提交界面(CommitProductInfo)用到，根据生产线获取批次号
	 * @param id
	 * @return
	 */	
	@RequestMapping("/options/list")
	@ResponseBody
	public JsonResult getOptionsByLineId(@RequestParam Long lineId){
		return renderSuccess().setObj(service.getOptionsByLineId(lineId));
	}
	
	/**
	 * 生产信息提交界面(CommitProductInfo)用到，根据生产编号获取批次号
	 * @param id
	 * @return
	 */	
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
	
	@RequestMapping("/state/options")
	@ResponseBody
	public JsonResult getStateOptions() {
		List<KeyValue> rltList = new ArrayList<KeyValue>() {{
			add(new KeyValue(0L, "新建"));
			add(new KeyValue(1L, "生产中"));
			add(new KeyValue(2L, "完成"));
		}};
		return renderSuccess(rltList);
	}
	
	@Override
	public Object getAll() {
		BatchnoQO condition = new BatchnoQO();
		List<BatchnoVO> rltlist = service.getBatchNoWithCondition(condition);					
		return rltlist;
	}
	
	@RequestMapping("/query")
	@ResponseBody
	public JsonResult getBatchNoWithCondition(@RequestBody(required=false) BatchnoQO condition){
			List<BatchnoVO> rltlist = service.getBatchNoWithCondition(condition);			
			return renderSuccess(rltlist);
	}
	
	/**
	 * 理论上已完成和进行中是不能删除的，这部分交给前台控制
	 */
	@Override
	public JsonResult del(@RequestParam Long id){
		//TODO：已完成和进行中是不能删除的，后台添加判断
		return super.del(id);
	}
}
