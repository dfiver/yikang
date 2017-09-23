package com.yikang.springboot.controller;


import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.entity.Line;
import com.yikang.springboot.service.ILineService;
import com.yikang.springboot.vo.LineVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/line")
public class LineController extends OptionalDataController<Line, ILineService> {
	
	@Override
	public Object getAll(){
		return this.service.getListViewList();
	}
}
