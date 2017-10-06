package com.yikang.springboot.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.utils.DateUtil;
import com.yikang.springboot.common.utils.StringUtil;
import com.yikang.springboot.entity.Dict;
import com.yikang.springboot.entity.Joblevel;
import com.yikang.springboot.entity.PaymentQO;
import com.yikang.springboot.service.IDictService;
import com.yikang.springboot.service.IJobService;
import com.yikang.springboot.service.IJoblevelService;
import com.yikang.springboot.service.IOperatorService;
import com.yikang.springboot.service.IOperatorWorkdetailService;
import com.yikang.springboot.vo.BonusSumDO;
import com.yikang.springboot.vo.BonusSumVO;
import com.yikang.springboot.vo.JobVO;
import com.yikang.springboot.vo.OperatorJoblevelVO;
import com.yikang.springboot.vo.OperatorVO;
import com.yikang.springboot.vo.WorkDetailSumDO;

/**
 * 星级补贴数据结构
 * @author xk
 *
 */
class StarBonus{
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getSeq() {
		return seq;
	}
	public void setSeq(Integer seq) {
		this.seq = seq;
	}
	public String getBonus() {
		return bonus;
	}
	public void setBonus(String bonus) {
		this.bonus = bonus;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getEditing() {
		return editing;
	}
	public void setEditing(String editing) {
		this.editing = editing;
	}
	private String name;
	private Integer seq;
	private String bonus;
	private String comment;
	private String editing;
};

class JobBonus{
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBonus() {
		return bonus;
	}
	public void setBonus(String bonus) {
		this.bonus = bonus;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public boolean isEditing() {
		return editing;
	}
	public void setEditing(boolean editing) {
		this.editing = editing;
	}
	private String name;
	private String bonus;
	private String comment;
	private boolean editing;
}

@Controller
@RequestMapping("/data/pay")
public class PayController {
	//单个操作员，最多计算8项星级补助之和
	public static int OPERATOR_STARLEVELS_MAX = 8;
	//单个操作员，星级补助之和不超过300元
	public static int OPERATOR_STARBONUS_MAX = 300;
	
	@Autowired
	IJobService jobService;
	
	@Autowired
	IJoblevelService jobLevelService;
	
	@Autowired
	IOperatorWorkdetailService workdetailService;
	
	@Autowired
	IDictService dictService;
	
	@Autowired
	IOperatorService operatorService;
	
	
	@RequestMapping("/query")
	@ResponseBody
	JsonResult queryPaymentByCondition(@RequestBody PaymentQO conditions) {
		JsonResult rlt = new JsonResult();
		List<Joblevel> jobLevels = jobLevelService.selectList((new EntityWrapper<Joblevel>()));
		List<JobVO> jobs = (List<JobVO>) jobService.getListViewList();
		Map<Long, JobVO> jobsMap = new HashMap<Long, JobVO>();
		for(JobVO jobvo: jobs) {
			jobsMap.put(jobvo.getId(), jobvo);
		}
		
		Map<Long, BonusSumDO> opr_BonusDOMap = new HashMap<Long, BonusSumDO>();
		
		/*==================================获取配置参数（星级补贴、小时补贴、月补贴）=======================================*/
		//小时补贴
		Map<String, Float> hourBonusMap = new HashMap<String, Float>();
		Dict dictHourBonus = dictService.selectOne(new EntityWrapper<Dict>().where("dict.catagery=2 and dict.key = 'hour'"));
		String hourBonusJson = dictHourBonus.getValue();
		if(StringUtil.isNotEmpty(hourBonusJson)) {
			List<JobBonus> hourBonusList = JSON.parseArray(hourBonusJson, JobBonus.class);
			for(JobBonus hourBonus: hourBonusList) {
				Float bonusValue = Float.parseFloat(hourBonus.getBonus());
				hourBonusMap.put(hourBonus.getName(), bonusValue);
			}
		}		
		
		//月补贴
		Map<String, Float> monthBonusMap = new HashMap<String, Float>();
		Dict dictMonthBonus = dictService.selectOne(new EntityWrapper<Dict>().where("dict.catagery=2 and dict.key = 'month'"));
		String monthBonusJson = dictMonthBonus.getValue();
		if(StringUtil.isNotEmpty(monthBonusJson)) {
			List<JobBonus> monthBonusList = JSON.parseArray(monthBonusJson, JobBonus.class);
			for(JobBonus monthBonus: monthBonusList) {
				Float bonusValue = Float.parseFloat(monthBonus.getBonus());
				monthBonusMap.put(monthBonus.getName(), bonusValue);
			}
		}
		
		//星级补贴
		Map<String, Map<Integer, Float>> starBonusMap = new HashMap<String, Map<Integer, Float>>();
		Dict dictStarBonus = dictService.selectOne(new EntityWrapper<Dict>().where("dict.catagery=2 and dict.key = 'star'"));
		String starBonusJson = dictStarBonus.getValue();
		if(StringUtil.isNotEmpty(starBonusJson)) {
			List<StarBonus> starBonusList = JSON.parseArray(dictStarBonus.getValue(), StarBonus.class);
			for(StarBonus starBonus: starBonusList) {
				if(!starBonusMap.containsKey(starBonus.getName())) {
					starBonusMap.put(starBonus.getName(), new HashMap<Integer, Float>());
				}
				Float bonusValue = Float.parseFloat(starBonus.getBonus());
				starBonusMap.get(starBonus.getName()).put(starBonus.getSeq(), bonusValue);
			}
		}
		
		/*===============================从员工工作明细表获取当月工作时间（秒）================================================*/
		Map<String, Object> cMap = new HashMap<String, Object>();
		if(conditions.getEmployeeId() != null) {
			cMap.put("employeeId", conditions.getEmployeeId());			
		}
		if(conditions.getEmployeeName() != null) {
			cMap.put("employeeName", conditions.getEmployeeName());
		}
		if(conditions.getCurrentMonth() == null) {
			rlt.setSuccess(false);
			rlt.setMsg("月份为必选项");
			return rlt;
		}		
		Date beginTime = conditions.getCurrentMonth();
		Calendar cal = Calendar.getInstance();
		cal.setTime(conditions.getCurrentMonth());
		cal.add(Calendar.MONTH, 1);
		Date endTime = cal.getTime();
		cMap.put("beginTime", beginTime);
		cMap.put("endTime", endTime);
		
		List<WorkDetailSumDO> workDetailList = workdetailService.queryPaymentByCondition(cMap);
		
		/*=========================================按岗位级别计算每个操作员当月工作小时数======================================*/
		Map<Long, String> joblevel_nameMap = new HashMap<Long, String>();
		for(Joblevel joblevel: jobLevels) {
			joblevel_nameMap.put(joblevel.getId(), joblevel.getName());
		}
		Map<Long, String> opr_nameMap = new HashMap<Long, String>();
		Map<Long, String> opr_workidMap = new HashMap<Long, String>();		
		Map<Long, Map<Long, Float>> opr_joblevel_sumtimeMap = new HashMap<Long, Map<Long, Float>>();
		for(WorkDetailSumDO sum: workDetailList) {
			if(!opr_joblevel_sumtimeMap.containsKey(sum.getOperatorId())) {
				opr_workidMap.put(sum.getOperatorId(), sum.getEmployeeId());
				opr_nameMap.put(sum.getOperatorId(), sum.getEmployeeName());
				opr_joblevel_sumtimeMap.put(sum.getOperatorId(), new HashMap<Long, Float>());
			}
			Float sumHours = ((float)sum.getSeumsec())/3600;
			opr_joblevel_sumtimeMap.get(sum.getOperatorId()).put(sum.getJoblevelId(), sumHours);
		}
		
		for(Entry<Long, Map<Long, Float>> oprEntry: opr_joblevel_sumtimeMap.entrySet()) {
			String employeeName = opr_nameMap.get(oprEntry.getKey());
			String employeeId = opr_workidMap.get(oprEntry.getKey());
			Map<String, Float> levelHours = new HashMap<String, Float>();
			String mainHourLevel = null;
			float mainHour = 0f;
			float jobSubsidiesOptionsA = 0;
			for(Entry<Long, Float> entry: oprEntry.getValue().entrySet()) {
				String jobleveName = joblevel_nameMap.get(entry.getKey());
				Float joblevelHours = entry.getValue();
				if(mainHourLevel == null || joblevelHours > mainHour) {
					mainHourLevel = jobleveName;
					mainHour = joblevelHours;
				}
				levelHours.put(jobleveName, entry.getValue());
				float payment = hourBonusMap.get(jobleveName) * entry.getValue();
				jobSubsidiesOptionsA += payment;
			}
			float jobSubsidiesOptionsB = monthBonusMap.get(mainHourLevel);
			
			opr_BonusDOMap.put(oprEntry.getKey(), 
					new BonusSumDO(opr_nameMap.get(oprEntry.getKey()),
									opr_workidMap.get(oprEntry.getKey())));
			
			opr_BonusDOMap.get(oprEntry.getKey()).setMainHourLevel(mainHourLevel);
			for(Entry<String, Float> levelHour: levelHours.entrySet()) {
				opr_BonusDOMap.get(oprEntry.getKey()).getLevelHours().put(levelHour.getKey(),levelHour.getValue());
			}
			opr_BonusDOMap.get(oprEntry.getKey()).getJobSubsidiesOptions()[0] = jobSubsidiesOptionsA;
			opr_BonusDOMap.get(oprEntry.getKey()).getJobSubsidiesOptions()[1] = jobSubsidiesOptionsB;			
		}

	
		/**获取员工星级**/
		cMap = new HashMap<String, Object>();
		if(conditions.getEmployeeId() != null) {
			cMap.put("workid", conditions.getEmployeeId());			
		}
		if(conditions.getEmployeeName() != null) {
			cMap.put("name", conditions.getEmployeeName());
		}
		List<OperatorVO> operators = operatorService.getOperatorAndStarByCondition(cMap);
		for(OperatorVO operator: operators) {
			List<Float> starbonuslist = new ArrayList<Float>();
			for(OperatorJoblevelVO joblevel: operator.getLevels()) {
				Date expired = joblevel.getExpired();
				Date begin = joblevel.getBegin();
				Date seasonBeginTime = DateUtil.getFirstDateOfSeason(conditions.getCurrentMonth());
				if(begin.getTime() <= seasonBeginTime.getTime() &&
					expired.getTime() >= endTime.getTime()) {
					//开始时间在选定月份所在季度之前，且到期时间大于选定月份，该星级有效
					String joblevelName = (String) jobsMap.get(joblevel.getJobId()).getJoblevel().getValue();
					Integer starlevel = joblevel.getStarlevel();
					Float starbonus = starBonusMap.get(joblevelName).get(starlevel);
					if(starbonus > 0) {
						//将该星级补贴存入员工星级补贴列表
						starbonuslist.add(starbonus);
					}
				}
			}
			
			//最多计算8项星级补贴
			if(starbonuslist.size() > OPERATOR_STARLEVELS_MAX) {
				Collections.sort(starbonuslist);			
				starbonuslist = starbonuslist.subList(starbonuslist.size()-OPERATOR_STARLEVELS_MAX, 
						starbonuslist.size());
			}
			//星级补贴总额不大于300
			float sumBonus = 0;
			for(Float starBonus: starbonuslist) {
				sumBonus += starBonus;
			}
			if(sumBonus > OPERATOR_STARBONUS_MAX) {
				sumBonus = OPERATOR_STARBONUS_MAX;
			}
			if(!opr_BonusDOMap.containsKey(operator.getId())) {
				opr_BonusDOMap.put(operator.getId(), new BonusSumDO(operator.getName(), operator.getWorkid()));
			}
			opr_BonusDOMap.get(operator.getId()).setStarSubsidies(sumBonus);
		}
		
		List<BonusSumVO> rltList = new ArrayList<BonusSumVO>();
		float sumTotalSubsidiesA = 0f;
		float sumTotalSubsidiesB = 0f;
		for(BonusSumDO sumDO: opr_BonusDOMap.values()) {
			BonusSumVO sumVO = new BonusSumVO(sumDO.getEmployeeName(), sumDO.getEmployeeId());
			for(Entry<String,Float> entry : sumDO.getLevelHours().entrySet()) {
				sumVO.getLevelHours().put(entry.getKey(), String.format("%.2f", entry.getValue()));	
			}
			sumVO.setMainHourLevel(sumDO.getMainHourLevel());
			sumVO.getJobSubsidiesOptions()[0] = String.format("%.2f", sumDO.getJobSubsidiesOptions()[0]);
			sumVO.getJobSubsidiesOptions()[1] = String.format("%.2f", sumDO.getJobSubsidiesOptions()[1]);
			sumVO.setStarSubsidies(String.format("%.2f", sumDO.getStarSubsidies()));
			float totalSubsidiesA = sumDO.getJobSubsidiesOptions()[0]+sumDO.getStarSubsidies();
			float totalSubsidiesB = sumDO.getJobSubsidiesOptions()[1]+sumDO.getStarSubsidies();
			sumVO.getTotalSubsidies()[0] = String.format("%.2f", totalSubsidiesA);
			sumVO.getTotalSubsidies()[1] = String.format("%.2f", totalSubsidiesB);
			rltList.add(sumVO);
			sumTotalSubsidiesA += totalSubsidiesA;
			sumTotalSubsidiesB += totalSubsidiesB;
		}
		Map<String,Object> rltMap = new HashMap<String, Object>();
		rltMap.put("items", rltList);
		rltMap.put("sumTotalSubsidies", 
				Arrays.asList( String.format("%.2f", sumTotalSubsidiesA), 
							   String.format("%.2f", sumTotalSubsidiesB)));
		rlt.setSuccess(true);
		rlt.setObj(rltMap);
		return rlt;
	}
}
