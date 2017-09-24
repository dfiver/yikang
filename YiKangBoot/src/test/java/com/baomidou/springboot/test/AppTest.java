package com.baomidou.springboot.test;

import com.baomidou.mybatisplus.toolkit.Sequence;

/**
 * Created by jobob on 17/5/16.
 */
public class AppTest {
	public static void main(String argv[]){
		Sequence sequence = new Sequence();
		for(int i=0; i< 100; ++i){
			long id = sequence.nextId();
			System.out.println(id);
		}
	}
}
