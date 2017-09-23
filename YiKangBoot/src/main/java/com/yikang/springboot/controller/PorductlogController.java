package com.yikang.springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yikang.springboot.entity.Porductlog;
import com.yikang.springboot.service.IPorductlogService;

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
	
}
