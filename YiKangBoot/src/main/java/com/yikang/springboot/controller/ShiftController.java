package com.yikang.springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yikang.springboot.entity.Shift;
import com.yikang.springboot.service.IShiftService;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/shift")
public class ShiftController extends OptionalDataController<Shift, IShiftService> {
	
}
