package com.yikang.springboot.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.activerecord.Model;
import com.yikang.springboot.common.SuperEntity;

/**
 * <p>
 * 
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-24
 */
public class Role extends SuperEntity<Role> {

    private static final long serialVersionUID = 1L;

    /**
     * 角色表主键
     */
	private Long id;
    /**
     * 角色名称
     */
	private String name;


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

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "Role{" +
			"id=" + id +
			", name=" + name +
			"}";
	}
}
