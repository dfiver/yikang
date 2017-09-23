package com.yikang.springboot.service;

import com.baomidou.mybatisplus.service.IService;

public interface IVOService<T> extends IService<T> {
	Object getListViewList();
}
