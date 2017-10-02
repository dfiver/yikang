package com.yikang.springboot.service;

import com.yikang.springboot.entity.OperatorWorkdetail;
import com.baomidou.mybatisplus.service.IService;
import com.yikang.springboot.qo.WorkDetailQO;
import com.yikang.springboot.vo.WorkDetailVo;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface IOperatorWorkdetailService extends IVOService<OperatorWorkdetail> {

    public List<WorkDetailVo> queryWorkDetailByQO(WorkDetailQO qo);
}
