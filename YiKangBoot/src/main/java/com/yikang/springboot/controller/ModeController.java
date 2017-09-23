package com.yikang.springboot.controller;


import org.springframework.web.bind.annotation.RequestMapping;

import com.yikang.springboot.entity.Mode;
import com.yikang.springboot.service.IModeService;

import org.springframework.stereotype.Controller;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/mode")
public class ModeController extends OptionalDataController<Mode, IModeService> {
	
}
