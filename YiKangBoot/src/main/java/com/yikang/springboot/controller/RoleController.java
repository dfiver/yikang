package com.yikang.springboot.controller;


import com.yikang.springboot.entity.Role;
import com.yikang.springboot.service.IRoleService;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import com.yikang.springboot.controller.BaseController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-24
 */
@Controller
@RequestMapping("/data/role")
public class RoleController extends BaseController<Role,IRoleService> {
	
}
