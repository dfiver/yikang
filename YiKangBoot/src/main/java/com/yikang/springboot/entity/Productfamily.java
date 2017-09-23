package com.yikang.springboot.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableLogic;
import com.yikang.springboot.common.OptionalEntity;
import com.yikang.springboot.common.SuperEntity;
import com.yikang.springboot.common.result.KeyValue;

/**
 * <p>
 * 
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public class Productfamily extends OptionalEntity<Productfamily> {

    private static final long serialVersionUID = 1L;

    /**
     * 生产家族表主键
     */
	private Long id;
    /**
     * 生产家族名称
     */
	private String name;
    /**
     * 生产家族注释
     */
	private String comment;
    /**
     * 生产家族表删除标记
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

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "Productfamily{" +
			", id=" + id +
			", name=" + name +
			", comment=" + comment +
			", delflag=" + delflag +
			"}";
	}

	@Override
	public KeyValue option() {
		KeyValue rlt= new KeyValue();
		rlt.setKey(id);
		rlt.setValue(name);
		return rlt;
	}
}
