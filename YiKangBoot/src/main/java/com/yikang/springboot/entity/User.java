package com.yikang.springboot.entity;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import com.baomidou.mybatisplus.enums.FieldFill;
import com.yikang.springboot.common.SuperEntity;

/**
 * 系统用户表
 */
@TableName("sys_user")
public class User extends SuperEntity<User> {

	
	/**
	 * 主鍵
	 */
	private Long id;
	/**
     * 用户名
     */
    private String name;

    /**
     * 用户年龄
     */
    private Integer age;
    
    
	public Long getId() {
		return id;
	}

    /**
     * 自定义填充的创建时间
     */
    @TableField(fill = FieldFill.INSERT)// 该注解插入忽略验证，自动填充
    private Date ctime;

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return this.age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Date getCtime() {
        return ctime;
    }

    public void setCtime(Date ctime) {
        this.ctime = ctime;
    }

	@Override
	protected Serializable pkVal() {
		return id;
	}
}
