package com.yikang.springboot;

import java.io.File;
import java.net.URL;
import java.util.List;

import org.springframework.context.annotation.Bean;
//import org.springboot.sample.interceptor.MyInterceptor1;
//import org.springboot.sample.interceptor.MyInterceptor2;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.baomidou.mybatisplus.entity.GlobalConfiguration;
import com.baomidou.mybatisplus.mapper.LogicSqlInjector;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;


@Configuration
public class MyWebAppConfigurer extends WebMvcConfigurerAdapter {

//	@Override
//	public void addInterceptors(InterceptorRegistry registry) {
//    // 多个拦截器组成一个拦截器链
//    //registry.addInterceptor(new LoginInterceptor ()).addPathPatterns("/rest/**");
//    //registry.addInterceptor(new LoginInterceptor2 ()).addPathPatterns("/rest/**");
//    super.addInterceptors(registry);
//  }

    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        MappingJackson2HttpMessageConverter jackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();
        ObjectMapper objectMapper = new ObjectMapper();
        /**
         * 序列换成json时,将所有的long变成string
         * 因为js中得数字类型不能包含所有的java long值
         */
        SimpleModule simpleModule = new SimpleModule();
        simpleModule.addSerializer(Long.class, ToStringSerializer.instance);
        simpleModule.addSerializer(Long.TYPE, ToStringSerializer.instance);
        objectMapper.registerModule(simpleModule);
        jackson2HttpMessageConverter.setObjectMapper(objectMapper);
        converters.add(jackson2HttpMessageConverter);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        URL u = MyWebAppConfigurer.class.getResource("/");
        File file = new File(u.getPath());
        file = file.getParentFile().getParentFile();
        String frontLocation = file.getParent() + System.getProperty("file.separator") + "YiKangKanban" + System.getProperty("file.separator");
        File path = new File(frontLocation);
        String fronLocationURI = path.toURI().toString();
        registry.addResourceHandler("/**")
                .addResourceLocations(fronLocationURI);
        super.addResourceHandlers(registry);
    }
}
