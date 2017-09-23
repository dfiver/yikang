package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.Productfamily;
import com.yikang.springboot.mapper.ProductfamilyMapper;
import com.yikang.springboot.service.IProductfamilyService;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Service
public class ProductfamilyServiceImpl extends ServiceImpl<ProductfamilyMapper, Productfamily> implements IProductfamilyService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<Productfamily>());
	}
}
