package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Productcode;
import com.yikang.springboot.mapper.ProductcodeMapper;
import com.yikang.springboot.service.IProductcodeService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class ProductcodeServiceImpl extends ServiceImpl<ProductcodeMapper, Productcode> implements IProductcodeService {

	@Override
	public Object getListViewList() {
		return this.baseMapper.getListViewList();
	}
	
}
