package utils;

import org.openqa.selenium.WebDriver;

public class OpenSite {
	public static void Open(WebDriver driver) {
        // get()打开一个站点  
        driver.get("http://localhost:8080/backward");  
        //getTitle()获取当前页面title的值  
        System.out.println("当前打开页面的标题是： "+ driver.getTitle());  	
	}
}
