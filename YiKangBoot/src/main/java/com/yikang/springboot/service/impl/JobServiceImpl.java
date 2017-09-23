package com.yikang.springboot.service.impl;

import com.yikang.springboot.entity.Job;
import com.yikang.springboot.mapper.JobMapper;
import com.yikang.springboot.service.IJobService;
import com.yikang.springboot.vo.JobVO;
import com.yikang.springboot.vo.LineVO;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class JobServiceImpl extends ServiceImpl<JobMapper, Job> implements IJobService {

	@Override
	public List<JobVO> getListViewList() {
		return this.baseMapper.getListViewList();
	}
	
}
