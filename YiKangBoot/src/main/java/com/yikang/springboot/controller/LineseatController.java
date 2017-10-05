package com.yikang.springboot.controller;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.entity.Lineseat;
import com.yikang.springboot.service.ILineseatService;
import com.yikang.springboot.vo.LineseatVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/lineseat")
public class LineseatController extends OptionalDataController<Lineseat, ILineseatService> {

	/**
	 * 获取某条产线的坐席数量
	 * 考虑到暂时使用这种简单粗暴的方式,使用通用sql获取结果，然后手动过滤到不符合条件的。如果数据量大，可能存在问题。
	 * 目前估算数据量很难过千，因此应该不存在问题。
	 * @param lineId
	 * @return
	 */
	private List<LineseatVO> getSeatListByLineId(Long lineId){
		List<LineseatVO> seatList = (List<LineseatVO>) this.service.getListViewList();
		List<LineseatVO> rltList = new ArrayList<LineseatVO>();
		for(LineseatVO seat : seatList){
			if(seat.getLineId().equals(lineId)){
				rltList.add(seat);
			}
		}
		return rltList;
	}
	
	@RequestMapping("/{lineId}/list")
	@ResponseBody
	public JsonResult listLineseat(@PathVariable Long lineId){			

		return renderSuccess().setObj(getSeatListByLineId(lineId));
	}	
	
	@RequestMapping("/{lineId}/del")
	@ResponseBody
	public JsonResult del(@RequestParam Long id, @PathVariable Long lineId){
		if(id != null){
			return (service.deleteById(id)?renderSuccess():renderError())
					.setObj(getSeatListByLineId(lineId));
		}
		else{
			return renderError()
					.setObj(getSeatListByLineId(lineId));
		}
	}
	
	@RequestMapping("/{lineId}/save")
	@ResponseBody
	public JsonResult save(@RequestBody Lineseat entity, @PathVariable Long lineId){
		entity.setLineId(lineId);
		return (entity.insertOrUpdate()?renderSuccess():renderError())
				.setObj(getSeatListByLineId(lineId));
	}
	
}
