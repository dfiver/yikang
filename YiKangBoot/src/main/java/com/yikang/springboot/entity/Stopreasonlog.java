package com.yikang.springboot.entity;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableLogic;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.yikang.springboot.common.SuperEntity;

/**
 * <p>
 * 
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public class Stopreasonlog extends SuperEntity<Stopreasonlog> {

    private static final long serialVersionUID = 1L;

    /**
     * 故障信息日志表主键
     */
	private Long id;
    /**
     * 班次ID
     */
	@TableField("line_id")
	private Long lineId;
    /**
     * 停机原因表主键
     */
	@TableField("shift_id")
	private Long shiftId;

    /**
     * 开始时间
     */
	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")
	private Date starttime;

	/**
     * 结束时间
     */
	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")
	private Date endtime;
    /**
     * 原因ID
     */
	@TableField("reason_id")
	private Long reasonId;
	
	/**
	 * 备注
	 */
	private String comment;
	
    /**
     * 删除标记
     */
	@TableLogic
	private Integer delflag;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLineId() {
		return lineId;
	}

	public void setLineId(Long lineId) {
		this.lineId = lineId;
	}

	public Long getShiftId() {
		return shiftId;
	}

	public void setShiftId(Long shiftId) {
		this.shiftId = shiftId;
	}

	public Date getStarttime() {
		return starttime;
	}

	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}

	public Date getEndtime() {
		return endtime;
	}

	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}

	public Long getReasonId() {
		return reasonId;
	}

	public void setReasonId(Long reasonId) {
		this.reasonId = reasonId;
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
		return "Stopreasonlog{" +
			", id=" + id +
			", lineId=" + lineId +
			", shiftId=" + shiftId +
			", starttime=" + starttime +
			", endtime=" + endtime +
			", reasonId=" + reasonId +
			", delflag=" + delflag +
			"}";
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
}
