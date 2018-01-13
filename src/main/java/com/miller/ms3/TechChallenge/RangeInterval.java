package com.miller.ms3.TechChallenge;

import java.io.Serializable;

public class RangeInterval  implements Serializable{

	private static final long serialVersionUID = 3379582893853130709L;
	
	public RangeInterval() {
		super();
	}
	public RangeInterval(int value, String encoded) {
		super();
		this.value = value;
		this.encoded = encoded;
	}
	
	public int getValue() {
		return value;
	}
	public void setValue(int value) {
		this.value = value;
	}
	
	public String getEncoded() {
		return encoded;
	}
	public void setEncoded(String encoded) {
		this.encoded = encoded;
	} 
	public String toString() { 
	    return "Value: '" + this.value + "', Encoded: '" + this.encoded +  "'";
	} 

	private int value;
	private String encoded;

}
