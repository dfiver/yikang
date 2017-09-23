package com.yikang.springboot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yikang.springboot.entity.Job;
import com.yikang.springboot.service.IJobService;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/job")
public class JobController extends OptionalDataController<Job, IJobService> {
	@Override
	public Object getAll(){
		return this.service.getListViewList();
	}
}
