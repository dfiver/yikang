package com.yikang.springboot.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.yikang.springboot.common.OptionalEntity;
import com.yikang.springboot.common.SuperEntity;
import com.yikang.springboot.common.result.KeyValue;

import javax.swing.text.html.Option;

/**
 * <p>
 * 
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-28
 */
public class User extends OptionalEntity<User> {

    private static final long serialVersionUID = 1L;

    /**
     * 用户表主键
     */
	private Long id;
    /**
     * 用户名
     */
	private String username;
    /**
     * 用户姓名
     */
	private String name;
    /**
     * 密码
     */
	private String passwd;
    /**
     * 角色id
     */
	@TableField("role_id")
	private Long roleId;
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

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPasswd() {
		return passwd;
	}

	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}

	public Long getRoleId() {
		return roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
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
		return "User{" +
			"id=" + id +
			", username=" + username +
			", name=" + name +
			", passwd=" + passwd +
			", roleId=" + roleId +
			", comment=" + comment +
			"}";
	}

	@Override
	public KeyValue option() {
		KeyValue kv = new KeyValue();
		kv.setKey(this.getId());
		kv.setValue(this.getName());
		return kv;
	}
}
