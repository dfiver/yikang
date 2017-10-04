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
public class Productcode extends OptionalEntity<Productcode> {

	private static final long serialVersionUID = 1L;

	/**
	 * 生产型号表主键
	 */
	private Long id;
	/**
	 * 生产车间ID
	 */
	@TableField("workshop_id")
	private Long workshopId;
	/**
	 * 生产家族ID
	 */
	@TableField("productfamily_id")
	private Long productfamilyId;
	/**
	 * 生产型号
	 */
	private String productcode;
	/**
	 * 计划每小时生产数量
	 */
	private Integer target;
	/**
	 * cycle time，记录用户输入
	 */
	private String cycletime;
	@TableField("EU")
	private String eu;
	/**
	 * 生产型号注释
	 */
	private String comment;
	/**
	 * 生产型号删除标记
	 */
	private Integer delflag;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getWorkshopId() {
		return workshopId;
	}

	public void setWorkshopId(Long workshopId) {
		this.workshopId = workshopId;
	}

	public Long getProductfamilyId() {
		return productfamilyId;
	}

	public void setProductfamilyId(Long productfamilyId) {
		this.productfamilyId = productfamilyId;
	}

	public String getProductcode() {
		return productcode;
	}

	public void setProductcode(String productcode) {
		this.productcode = productcode;
	}

	public Integer getTarget() {
		return target;
	}

	public void setTarget(Integer target) {
		this.target = target;
	}

	public String getCycletime() {
		return cycletime;
	}

	public void setCycletime(String cycletime) {
		this.cycletime = cycletime;
	}

	public String getEu() {
		return eu;
	}

	public void setEu(String eu) {
		this.eu = eu;
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
		return "Productcode{" +
				"id=" + id +
				", workshopId=" + workshopId +
				", productfamilyId=" + productfamilyId +
				", productcode=" + productcode +
				", target=" + target +
				", cycletime=" + cycletime +
				", eu=" + eu +
				", comment=" + comment +
				", delflag=" + delflag +
				"}";
	}

	@Override
	public KeyValue option() {
		KeyValue rlt = new KeyValue();
		rlt.setKey(id);
		rlt.setValue(productcode);
		return rlt;
	}
}
