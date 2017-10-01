package com.yikang.springboot.entity;

import java.io.Serializable;

import java.util.Date;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableName;
import com.yikang.springboot.common.SuperEntity;

/**
 * <p>
 * 
 * </p>
 *
 * @author WuHonglin
 * @since 2017-09-30
 */
@TableName("lineseat_operator")
public class LineseatOperator extends SuperEntity<LineseatOperator> {

    private static final long serialVersionUID = 1L;

    /**
     * 上工状态表主键
     */
	private Long id;
    /**
     * 工位表主键
     */
	@TableField("lineseat_id")
	private Long lineseatId;
    /**
     * 员工表主键
     */
	@TableField("operator_id")
	private Long operatorId;
    /**
     * 上工时间
     */
	private Date starttime;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getLineseatId() {
		return lineseatId;
	}

	public void setLineseatId(Long lineseatId) {
		this.lineseatId = lineseatId;
	}

	public Long getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(Long operatorId) {
		this.operatorId = operatorId;
	}


	public Date getStarttime() {
		return starttime;
	}

	public void setStarttime(Date starttime) {
		this.starttime = starttime;
	}

	@Override
	protected Serializable pkVal() {
		return this.id;
	}

	@Override
	public String toString() {
		return "LineseatOperator{" +
			"id=" + id +
			", lineseatId=" + lineseatId +
			", operatorId=" + operatorId +
			", starttime=" + starttime +
			"}";
	}
}
