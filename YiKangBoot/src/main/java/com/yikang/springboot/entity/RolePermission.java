package com.yikang.springboot.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import com.yikang.springboot.common.SuperEntity;

/**
 * <p>
 * 
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-24
 */
@TableName("role_permission")
public class RolePermission extends SuperEntity<RolePermission> {

    private static final long serialVersionUID = 1L;

    /**
     * 角色映射表
     */
	private Long id;
    /**
     * 角色id
     */
	@TableField("role_id")
	private Long roleId;
    /**
     * 权限串
     */
	private String permission;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "RolePermission{" +
			"id=" + id +
			", roleId=" + roleId +
			", permission=" + permission +
			"}";
	}
}
