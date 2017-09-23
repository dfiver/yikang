package com.yikang.springboot.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableLogic;
import com.yikang.springboot.common.SuperEntity;

/**
 * <p>
 * 
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public class Operator extends SuperEntity<Operator> {

    private static final long serialVersionUID = 1L;

    /**
     * 操作员表主键
     */
	private Long id;
	
	/**
	 * 操作员工号
	 */
	private String workid;
    /**
     * 操作员名称
     */
	private String name;
    /**
     * 操作员头像图片路径
     */
	private String avatar;
    /**
     * 班次ID
     */
	@TableField("shift_id")
	private Long shiftId;
    /**
     * 操作员注释
     */
	private String comment;
    /**
     * 操作员删除标记
     */
	@TableLogic
	private Integer delflag;


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

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Long getShiftId() {
		return shiftId;
	}

	public void setShiftId(Long shiftId) {
		this.shiftId = shiftId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Integer getDelflag() {
		return delflag;
	}

	public void setDelflag(Integer delflag) {
		this.delflag = delflag;
	}
	
	public String getWorkid() {
		return workid;
	}

	public void setWorkid(String workid) {
		this.workid = workid;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "Operator{" +
			", id=" + id +
			", name=" + name +
			", avatar=" + avatar +
			", shiftId=" + shiftId +
			", comment=" + comment +
			", delflag=" + delflag +
			"}";
	}
}
