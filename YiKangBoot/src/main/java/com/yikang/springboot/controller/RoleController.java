package com.yikang.springboot.controller;


import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Role;
import com.yikang.springboot.service.IRoleService;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import com.yikang.springboot.controller.BaseController;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

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
public class RoleController extends OptionalDataController<Role,IRoleService> {

    @RequestMapping("kvs")
    @ResponseBody
    public JsonResult getAllPermissions(){
        List<KeyValue> rlt = new ArrayList<KeyValue>();
        rlt.add(new KeyValue(1l,"生产车间管理"));
        rlt.add(new KeyValue(2l,"产品家族管理"));
        rlt.add(new KeyValue(3l,"生产线管理"));
        rlt.add(new KeyValue(4l,"岗位类别管理"));
        rlt.add(new KeyValue(5l,"岗位技能及岗位级别管理"));
        rlt.add(new KeyValue(6l,"生产型号管理"));
        rlt.add(new KeyValue(7l,"批次号管理"));
        rlt.add(new KeyValue(8l,"停机原因类别管理"));
        rlt.add(new KeyValue(9l,"停机原因管理"));
        rlt.add(new KeyValue(10l,"用户管理"));
        rlt.add(new KeyValue(11l,"角色权限管理"));
        rlt.add(new KeyValue(12l,"操作人员管理"));
        rlt.add(new KeyValue(13l,"补贴数据设置"));
        rlt.add(new KeyValue(14l,"薪资管理"));
        rlt.add(new KeyValue(15l,"人员工作明细清单"));
        rlt.add(new KeyValue(16l,"生产信息管理"));
        rlt.add(new KeyValue(18l,"生产和停机信息列表"));
        rlt.add(new KeyValue(19l,"GAP图表"));
        return renderSuccess().setObj(rlt);
    }
}
