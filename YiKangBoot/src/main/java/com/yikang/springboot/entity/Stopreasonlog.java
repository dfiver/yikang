package com.yikang.springboot.entity;

import java.io.Serializable;
import java.util.Date;

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
	private Integer shiftId;
    /**
     * 批次号ID
     */
	@TableField("batchno_id")
	private Long batchnoId;
    /**
     * 开始时间
     */
	private Date starttime;
    /**
     * 结束时间
     */
	private Date endtime;
    /**
     * 原因ID
     */
	@TableField("reason_id")
	private Long reasonId;
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

	public Integer getShiftId() {
		return shiftId;
	}

	public void setShiftId(Integer shiftId) {
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
			", batchnoId=" + batchnoId +
			", starttime=" + starttime +
			", endtime=" + endtime +
			", reasonId=" + reasonId +
			", delflag=" + delflag +
			"}";
	}
}
