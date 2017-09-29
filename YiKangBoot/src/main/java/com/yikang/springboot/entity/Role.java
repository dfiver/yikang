package com.yikang.springboot.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.activerecord.Model;
import com.yikang.springboot.common.OptionalEntity;
import com.yikang.springboot.common.SuperEntity;
import com.yikang.springboot.common.result.KeyValue;

/**
 * <p>
 * 
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-28
 */
public class Role extends OptionalEntity<Role> {

    private static final long serialVersionUID = 1L;

    /**
     * 角色表主键
     */
	private Long id;
    /**
     * 角色名称
     */
	private String name;
    /**
     * 备注
     */
	private String comment;
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
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
		return "Role{" +
			"id=" + id +
			", name=" + name +
			", comment=" + comment +
			", permission=" + permission +
			"}";
	}

	@Override
	public KeyValue option() {
		KeyValue kv = new KeyValue();
		kv.setValue(this.getName());
		kv.setKey(this.getId());
		return kv;
	}
}
