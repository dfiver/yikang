package com.yikang.springboot.controller;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.utils.StringUtil;
import com.yikang.springboot.entity.Dict;
import com.yikang.springboot.entity.Job;
import com.yikang.springboot.entity.Lineseat;
import com.yikang.springboot.entity.LineseatOperator;
import com.yikang.springboot.entity.Operator;
import com.yikang.springboot.entity.OperatorJoblevel;
import com.yikang.springboot.entity.OperatorWorkdetail;
import com.yikang.springboot.service.IDictService;
import com.yikang.springboot.service.IJobService;
import com.yikang.springboot.service.ILineseatOperatorService;
import com.yikang.springboot.service.ILineseatService;
import com.yikang.springboot.service.IOperatorJoblevelService;
import com.yikang.springboot.service.IOperatorService;
import com.yikang.springboot.service.IOperatorWorkdetailService;
import com.yikang.springboot.vo.LineseatOperatorVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author WuHonglin
 * @since 2017-09-30
 */
@Controller
@RequestMapping("/data/lineseatoperator")
public class LineseatOperatorController extends BaseController<LineseatOperator, ILineseatOperatorService> {

	private final int INIT_STARNUM = 5;
	
	@Autowired
	IDictService dictService;

	@Autowired
	IOperatorService operatorService;
	
	@Autowired
	IOperatorWorkdetailService operatorworkService;
	
	@Autowired
	ILineseatService lineseatService;
	
	@Autowired
	IOperatorJoblevelService oprJobLevelService;
	
	@Autowired
	IJobService jobService;
	
	
	@RequestMapping("/querybylineid")
	@ResponseBody
	JsonResult getLineseatOperatorByLineId(@RequestParam Long lineId) {
		int starNum = INIT_STARNUM;
		Object rltStarNum = dictService.selectOne(new EntityWrapper<Dict>().where("dict.key = 'stars'"));
		if(rltStarNum != null){
			Dict stars = (Dict)rltStarNum;
			starNum =Integer.parseInt(stars.getValue());
		}
		
		List<LineseatOperatorVO> rltList = service.getLineseatOperatorByLineId(lineId);
		for(LineseatOperatorVO rlt: rltList) {
			rlt.setMaxStarlevel(starNum);
		}
		return renderSuccess().setObj(rltList);
	}
	
	@RequestMapping("/updownseat")
	@ResponseBody
	@Transactional
	JsonResult operatorUpDownSeat(@RequestParam String workid,
			@RequestParam Long lineseatId) {

		if(StringUtil.isEmpty(workid)|| lineseatId == null) {
			return renderError().setMsg("工号或坐席号为空！");
		}
		
		//基本验证
		Operator operatorCondition = new Operator();
		operatorCondition.setWorkid(workid);
		operatorCondition.setDelflag(0);
		Operator opr = operatorService.selectOne(new EntityWrapper<Operator>(operatorCondition));
		Lineseat lineseat = lineseatService.selectById(lineseatId);
		
		//
		if(opr != null && lineseat != null) {
			Job job = jobService.selectById(lineseat.getJobId());			
			LineseatOperator lsoprCondition_seatId = new LineseatOperator();
			lsoprCondition_seatId.setLineseatId(lineseatId);
			LineseatOperator lineseatOperator = service.selectOne(new EntityWrapper<LineseatOperator>(lsoprCondition_seatId));
			if(lineseatOperator != null) {
				//在岗，判断是否这个员工
				if(lineseatOperator.getOperatorId().equals(opr.getId())) {
					OperatorWorkdetail opwDetail = new OperatorWorkdetail();
					opwDetail.setOperatorId(opr.getId());
					opwDetail.setSeatId(lineseatId);
					opwDetail.setStarttime(lineseatOperator.getStarttime());
					opwDetail.setEndtime(new Date());
					opwDetail.insert();					
					service.deleteById(lineseatOperator.getId());
					return renderSuccess();
				}
				else {
					return renderError().setMsg("当前在岗的非此员工");
				}
			}
			else {
				//无人在岗，判断该员工是否已在别处上岗
				LineseatOperator lsoprCondition_oprId = new LineseatOperator();
				lsoprCondition_oprId.setOperatorId(opr.getId());
				lineseatOperator = service.selectOne(new EntityWrapper<LineseatOperator>(lsoprCondition_oprId));
				if(lineseatOperator != null) {
					//在岗，且不是这个坐席
					return renderError().setMsg("员工已在其他岗位上岗");
				}
				else {
					//不在岗，上岗
					//判断是否有该岗位的操作权限
					OperatorJoblevel oprJobLCondition = new OperatorJoblevel();
					oprJobLCondition.setOperatorId(opr.getId());
					oprJobLCondition.setJobId(lineseat.getJobId());
					oprJobLCondition.setDelflag(0);
					OperatorJoblevel oprJobLevel = oprJobLevelService.selectOne(new EntityWrapper<OperatorJoblevel>(oprJobLCondition));
					if(oprJobLevel== null){
						return renderError("员工不具备岗位技能");
					}else if(job.getStarlevel().longValue() > oprJobLevel.getStarlevel().longValue()){
						return renderError("员工星级达不到岗位星级要求");
					}else if(oprJobLevel.getExpired().getTime() < new Date().getTime()){
						return renderError("员工岗位星级已过期");
					}else{
						lineseatOperator = new LineseatOperator();
						lineseatOperator.setStarttime(new Date());
						lineseatOperator.setOperatorId(opr.getId());
						lineseatOperator.setLineseatId(lineseatId);
						lineseatOperator.insert();
						return renderSuccess();											
					}
				}
			}			
		}
		return renderError().setMsg("工号或坐席号错误");
	}
}
