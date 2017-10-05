package com.yikang.springboot.entity;

import java.io.Serializable;
import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
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
@TableName("operator_workdetail")
public class OperatorWorkdetail extends SuperEntity<OperatorWorkdetail> {

    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
	private Long id;
    /**
     * 操作员ID
     */
	@TableField("operator_id")
	private Long operatorId;
    /**
     * 坐席ID
     */
	@TableField("seat_id")
	private Long seatId;
    /**
     * 开始时间
     */
	@JsonFormat(timezone = "GMT+8", pattern="yyy-MM-dd HH:mm")
	private Date starttime;
    /**
     * 结束时间
     */
	@JsonFormat(timezone = "GMT+8", pattern="yyy-MM-dd HH:mm")	
	private Date endtime;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(Long operatorId) {
		this.operatorId = operatorId;
	}

	public Long getSeatId() {
		return seatId;
	}

	public void setSeatId(Long seatId) {
		this.seatId = seatId;
	}

	@JSONField(name = "starttime", format = "yyyy-MM-dd HH:mm:ss")	
	public Date getStarttime() {
		return starttime;
	}

	@JSONField(name = "starttime", format = "yyyy-MM-dd HH:mm:ss")		
	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}

	@JSONField(name = "endtime", format = "yyyy-MM-dd HH:mm:ss")		
	public Date getEndtime() {
		return endtime;
	}

	@JSONField(name = "endtime", format = "yyyy-MM-dd HH:mm:ss")	
	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "OperatorWorkdetail{" +
			", id=" + id +
			", operatorId=" + operatorId +
			", seatId=" + seatId +
			", starttime=" + starttime +
			", endtime=" + endtime +
			"}";
	}
}
