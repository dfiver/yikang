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
			"}";
	}

	@Override
	public KeyValue option() {
		KeyValue rlt = new KeyValue();
		rlt.setKey(this.getId());
		rlt.setValue(this.getName());
		return rlt;
	}
}
