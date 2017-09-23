package com.yikang.springboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.common.OptionalEntity;
import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.service.IVOService;

public class OptionalDataController<T extends OptionalEntity<T>, TService extends IVOService<T>> 
									extends BaseController<T, TService> {
	@RequestMapping("options")
	@ResponseBody
	public JsonResult getOptions(){
		List<T> entitys = service.selectList((new EntityWrapper<T>()));
		List<KeyValue> rlt = new ArrayList<KeyValue>();
		for(T entity: entitys){
			rlt.add(entity.option());
		}
		return renderSuccess().setObj(rlt);
	}
}
