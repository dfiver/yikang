package com.yikang.springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.entity.Dict;
import com.yikang.springboot.service.IDictService;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/dict")
public class DictController extends BaseController<Dict, IDictService> {

	@RequestMapping("queryjobbonus")
	@ResponseBody
	public JsonResult queryJobBonus(@RequestBody Dict entity){
		Dict bonus = service.selectOne(new EntityWrapper<Dict>(entity));
		return renderSuccess(bonus);
	}

	@RequestMapping("savejobbonus")
	@ResponseBody
	public JsonResult saveJobBonus(@RequestBody Dict entity){
		return (entity.insertOrUpdate()?renderSuccess():renderError())
				.setObj(entity);
	}

	@RequestMapping("/star")
	@ResponseBody
	public JsonResult getStar(){
		Object rlt = service.selectOne(new EntityWrapper<Dict>().where("dict.key = 'stars'"));
		if(rlt != null){
			Dict stars = (Dict)rlt;
			Integer starNum =Integer.parseInt(stars.getValue());
			return renderSuccess(starNum);
		}
		else{
			return renderError();
		}
	}
	
	@RequestMapping("/star/save")
	@ResponseBody
	public JsonResult save(@RequestParam Integer num){
		if(num > 0 && num < 10){
			Object rlt = service.selectOne(new EntityWrapper<Dict>().where("dict.key = 'stars'"));
			if(rlt != null){
				Dict stars = (Dict)rlt;
				stars.setValue(num.toString());
				return service.updateById(stars)?renderSuccess(num):renderError();
			}
		}
		return renderError();
	}
}
