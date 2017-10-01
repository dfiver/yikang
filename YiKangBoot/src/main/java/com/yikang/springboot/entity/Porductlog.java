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
public class Porductlog extends SuperEntity<Porductlog> {

    private static final long serialVersionUID = 1L;

    /**
     * 生产信息日志表主键
     */
	private Long id;
    /**
     * 生产线ID
     */
	@TableField("line_id")
	private Long lineId;
    /**
     * 班次ID
     */
	@TableField("shift_id")
	private Long shiftId;
    /**
     * 批次号ID
     */
	@TableField("batchno_id")
	private Long batchnoId;
    /**
     * 开始时间
     */
	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")
	private Date starttime;
    /**
     * 截止时间
     */
	@JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd HH:mm")	
	private Date endtime;
    /**
     * 已完成数量
     */
	private Integer done;
    /**
     * 废品数量
     */
	private Integer crap;
    /**
     * 返工数量
     */
	private Integer rework;
	
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

	public Long getBatchnoId() {
		return batchnoId;
	}

	public void setBatchnoId(Long batchnoId) {
		this.batchnoId = batchnoId;
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

	public Integer getDone() {
		return done;
	}

	public void setDone(Integer done) {
		this.done = done;
	}

	public Integer getCrap() {
		return crap;
	}

	public void setCrap(Integer crap) {
		this.crap = crap;
	}

	public Integer getRework() {
		return rework;
	}

	public void setRework(Integer rework) {
		this.rework = rework;
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
		return "Porductlog{" +
			", id=" + id +
			", lineId=" + lineId +
			", shiftId=" + shiftId +
			", batchnoId=" + batchnoId +
			", starttime=" + starttime +
			", endtime=" + endtime +
			", done=" + done +
			", crap=" + crap +
			", rework=" + rework +
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
