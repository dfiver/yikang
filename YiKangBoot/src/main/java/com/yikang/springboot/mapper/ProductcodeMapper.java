package com.yikang.springboot.mapper;

import java.util.List;

import com.yikang.springboot.common.SuperMapper;
import com.yikang.springboot.entity.Productcode;
import com.yikang.springboot.vo.ProductcodeVO;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
public interface ProductcodeMapper extends SuperMapper<Productcode> {

	List<ProductcodeVO> getListViewList();

}