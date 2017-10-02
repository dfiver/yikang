package com.yikang.springboot.controller;


import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.utils.BeanToMapUtil;
import com.yikang.springboot.entity.Mode;
import com.yikang.springboot.entity.Reason;
import com.yikang.springboot.entity.Stopreasonlog;
import com.yikang.springboot.qo.ProductAndStopQueryQO;
import com.yikang.springboot.service.IModeService;
import com.yikang.springboot.service.IReasonService;
import com.yikang.springboot.service.IStopreasonlogService;
import com.yikang.springboot.vo.ReasonVO;
import com.yikang.springboot.vo.StopreaonlogStatVO;
import com.yikang.springboot.vo.StopreaonlogTimeDO;
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
	
	@RequestMapping("/querysum/today")
	@ResponseBody
	JsonResult querySumToday(@RequestParam Long lineId) {
		List<Mode> modeList = (List<Mode>) modeService.getListViewList();
		List<ReasonVO> reasonList = (List<ReasonVO>) resonService.getListViewList();

		//计算当天日期
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		Date beginTime = calendar.getTime();
		calendar.add(Calendar.DAY_OF_MONTH, 1);
		Date endTime = calendar.getTime();
		
		//查询得到秒数
		Map<String, Object> cMap = new HashMap<String, Object>();
		cMap.put("beginTime", beginTime);
		cMap.put("endTime", endTime);
		cMap.put("lineId", lineId);
		List<StopreaonlogTimeDO> sumSecList = this.service.selectSumsecGroupbyReason(cMap);
		
		//创建统计数据结构
		Map<Long, String> modeNameMap = new HashMap<Long, String>();
		Map<Long, String> reasonNameMap = new HashMap<Long, String>();
		Map<Long, Set<Long>> shuffleModeMap = new HashMap<Long, Set<Long>>(); 
		Map<Long, Integer> shuffleReasonMap = new HashMap<Long, Integer>(); 
		for(Mode mode: modeList) {
			shuffleModeMap.put(mode.getId(), new HashSet<Long>());
			modeNameMap.put(mode.getId(), mode.getName());
		}
		for(ReasonVO reason: reasonList) {
			shuffleModeMap.get(reason.getMode().getKey()).add(reason.getId());
			reasonNameMap.put(reason.getId(), reason.getName());
		}
		for(StopreaonlogTimeDO timeDO: sumSecList) {
			shuffleReasonMap.put(timeDO.getReasonId(), timeDO.getSecond());
		}
		
		//统计故障类别的停机时间		
		List<StopreaonlogStatVO> modeDataList = new ArrayList<StopreaonlogStatVO>();
		Map<String, List<StopreaonlogStatVO>> reasonListMap = new HashMap<String, List<StopreaonlogStatVO>>();
		
		int sumSec = 0;
		for(Entry<Long, Set<Long>> modeEntry:shuffleModeMap.entrySet()) {
			int modeSumSec = 0;
			String modeName = modeNameMap.get(modeEntry.getKey());
			List<StopreaonlogStatVO> reasonDataList = new ArrayList<StopreaonlogStatVO>();
			for(Long reasonId:modeEntry.getValue()) {
				if(shuffleReasonMap.get(reasonId) != null) {
					modeSumSec += shuffleReasonMap.get(reasonId).intValue();
					StopreaonlogStatVO reasonVO = new StopreaonlogStatVO();
					reasonVO.setName(reasonNameMap.get(reasonId));
					reasonVO.setMinute(shuffleReasonMap.get(reasonId).intValue()/60);
					reasonDataList.add(reasonVO);
				}
			}
			sumSec += modeSumSec;
			int modeMinute = modeSumSec/60;
			for(StopreaonlogStatVO reasonVO: reasonDataList) {
				int minute = reasonVO.getMinute();
				float sum = modeMinute;
				float percent = minute*100/sum;
				reasonVO.setPercent(percent);
			}
			//结果中故障原因明细的部分
			reasonListMap.put(modeName, reasonDataList);
			
			StopreaonlogStatVO modeVO = new StopreaonlogStatVO();
			modeVO.setName(modeNameMap.get(modeEntry.getKey()));
			modeVO.setMinute(modeMinute);
			//结果中故障类别统计部分
			modeDataList.add(modeVO);
		}
		int sumMinute = sumSec/60;
		for(StopreaonlogStatVO modeVO: modeDataList) {
			int minute = modeVO.getMinute();
			float sum = sumMinute;
			float percent = minute*100/sum;
			modeVO.setPercent(percent);
		}
		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap.put("modeDataList", modeDataList);
		resultMap.put("reasonListMap", reasonListMap);
		
		return renderSuccess().setObj(resultMap);
		
	}
}
