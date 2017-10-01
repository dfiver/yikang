package com.yikang.springboot.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class RootController {

	@RequestMapping("/backward/**")
	public ModelAndView redirectBackwardRequest() {
		return new ModelAndView("index");
	}
	
	@RequestMapping("/linescreen/**")
	public ModelAndView redirectLinescreenRequest() {
		return new ModelAndView("index");
	}
}
