“MS3 and ME” Technical Challenge
==================================

## Overview:
A web application implemented with JavasScript that calls a Mulesoft API back-end which utilizes an 
algorithm implemented in java.  The back-end algorithm takes in 2 integers representing a range, and 
converts each number in the range, where: 

* Multiples of 7 convert are converted to “MS3”,
* multiples of 3 are convert to “ME”, and 
* multiples of both 7 and 3 convert to “MS3 and ME”.  

The input range has in the Web App has a limit from a minimum of 1 to a maximum of 200. 
the API calls has no limit, and accepts positive and negative numbers.  API response is JSON


## Installation

The application has deployed to cloudhub:
http://ms3-rangeencoder.cloudhub.io

## Usage

No real special instructions to run. 
The values have been populated with defaults, so simply click on the 'Get Encoded' Range button to get the json response and scroll to the bottom to see the table.

If you want the range reversed (normal order is Start Value to End Value), reversed order would be: End Value to Start Value, simply check the 'Reverse Order' check box before you click on the 'Get Encoded' Range button 


Here's the URL to the rest API:
http://ms3-rangeencoder-proxy.cloudhub.io/EncodedRange?startValue=1&endValue=100


## License

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, Ken Miller has waived all copyright and related or neighboring rights to this work.