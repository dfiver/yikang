package com.yikang.springboot.entity;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableField;
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
public class Batchno extends OptionalEntity<Batchno> {

    private static final long serialVersionUID = 1L;

    /**
     * 批次号主键
     */
	private Long id;
    /**
     * 批次号名称
     */
	private String name;
    /**
     * 生产型号ID
     */
	@TableField("productcode_id")
	private Long productcodeId;
    /**
     * 批次生产目标个数
     */
	private Integer target;
    /**
     * 批次生产状态：0 新建,1生产中,2已完成
     */
	private Integer state;
    /**
     * 批次注释
     */
	private String comment;
    /**
     * 批次号删除标记
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

	public Long getProductcodeId() {
		return productcodeId;
	}

	public void setProductcodeId(Long productcodeId) {
		this.productcodeId = productcodeId;
	}

	public Integer getTarget() {
		return target;
	}

	public void setTarget(Integer target) {
		this.target = target;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
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
		return "Batchno{" +
			", id=" + id +
			", name=" + name +
			", productcodeId=" + productcodeId +
			", target=" + target +
			", state=" + state +
			", comment=" + comment +
			", delflag=" + delflag +
			"}";
	}

	@Override
	public KeyValue option() {
		KeyValue rlt = new KeyValue();
		rlt.setKey(id);
		rlt.setValue(name);
		return rlt;
	}


}
