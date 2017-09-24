package com.yikang.springboot.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.entity.Role;
import com.yikang.springboot.mapper.RoleMapper;
import com.yikang.springboot.service.IRoleService;
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
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements IRoleService {

        @Override
        public Object getListViewList() {
            return this.baseMapper.selectList(new EntityWrapper<Role>());
        }
}
