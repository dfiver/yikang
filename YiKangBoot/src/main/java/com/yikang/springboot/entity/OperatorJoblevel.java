package com.yikang.springboot.entity;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableLogic;
import com.baomidou.mybatisplus.annotations.TableName;
import com.yikang.springboot.common.SuperEntity;

/**
 * <p>
 * 
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@TableName("operator_joblevel")
public class OperatorJoblevel extends SuperEntity<OperatorJoblevel> {

    private static final long serialVersionUID = 1L;

    /**
     * 操作员ID
     */
    @TableId("operator_id")
	private Long operatorId;
    /**
     * 岗位ID
     */
	@TableField("job_id")
	private Long jobId;
    /**
     * 星级
     */
	private Integer starlevel;
    /**
     * 星级评定到期时间
     */
	private Date expired;
    /**
     * 星级评定状态：0：失效，1：有效
     */
	private Integer state;
    /**
     * 星级评定删除标记
     */
	@TableLogic
	private Integer delflag;


	public Long getOperatorId() {
		return operatorId;
	}

	public void setOperatorId(Long operatorId) {
		this.operatorId = operatorId;
	}

	public Long getJobId() {
		return jobId;
	}

	public void setJobId(Long jobId) {
		this.jobId = jobId;
	}

	public Integer getStarlevel() {
		return starlevel;
	}

	public void setStarlevel(Integer starlevel) {
		this.starlevel = starlevel;
	}

	public Date getExpired() {
		return expired;
	}

	public void setExpired(Date expired) {
		this.expired = expired;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

	public Integer getDelflag() {
		return delflag;
	}

	public void setDelflag(Integer delflag) {
		this.delflag = delflag;
	}

	@Override
	protected Serializable pkVal() {
		return this.operatorId;
	}

	@Override
	public String toString() {
		return "OperatorJoblevel{" +
			", operatorId=" + operatorId +
			", jobId=" + jobId +
			", starlevel=" + starlevel +
			", expired=" + expired +
			", state=" + state +
			", delflag=" + delflag +
			"}";
	}
}
