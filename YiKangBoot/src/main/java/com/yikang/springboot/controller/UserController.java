package com.yikang.springboot.controller;


import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.entity.Role;
import com.yikang.springboot.entity.User;
import com.yikang.springboot.service.IRoleService;
import com.yikang.springboot.service.IUserService;
import com.yikang.springboot.service.impl.RoleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import com.yikang.springboot.controller.BaseController;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-24
 */
@Controller
@RequestMapping("/data/user")
public class UserController extends BaseController<User,IUserService> {

    @Autowired
    private IRoleService roleService ;

    @RequestMapping("login")
    @ResponseBody
    public JsonResult login(@RequestBody User entity){
        if(entity.getUsername().trim().length()<=0){
            return renderError("用户名不能为空。");
        }
        if(entity.getPasswd().trim().length()<=0){
            return renderError("密码不能为空。");
        }
        EntityWrapper ew = new EntityWrapper<User>();
        ew.setEntity(entity);
        User u = service.selectOne(ew);
        if(u==null){
            return renderError("用户名或者密码错误。");
        }
        Role role = roleService.selectById(u.getRoleId());
        Map<String,Object> result = new HashMap<>();
        result.put("user",u);
        result.put("role",role);
        return (u!=null?renderSuccess(result):renderError());
    }

    @RequestMapping("save")
    @ResponseBody
    public JsonResult save(@RequestBody User entity){
        entity.setPasswd("123456");
        return super.save(entity);
    }
}
