package com.yikang.springboot.service.impl;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.yikang.springboot.entity.RolePermission;
import com.yikang.springboot.mapper.RolePermissionMapper;
import com.yikang.springboot.service.IRolePermissionService;
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
public class RolePermissionServiceImpl extends ServiceImpl<RolePermissionMapper, RolePermission> implements IRolePermissionService {

    @Override
    public Object getListViewList() {
        return this.baseMapper.selectList(new EntityWrapper<RolePermission>());
    }
}
