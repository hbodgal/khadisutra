package Khadisutra.khadi;

import java.util.ArrayList;
import java.util.List;

public class SlideShow {
	
	
	public int count;
	List<String> list = new ArrayList<>();

	
	public SlideShow(int count, List<String> list) {
		super();
		this.count = count;
		this.list = list;
	}
	
	
	public SlideShow() {
		super();
	}


	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public List<String> getList() {
		return list;
	}
	public void setList(List<String> list) {
		this.list = list;
	}

	
	

	
	
	
	
	

}
