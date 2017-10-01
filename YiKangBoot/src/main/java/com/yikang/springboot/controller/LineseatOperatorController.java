package com.yikang.springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yikang.springboot.entity.LineseatOperator;
import com.yikang.springboot.service.ILineseatOperatorService;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author WuHonglin
 * @since 2017-09-30
 */
@Controller
@RequestMapping("/data/lineseatOperator")
public class LineseatOperatorController extends BaseController<LineseatOperator, ILineseatOperatorService> {
	
}
