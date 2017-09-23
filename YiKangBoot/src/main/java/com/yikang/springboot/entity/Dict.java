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
 * @since 2017-09-17
 */
public class Dict extends SuperEntity<Dict> {

    private static final long serialVersionUID = 1L;

    /**
     * 字典表主键
     */
	private Long id;
    /**
     * 字典值分类: 1 manage
     */
	private Integer catagery;
    /**
     * 字典key值
     */
	private String key;
    /**
     * 字典value值
     */
	private String value;
    /**
     * 字典项注释
     */
	private String comment;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getCatagery() {
		return catagery;
	}

	public void setCatagery(Integer catagery) {
		this.catagery = catagery;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
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
		return "Dict{" +
			", id=" + id +
			", catagery=" + catagery +
			", key=" + key +
			", value=" + value +
			", comment=" + comment +
			"}";
	}
}
