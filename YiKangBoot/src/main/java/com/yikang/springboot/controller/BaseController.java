package com.yikang.springboot.controller;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.IService;
import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.service.IVOService;
import com.yikang.springboot.common.SuperEntity;

/**
 * Author: D.Yang
 * Email: koyangslash@gmail.com
 * Date: 16/10/9
 * Time: 下午1:37
 * Describe: 基础控制器
 */
public class BaseController<T extends SuperEntity<T>, Service extends IVOService<T>> {
    
	/**
     * 渲染失败数据
     *
     * @return result
     */
    protected JsonResult renderError() {
        JsonResult result = new JsonResult();
        result.setSuccess(false);
        result.setStatus("500");
        return result;
    }

    /**
     * 渲染失败数据（带消息）
     *
     * @param msg 需要返回的消息
     * @return result
     */
    protected JsonResult renderError(String msg) {
        JsonResult result = renderError();
        result.setMsg(msg);
        return result;
    }

    /**
     * 渲染成功数据
     *
     * @return result
     */
    protected JsonResult renderSuccess() {
        JsonResult result = new JsonResult();
        result.setSuccess(true);
        result.setStatus("200");
        return result;
    }

    /**
     * 渲染成功数据（带信息）
     *
     * @param msg 需要返回的信息
     * @return result
     */
    protected JsonResult renderSuccess(String msg) {
        JsonResult result = renderSuccess();
        result.setMsg(msg);
        return result;
    }

    /**
     * 渲染成功数据（带数据）
     *
     * @param obj 需要返回的对象
     * @return result
     */
    protected JsonResult renderSuccess(Object obj) {
        JsonResult result = renderSuccess();
        result.setObj(obj);
        return result;
    }
    
	@Autowired
	Service service;
	
	@RequestMapping("list")
	@ResponseBody
	public JsonResult list(){
			return renderSuccess().setObj(getAll());			
	}
	
	protected Object getAll(){
		return service.selectList((new EntityWrapper<T>()));
	}
		
	@RequestMapping("del")
	@ResponseBody
	public JsonResult del(@RequestParam Long id){
		if(id != null){
			return (service.deleteById(id)?renderSuccess():renderError())
					.setObj(getAll());
		}
		else{
			return renderError()
					.setObj(getAll());
		}		
	}
	
	@RequestMapping("save")
	@ResponseBody
	public JsonResult save(@RequestBody T entity){
		return (entity.insertOrUpdate()?renderSuccess():renderError())
				.setObj(getAll());
	}

    @RequestMapping("getbyid")
    @ResponseBody
    public JsonResult queryById(Long id){
        return (id!=null?renderSuccess(service.selectById(id)):renderError());
    }

}
