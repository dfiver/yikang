package com.yikang.springboot.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.entity.User;
import com.yikang.springboot.mapper.UserMapper;
import com.yikang.springboot.service.IUserService;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-24
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements IUserService {

    @Override
    public Object getListViewList() {
        return this.baseMapper.selectList(new EntityWrapper<User>());
    }
}
