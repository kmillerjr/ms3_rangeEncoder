
package com.miller.ms3.TechChallenge;

import org.mule.api.MuleEventContext;
import org.mule.api.MuleMessage;
import org.mule.api.lifecycle.Callable;

public class RangeEncoder implements Callable {

	@Override
	public Object onCall(MuleEventContext eventContext) throws Exception {

		// get the properties from the message
		int startValue;
		int endValue;
		boolean reversed;
		RangeInterval[] encodedRange;
		MuleMessage message = eventContext.getMessage();

		try {
			startValue = Integer.parseInt(message.getInvocationProperty("startValue").toString());
			endValue = Integer.parseInt(message.getInvocationProperty("endValue").toString());
			reversed = Boolean.parseBoolean(message.getInvocationProperty("reversed", "false"));

			// encode range
			encodedRange = Encode(startValue, endValue, reversed);

		} catch (Exception e) {
			// log error and return empty range
			encodedRange = new RangeInterval[0];
		}
		message.setPayload(encodedRange);
		return message;
	}

	private RangeInterval[] Encode(int startValue, int endValue, boolean reversed) {

		int incrValue = 1; // default to ascending range
		int arrayDirection = 1; // default to forward, not reversed
		int arrayIndex = 0; // default to starting at the beginning of the array
		int arraySize = Math.abs(startValue - endValue) + 1;
		RangeInterval[] encodedRange = new RangeInterval[arraySize];

		// determine direction of iterator
		if (startValue > endValue) {
			// then we need to go in reverse order
			incrValue = -1;
		}

		// determine the direction of the intervals
		if (reversed) {
			arrayDirection = -1;
			arrayIndex = arraySize - 1; // start filling the array from the tail
		}

		// process first value in the range
		int currentValue = startValue;
		encodedRange[arrayIndex] = encodeValue(currentValue);

		// process remaining values in the range
		while (currentValue != endValue) {
			// move to next value in the range
			currentValue = currentValue + incrValue;
			arrayIndex = arrayIndex + arrayDirection;

			// encode current value
			encodedRange[arrayIndex] = encodeValue(currentValue);
		}

		return encodedRange;
	}

	private RangeInterval encodeValue(int value) {

		RangeInterval rangeInterval = new RangeInterval();
		String encodedValue;

		if (value % 3 == 0 && value % 7 == 0) {
			// Multiples of both 7 and 3 convert to “MS3 and ME”
			encodedValue = "MS3 and ME";
		} else if (value % 3 == 0) {
			// Multiples of 3 convert to “ME”,
			encodedValue = "ME";
		} else if (value % 7 == 0) {
			// Multiples of 7 convert to “MS3”
			encodedValue = "MS3";
		} else {
			// encoded value is just the integer value
			encodedValue = Integer.toString(value);
		}

		rangeInterval.setValue(value);
		rangeInterval.setEncoded(encodedValue);

		return rangeInterval;
	}
}
