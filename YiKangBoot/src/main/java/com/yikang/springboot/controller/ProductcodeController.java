package com.yikang.springboot.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.result.KeyValue;
import com.yikang.springboot.entity.Productcode;
import com.yikang.springboot.service.IProductcodeService;
import com.yikang.springboot.vo.ProductcodeVO;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Yanghu
 * @since 2017-09-17
 */
@Controller
@RequestMapping("/data/productcode")
public class ProductcodeController extends OptionalDataController<Productcode, IProductcodeService> {
	@Override
	public Object getAll(){
		return this.service.getListViewList();
	}
	
	@RequestMapping("/list/options")
	@ResponseBody
	public JsonResult getProductCodeOptions(
			@RequestParam Long workshopId, 
			@RequestParam Long productfamilyId, 
			@RequestParam Long productcodeId){
		List<ProductcodeVO> pcodeList = (List<ProductcodeVO>) this.service.getListViewList();
		Map<String, Map<Long, Object>> optionsMap = new HashMap<String, Map<Long, Object>>();
		Map<Long, Object> workshop = new HashMap<Long, Object>();
		Map<Long, Object> productfamily = new HashMap<Long, Object>();
		Map<Long, Object> productcode = new HashMap<Long, Object>();
		for(ProductcodeVO pcVO: pcodeList){
			if((workshopId==null||workshopId.equals(pcVO.getWorkshopId()))
			&&(productfamilyId==null||productfamilyId.equals(pcVO.getProductfamilyId()))
			&&(productcodeId==null||productcodeId.equals(pcVO.getId()))){
				workshop.put(pcVO.getWorkshopId(), pcVO.getWorkshop().getValue());
				productfamily.put(pcVO.getProductfamilyId(), pcVO.getProductfamily().getValue());
				productcode.put(pcVO.getId(), pcVO.getProductcode());
			}
		}
		optionsMap.put("workshop", workshop);
		optionsMap.put("productfamily", productfamily);
		optionsMap.put("productcode", productcode);
		
		Map<String, List<KeyValue>> rltMap = new HashMap<String, List<KeyValue>>();	
		for(Entry<String, Map<Long, Object>> optionEntry: optionsMap.entrySet()){
			List<KeyValue> kvList = new ArrayList<KeyValue>();
			for(Entry<Long, Object> entry: optionEntry.getValue().entrySet()){
				KeyValue keyValue = new KeyValue();
				keyValue.setKey(entry.getKey());
				keyValue.setValue(entry.getValue().toString());
				kvList.add(keyValue);
				rltMap.put(optionEntry.getKey(), kvList);
			}			
		}
		return renderSuccess().setObj(rltMap);
	}
}
