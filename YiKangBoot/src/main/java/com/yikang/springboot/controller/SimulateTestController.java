package com.yikang.springboot.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.entity.Batchno;
import com.yikang.springboot.entity.Porductlog;
import com.yikang.springboot.entity.Shift;
import com.yikang.springboot.entity.Stopreasonlog;
import com.yikang.springboot.entity.Workshop;
import com.yikang.springboot.service.IBatchnoService;
import com.yikang.springboot.service.ILineService;
import com.yikang.springboot.service.IPorductlogService;
import com.yikang.springboot.service.IReasonService;
import com.yikang.springboot.service.IShiftService;
import com.yikang.springboot.service.IWorkshopService;
import com.yikang.springboot.vo.BatchnoVO;
import com.yikang.springboot.vo.LineVO;
import com.yikang.springboot.vo.ReasonVO;

@Controller
public class SimulateTestController {

	@Autowired
	ILineService lineService;
	
	@Autowired
	IShiftService shiftService;
	
	@Autowired
	IReasonService reasonService;
	
	@Autowired
	IPorductlogService porductlogService;
	
	@Autowired
	IBatchnoService batchnoService;
	
	@Autowired
	IWorkshopService workshopService;
	
	@RequestMapping("/test/simulatedata/productlog")
	@ResponseBody
	 JsonResult simulateProductLog() {
		List<LineVO> lineList = (List<LineVO>) lineService.getListViewList();
		List<Shift> shiftList = (List<Shift>) shiftService.getListViewList();
		List<Workshop> workshopList = (List<Workshop>) workshopService.getListViewList();
		List<BatchnoVO> batchnoList = (List<BatchnoVO>)batchnoService.getBatchNoWithCondition(new HashMap<String,Object>());
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		Long beginTimeStamp = calendar.getTime().getTime();
		int period = 3600*1000;
		
		
		for(int i=0; i<24; ++i) {
			for(Workshop workshop: workshopList) {
				for(LineVO line: lineList) {
					if(line.getWorkshopId().equals(workshop.getId())) {
						for(BatchnoVO batchno: batchnoList) {
							if(batchno.getWorkshop().getKey().equals(workshop.getId())) {
								for(Shift shift: shiftList) {
									Random random = new Random();
									Porductlog productLog = new Porductlog();
									productLog.setLineId(line.getId());
									productLog.setShiftId(shift.getId());
									productLog.setStarttime(new Date(beginTimeStamp));
									productLog.setEndtime(new Date(beginTimeStamp+period));
									productLog.setBatchnoId(batchno.getId());
									productLog.setDone(100+random.nextInt(10));				
									productLog.setCrap(random.nextInt(10));
									productLog.setRework(random.nextInt(10));
									productLog.insert();
								}
							}
						}
					}
				}
			}
			beginTimeStamp += period;			
		}
		JsonResult rlt = new JsonResult();
		rlt.setSuccess(true);
		rlt.setMsg("生产日志数据制造完毕");
		return rlt;
	}
	
	@RequestMapping("/test/simulatedata/reasonlog")
	@ResponseBody
	 JsonResult simulateReasonLog() {
		List<LineVO> lineList = (List<LineVO>) lineService.getListViewList();
		List<Shift> shiftList = (List<Shift>) shiftService.getListViewList();
		List<ReasonVO> reasonList = (List<ReasonVO>) reasonService.getListViewList();
		
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		Long beginTimeStamp = calendar.getTime().getTime();
		
		int period = 3600*1000;
		
		
		for(LineVO line: lineList) {
			for(Shift shift: shiftList) {
				for(ReasonVO reason: reasonList) {
					long tempBeginTimStamp = beginTimeStamp.longValue();
					for(int i=0; i<24; ++i) {
						int timeA = new Random().nextInt(period);
						int timeB = new Random().nextInt(period);
						Date beginTime = new Date(tempBeginTimStamp+Math.min(timeA, timeB));
						Date endTime = new Date(tempBeginTimStamp+Math.max(timeA, timeB));
						Stopreasonlog reasonlog = new Stopreasonlog();
						reasonlog.setLineId(line.getId());
						reasonlog.setShiftId(shift.getId());
						reasonlog.setReasonId(reason.getId());
						reasonlog.setStarttime(beginTime);
						reasonlog.setEndtime(endTime);
						reasonlog.insert();
						tempBeginTimStamp += 3600*1000;
					}
				}
			}
		}
		JsonResult rlt = new JsonResult();
		rlt.setSuccess(true);
		rlt.setMsg("故障日志数据制造完毕");
		return rlt;		
	}
}
