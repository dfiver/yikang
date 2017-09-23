package com.yikang.springboot.entity;

import java.io.Serializable;

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
public class Lineseat extends SuperEntity<Lineseat> {

    private static final long serialVersionUID = 1L;

    /**
     * 坐席表主键
     */
	private Long id;
    /**
     * 生产线ID
     */
	@TableField("line_id")
	private Long lineId;
    /**
     * 坐席再生产线中的位置
     */
	private Integer serise;
    /**
     * 岗位ID
     */
	@TableField("job_id")
	private Long jobId;
    /**
     * 坐席名称
     */
	private String name;
    /**
     * 备注信息
     */
	private String comment;
    /**
     * 坐席删除标记
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

	public Integer getSerise() {
		return serise;
	}

	public void setSerise(Integer serise) {
		this.serise = serise;
	}

	public Long getJobId() {
		return jobId;
	}

	public void setJobId(Long jobId) {
		this.jobId = jobId;
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
		return "Lineseat{" +
			", id=" + id +
			", lineId=" + lineId +
			", serise=" + serise +
			", jobId=" + jobId +
			", name=" + name +
			", comment=" + comment +
			", delflag=" + delflag +
			"}";
	}
}
