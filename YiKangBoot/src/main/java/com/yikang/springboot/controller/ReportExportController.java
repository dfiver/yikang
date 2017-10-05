package com.yikang.springboot.controller;

import java.beans.IntrospectionException;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;
import com.yikang.springboot.common.utils.BeanToMapUtil;
import com.yikang.springboot.qo.ProductAndStopQueryQO;
import com.yikang.springboot.qo.WorkDetailQO;
import com.yikang.springboot.service.IOperatorWorkdetailService;
import com.yikang.springboot.service.IPorductlogService;
import com.yikang.springboot.service.IStopreasonlogService;
import com.yikang.springboot.vo.ProductlogWithProducecodeVO;
import com.yikang.springboot.vo.StopreaonlogWithModeVO;
import com.yikang.springboot.vo.WorkDetailVo;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

@Controller
@RequestMapping("/data/report")
public class ReportExportController implements EnvironmentAware{

	@Autowired
	IPorductlogService productLogService;
	
	@Autowired
	IStopreasonlogService reasonLogService;
	
	@Autowired
	IOperatorWorkdetailService workdetailService;
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());  
	private String TEMP_REPORT_PAH;
	private final ResourceLoader resourceLoader;  
	
	//由框架注入的resourceLoader，用于访问本地资源
    @Autowired  
    public ReportExportController(ResourceLoader resourceLoader) {  
        this.resourceLoader = resourceLoader;  
    }
	
	/**
	 * 实现EnvironmentAware接口，SpringBoot框架运行时会调用setEnvironment方法，将环境变量注入
	 */
	@Override
	public void setEnvironment(Environment env){
		this.TEMP_REPORT_PAH = env.getProperty("yikang.report.path.temp");
		System.out.println(this.TEMP_REPORT_PAH);
	}
	
	
	@RequestMapping("/productandstop")
	@ResponseBody
	JsonResult queryPrudoctAndSopByCondition(@RequestBody ProductAndStopQueryQO condition){
		JsonResult rlt = new JsonResult();
		Map<String, Object> conditionMap = new HashMap<String, Object>();
		
		try {
			conditionMap = BeanToMapUtil.convertBean(condition);
		} catch (IllegalAccessException | InvocationTargetException | IntrospectionException e) {
			e.printStackTrace();
		}
		//获取查询结果
		List<ProductlogWithProducecodeVO> productLogList = productLogService.queryReportListByCondition(conditionMap);		
		List<StopreaonlogWithModeVO> reaonLogList = reasonLogService.queryByCondition(conditionMap);
		
		//创建文件
		String tempFileName = UUID.randomUUID().toString();
		File path = new File(TEMP_REPORT_PAH, tempFileName);
		path.mkdir();
		File file =new File(path.getPath(), "report.xls");
		
		WritableWorkbook workbook = null;
		try {
			workbook = Workbook.createWorkbook(file);
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			int i = 0 ,j = 0;	//i是列，j是行
			
			WritableSheet sheetProduct = workbook.createSheet("product", 0);
			
			String[] titleProduct = new String[] {"starttime", "endtime", "line", "productcode", "batchno", "target", "done", "crap", "rework"};

			for(;i<titleProduct.length; ++i) {
				sheetProduct.addCell(new Label(i, 0, titleProduct[i]));
			}
			++j;
			
			for(ProductlogWithProducecodeVO productlog: productLogList) {
				String starttime = sf.format(productlog.getProductlog().getStarttime());
				String endtime = sf.format(productlog.getProductlog().getEndtime());
				String line = (String) productlog.getLine().getValue();
				String productcode = productlog.getProductcode().getProductcode();
				String batchno = (String) productlog.getBatchno().getValue();
				String target = productlog.getProductcode().getTarget().toString();
				String done = productlog.getProductlog().getDone().toString();
				String crap = productlog.getProductlog().getCrap().toString();
				String rework = productlog.getProductlog().getRework().toString();
				
				sheetProduct.addCell(new Label(0, j, starttime));
				sheetProduct.addCell(new Label(1, j, endtime));
				sheetProduct.addCell(new Label(2, j, line));
				sheetProduct.addCell(new Label(3, j, productcode));
				sheetProduct.addCell(new Label(4, j, batchno));
				sheetProduct.addCell(new Label(5, j, target));
				sheetProduct.addCell(new Label(6, j, done));
				sheetProduct.addCell(new Label(7, j, crap));
				sheetProduct.addCell(new Label(8, j, rework));

				++j;
			}
			workbook.write();
			
			WritableSheet sheetReason = workbook.createSheet("reason", 1);
			
			String[] titleReason = new String[] {"starttime", "endtime", "line", "reason", "mode"};
			j = 0;
			for(i=0 ;i<titleReason.length; ++i) {
				sheetReason.addCell(new Label(i, 0, titleReason[i]));
			}
			++j;
			for(StopreaonlogWithModeVO  reasonlog: reaonLogList) {
				String starttime = sf.format(reasonlog.getStopreasonlog().getStarttime());
				String endtime = sf.format(reasonlog.getStopreasonlog().getEndtime());
				String line = (String)reasonlog.getLine().getValue();
				String reason = (String)reasonlog.getReason().getName();
				String mode = (String)reasonlog.getMode().getName();
				
				sheetReason.addCell(new Label(0, j, starttime));
				sheetReason.addCell(new Label(1, j, endtime));
				sheetReason.addCell(new Label(2, j, line));
				sheetReason.addCell(new Label(3, j, reason));
				sheetReason.addCell(new Label(4, j, mode));
				++j;
			}
			workbook.write();
		}
		catch(IOException | WriteException e) {
			e.printStackTrace();
			rlt.setSuccess(false);
			rlt.setMsg(e.getMessage());
			return rlt;
		}
		finally {
			if(workbook != null) {
				try {
					workbook.close();
				}catch(IOException | WriteException e) {
					e.printStackTrace();
					rlt.setSuccess(false);
					rlt.setMsg(e.getMessage());
					return rlt;					
				}
				workbook = null;
			}
		}
		rlt.setSuccess(true);
		rlt.setObj(tempFileName);
		return rlt;
	}
	
	
	@RequestMapping("/operationlist")
	@ResponseBody
	JsonResult queryOperationListByCondition(@RequestBody WorkDetailQO workDetailqo) {
		JsonResult rlt = new JsonResult();
		//获取查询结果
		List<WorkDetailVo> detailList= workdetailService.queryWorkDetailByQO(workDetailqo);		
		//创建文件
		String tempFileName = UUID.randomUUID().toString();
		File path = new File(TEMP_REPORT_PAH, tempFileName);
		path.mkdir();
		File file =new File(path.getPath(), "report.xls");
		
		WritableWorkbook workbook = null;
		try {
			workbook = Workbook.createWorkbook(file);
			SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
			int i = 0 ,j = 0;	//i是列，j是行
			
			WritableSheet sheetWorkdetail = workbook.createSheet("product", 0);
			
			String[] titleWorkdetail = new String[] {"人员编号", "人员姓名", "开始时间", "结束时间", "生产线", "岗位名称", "工作时长"};

			for(;i<titleWorkdetail.length; ++i) {
				sheetWorkdetail.addCell(new Label(i, 0, titleWorkdetail[i]));
			}
			++j;
			
			for(WorkDetailVo workdetail: detailList) {
				String workid= workdetail.getOperator().getWorkid();
				String workername = workdetail.getOperator().getName();
				String starttime = sf.format(workdetail.getWorkdetail().getStarttime());
				String endtime = sf.format(workdetail.getWorkdetail().getEndtime());
				String line = (String) workdetail.getLine().getName();
				String jobname = workdetail.getSeat().getName();
				String duration = workdetail.getDuration().toString();
				
				sheetWorkdetail.addCell(new Label(0, j, workid));
				sheetWorkdetail.addCell(new Label(1, j, workername));
				sheetWorkdetail.addCell(new Label(2, j, starttime));
				sheetWorkdetail.addCell(new Label(3, j, endtime));
				sheetWorkdetail.addCell(new Label(4, j, line));
				sheetWorkdetail.addCell(new Label(5, j, jobname));
				sheetWorkdetail.addCell(new Label(6, j, duration));

				++j;
			}
			workbook.write();
		}
		catch(IOException | WriteException e) {
			e.printStackTrace();
			rlt.setSuccess(false);
			rlt.setMsg(e.getMessage());
			return rlt;
		}
		finally {
			if(workbook != null) {
				try {
					workbook.close();
				}catch(IOException | WriteException e) {
					e.printStackTrace();
					rlt.setSuccess(false);
					rlt.setMsg(e.getMessage());
					return rlt;					
				}
				workbook = null;
			}
		}
		rlt.setSuccess(true);
		rlt.setObj(tempFileName);
		return rlt;
	}
	
    @RequestMapping(method = RequestMethod.GET, value = "/download/{uuid}/{filename:.+}")  
    public ResponseEntity<?> getFile(@PathVariable String uuid, @PathVariable String filename) {  
        try {  
            File file=new File(Paths.get(TEMP_REPORT_PAH, uuid, filename).toString());
            //处理显示中文文件名的问题
            String fileName=new String(file.getName().getBytes("utf-8"),"ISO-8859-1");
            //设置请求头内容,告诉浏览器代开下载窗口
            HttpHeaders headers = new HttpHeaders();  
            headers.setContentDispositionFormData("attachment",fileName );   
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM); 
            return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file),    
                                                  headers, HttpStatus.CREATED);          	
        } catch (Exception e) {  
            return ResponseEntity.notFound().build();  
        }  
    } 
	
}