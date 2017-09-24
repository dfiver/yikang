package com.yikang.springboot.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;

@Controller
@RequestMapping("/data/utils")
public class UtilsController {
	
	private final int EXPIRED_YEAR = 1;
	
	@RequestMapping("/current/date")
	@ResponseBody
	JsonResult getCurrentDate(){
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		String currentDate = sf.format(new Date());
		JsonResult result = new JsonResult();
		result.setSuccess(true);
		result.setObj(currentDate);
		return result;
	}
	
	@RequestMapping("/current/time")
	@ResponseBody
	JsonResult getCurrentTime(){
		SimpleDateFormat sf = new SimpleDateFormat("HH-mm-ss");
		String currentDate = sf.format(new Date());
		JsonResult result = new JsonResult();
		result.setSuccess(true);
		result.setObj(currentDate);
		return result;
	}
	
	@RequestMapping("/expired/datetime")
	@ResponseBody
	JsonResult getExpiredDateTime(){
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.set(Calendar.YEAR, calendar.get(Calendar.YEAR)+EXPIRED_YEAR);
		String currentDate = sf.format(calendar.getTime());
		JsonResult result = new JsonResult();
		result.setSuccess(true);
		result.setObj(currentDate);
		return result;
	}
	
	@RequestMapping("/expired/date")
	@ResponseBody
	JsonResult getExpiredDate(){
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.set(Calendar.YEAR, calendar.get(Calendar.YEAR)+EXPIRED_YEAR);
		String currentDate = sf.format(calendar.getTime());
		JsonResult result = new JsonResult();
		result.setSuccess(true);
		result.setObj(currentDate);
		return result;
	}
}
