package com.yikang.springboot.controller;

import java.io.File;
import java.nio.file.Paths;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.yikang.springboot.common.result.JsonResult;

@Controller
@RequestMapping("/upload")
public class UploadController implements EnvironmentAware{

	private final Logger logger = LoggerFactory.getLogger(this.getClass());  
	private String UPLOAD_FILE_PAH;
	private final ResourceLoader resourceLoader;  
	
	private String getRandomFileName(){
		return UUID.randomUUID().toString();
	}
	
	//由框架注入的resourceLoader，用于访问本地资源
    @Autowired  
    public UploadController(ResourceLoader resourceLoader) {  
        this.resourceLoader = resourceLoader;  
    }
	
	/**
	 * 实现EnvironmentAware接口，SpringBoot框架运行时会调用setEnvironment方法，将环境变量注入
	 */
	@Override
	public void setEnvironment(Environment env){
		this.UPLOAD_FILE_PAH = env.getProperty("yikang.upload.path.image");
		System.out.println(this.UPLOAD_FILE_PAH);
	}
	
	/**
	 * 文件上传的接口，采用的是x-www-form-urlencoded方式上传数据
	 * @param base64Data
	 * @param request
	 * @param response
	 * @return
	 */
    @RequestMapping(value="/avatar",method=RequestMethod.POST)
    @ResponseBody
    public JsonResult base64UpLoad(@RequestParam String base64Data, HttpServletRequest request, HttpServletResponse response){  
    	JsonResult result = new JsonResult();
        try{
            logger.debug("上传文件的数据："+base64Data);
            String dataPrix = "";
            String data = "";

            logger.debug("对数据进行判断");
            if(base64Data == null || "".equals(base64Data)){
                throw new Exception("上传失败，上传图片数据为空");
            }else{
                String [] d = base64Data.split("base64,");
                if(d != null && d.length == 2){
                    dataPrix = d[0];
                    data = d[1];
                }else{
                    throw new Exception("上传失败，数据不合法");
                }
            }

            logger.debug("对数据进行解析，获取文件名和流数据");
            String suffix = "";
            if("data:image/jpeg;".equalsIgnoreCase(dataPrix)){//data:image/jpeg;base64,base64编码的jpeg图片数据
                suffix = ".jpg";
            } else if("data:image/x-icon;".equalsIgnoreCase(dataPrix)){//data:image/x-icon;base64,base64编码的icon图片数据
                suffix = ".ico";
            } else if("data:image/gif;".equalsIgnoreCase(dataPrix)){//data:image/gif;base64,base64编码的gif图片数据
                suffix = ".gif";
            } else if("data:image/png;".equalsIgnoreCase(dataPrix)){//data:image/png;base64,base64编码的png图片数据
                suffix = ".png";
            }else{
                throw new Exception("上传图片格式不合法");
            }
            String tempFileName = getRandomFileName() + suffix;
            logger.debug("生成文件名为："+tempFileName);

            //因为BASE64Decoder的jar问题，此处使用spring框架提供的工具包
            byte[] bs = Base64Utils.decodeFromString(data);
            try{
                //使用apache提供的工具类操作流
                FileUtils.writeByteArrayToFile(new File(UPLOAD_FILE_PAH, tempFileName), bs);  
            }catch(Exception ee){
                throw new Exception("上传失败，写入文件失败，"+ee.getMessage());
            }
            result.setSuccess(true);
            result.setMsg("上传成功");
            result.setObj(tempFileName);
            logger.debug("上传成功");
        }catch (Exception e) {  
            logger.debug("上传失败,"+e.getMessage());
            result.setSuccess(false);
            result.setMsg("上传失败,"+e.getMessage());  
        }  
        return result;
    }
    
    @RequestMapping(method = RequestMethod.GET, value = "/image/{filename:.+}")  
    @ResponseBody  
    public ResponseEntity<?> getFile(@PathVariable String filename) {  
  
        try {  
            return ResponseEntity.ok(resourceLoader.getResource("file:" + Paths.get(UPLOAD_FILE_PAH, filename).toString()));  
        } catch (Exception e) {  
            return ResponseEntity.notFound().build();  
        }  
    } 
}
