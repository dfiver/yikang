package com.yikang.springboot.qo;



import java.util.List;

import com.yikang.springboot.entity.Operator;



public class OperatorDetailAndStarLevelQO {
	public Operator getItem() {
		return item;
	}
	public void setItem(Operator item) {
		this.item = item;
	}
	public List<OperatorJoblevelQO> getItemlist() {
		return itemlist;
	}
	public void setItemlist(List<OperatorJoblevelQO> itemlist) {
		this.itemlist = itemlist;
	}
	Operator item;
	List<OperatorJoblevelQO> itemlist;
}
