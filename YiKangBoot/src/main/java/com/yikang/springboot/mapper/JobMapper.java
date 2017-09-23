package com.yikang.springboot.mapper;

import java.util.List;

import com.yikang.springboot.common.SuperMapper;
import com.yikang.springboot.entity.Job;
import com.yikang.springboot.vo.JobVO;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface JobMapper extends SuperMapper<Job> {
	List<JobVO> getListViewList();
}