package inttest;

import java.io.File;
import java.net.URL;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import utils.OpenSite;

public class LoginTest {
	
	private WebDriver driver; 
	
	@BeforeClass
	public static void init() {
        URL u =  LoginTest.class.getResource("/");
        File file = new File(u.getPath());
        file = file.getParentFile().getParentFile();
        String frontLocation = file.getPath() + System.getProperty("file.separator") + "Tools" + System.getProperty("file.separator");
        System.out.println(frontLocation);
	
		System.setProperty("webdriver.chrome.driver", frontLocation+"chromedriver.exe");  
	}
		
	@BeforeMethod
	public void open() {		
        //初始化一个chrome浏览器实例，实例名称叫driver  
        driver = new ChromeDriver();  
        //最大化窗口  
        driver.manage().window().maximize();  
        //设置隐性等待时间 10秒
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);  
        OpenSite.Open(driver);
                    		
	}
	
	@Test
	public void testLogin() {
		driver.findElement(By.xpath("//*[@id=\"mainContainer\"]/div/div/div[2]/div/form/div[1]/input")).sendKeys("admin");
		driver.findElement(By.xpath("//*[@id=\"mainContainer\"]/div/div/div[2]/div/form/div[2]/input")).sendKeys("123456");
		driver.findElement(By.cssSelector("#mainContainer > div > div > div:nth-child(2) > div > form > button")).click();
		Assert.assertTrue(driver.findElement(By.xpath("//*[@id=\"mainContainer\"]/div/nav/div/div/a")).getText().equals("益康"));
	}
	
	
	@AfterMethod
	public void close() {
        //关闭并退出浏览器  
        driver.quit();  		
	}
}
