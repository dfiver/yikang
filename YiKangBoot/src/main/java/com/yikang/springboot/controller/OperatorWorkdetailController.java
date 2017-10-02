package com.yikang.springboot.controller;


import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.qo.WorkDetailQO;
import com.yikang.springboot.vo.WorkDetailVo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yikang.springboot.entity.OperatorWorkdetail;
import com.yikang.springboot.service.IOperatorWorkdetailService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/operatorWorkdetail")
public class OperatorWorkdetailController extends BaseController<OperatorWorkdetail, IOperatorWorkdetailService> {

    @RequestMapping("querydetail")
    @ResponseBody
    public JsonResult queryDetail(@RequestBody(required=false) WorkDetailQO workDetailqo){
        List<WorkDetailVo> detailList= service.queryWorkDetailByQO(workDetailqo);
        return renderSuccess().setObj(detailList);
    }

}
