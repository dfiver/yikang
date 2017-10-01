package com.yikang.springboot.controller;


import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.utils.BeanToMapUtil;
import com.yikang.springboot.entity.Mode;
import com.yikang.springboot.entity.Porductlog;
import com.yikang.springboot.entity.Reason;
import com.yikang.springboot.entity.Stopreasonlog;
import com.yikang.springboot.qo.ProductAndStopQueryQO;
import com.yikang.springboot.service.IModeService;
import com.yikang.springboot.service.IReasonService;
import com.yikang.springboot.service.IStopreasonlogService;
import com.yikang.springboot.vo.ProductlogWithProducecodeVO;
import com.yikang.springboot.vo.StopreaonlogWithModeVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/stopreasonlog")
public class StopreasonlogController extends BaseController<Stopreasonlog, IStopreasonlogService> {

	@Autowired
	IReasonService resonService;
	
	@Autowired
	IModeService modeService;
	
	@Override
	public JsonResult save(@RequestBody Stopreasonlog entity){
		boolean insertRlt = entity.insertOrUpdate();
		if(insertRlt){
			return this.getById(entity.getId());
		}
		return renderError();
	}
	
	@RequestMapping("/batchsave")
	@ResponseBody
	public JsonResult batchSave(@RequestBody Stopreasonlog[] entityArray){
		int success=0, error=0;
		for(Stopreasonlog entity: entityArray){
			if(entity.insertOrUpdate())
				++success;
			else
				++error;
		}
		final int total = entityArray.length;
		final int successNum = success;
		final int errorNum = error;
		return renderSuccess("批量保存完成").setObj(new HashMap<String, Integer>(){{
			put("total", total);
			put("success", successNum);
			put("error", errorNum);
		}});
	}
	
	@RequestMapping("/list/query")
	@ResponseBody
	JsonResult queryByCondition(@RequestParam Long shiftId, 
			@RequestParam String date,
			@RequestParam String lineId){
		Map<String, Object> cMap = new HashMap<String, Object>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		Date beginTime;
		try {
			beginTime = sf.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
			return renderError().setMsg(e.getMessage());
		}
		Calendar ca = Calendar.getInstance();
		ca.setTime(beginTime);
		ca.add(Calendar.DAY_OF_MONTH, 1);
		Date endTime = ca.getTime();
		cMap.put("beginTime", beginTime);
		cMap.put("endTime", endTime);
		cMap.put("shiftId", shiftId);
		cMap.put("lineId", lineId);
		List<StopreaonlogWithModeVO> rltlist = service.queryByCondition(cMap);
		return renderSuccess().setObj(rltlist);
	}
	
	@RequestMapping("/query")
	@ResponseBody
	JsonResult queryStopResonListByCondition(@RequestBody ProductAndStopQueryQO condition){
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		
		try {
			conditionMap = BeanToMapUtil.convertBean(condition);
		} catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
			e.printStackTrace();
			return renderError().setMsg(e.getMessage());
		}
		List<StopreaonlogWithModeVO> rltList = service.queryByCondition(conditionMap);		
		return renderSuccess().setObj(rltList);
	}
	
	@RequestMapping("/get")
	@ResponseBody
	JsonResult getById(@RequestParam Long id){
		Stopreasonlog stopreasonlog = service.selectById(id);
		Long reasonId = stopreasonlog.getReasonId();
		Reason reason = resonService.selectById(reasonId);
		Long modeId = reason.getModeId();
		Mode mode = modeService.selectById(modeId);
		
		StopreaonlogWithModeVO vo = new StopreaonlogWithModeVO();
		vo.setStopreasonlog(stopreasonlog);
		vo.setMode(mode);
		vo.setReason(reason);
		return renderSuccess().setObj(vo);
	}
}
