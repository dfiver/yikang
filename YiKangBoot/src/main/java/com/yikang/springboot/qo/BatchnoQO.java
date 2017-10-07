package com.yikang.springboot.qo;

public class BatchnoQO {
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public Long getWorkshopId() {
		return workshopId;
	}
	public void setWorkshopId(Long workshopId) {
		this.workshopId = workshopId;
	}
	public Long getProductFamilyId() {
		return productfamilyId;
	}
	public void setProductFamilyId(Long familyId) {
		this.productfamilyId = familyId;
	}
	public Long getProductcodeId() {
		return productcodeId;
	}
	public void setProductcodeId(Long productcodeId) {
		this.productcodeId = productcodeId;
	}
	private Integer state;
	private Long workshopId;
	private Long productfamilyId;
	private Long productcodeId;
}
