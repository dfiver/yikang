package com.yikang.springboot.entity;

import java.io.Serializable;
import java.math.BigDecimal;

import com.baomidou.mybatisplus.annotations.TableField;
import com.yikang.springboot.common.SuperEntity;

/**
 * <p>
 * 
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public class Subsidy extends SuperEntity<Subsidy> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
	private Long id;
    /**
     * 补贴类型：0：星级补贴，1：月岗位补贴，2：小时岗位补贴
     */
	private Integer type;
    /**
     * 班组表主键
     */
	@TableField("joblevel_id")
	private Long joblevelId;
    /**
     * 星级
     */
	private Integer startlevel;
    /**
     * 补贴值
     */
	private BigDecimal subsidy;
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

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Long getJoblevelId() {
		return joblevelId;
	}

	public void setJoblevelId(Long joblevelId) {
		this.joblevelId = joblevelId;
	}

	public Integer getStartlevel() {
		return startlevel;
	}

	public void setStartlevel(Integer startlevel) {
		this.startlevel = startlevel;
	}

	public BigDecimal getSubsidy() {
		return subsidy;
	}

	public void setSubsidy(BigDecimal subsidy) {
		this.subsidy = subsidy;
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
		return "Subsidy{" +
			", id=" + id +
			", type=" + type +
			", joblevelId=" + joblevelId +
			", startlevel=" + startlevel +
			", subsidy=" + subsidy +
			", comment=" + comment +
			"}";
	}
}
