package com.yikang.springboot.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.yikang.springboot.entity.User;
import com.yikang.springboot.mapper.UserMapper;
import com.yikang.springboot.service.IUserService;

/**
 *
 * User 表数据服务层接口实现类
 *
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {
	@Override
	public Object getListViewList() {
		return this.baseMapper.selectList(new EntityWrapper<User>());
	}
}