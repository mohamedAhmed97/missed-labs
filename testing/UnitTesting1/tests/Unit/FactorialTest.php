<?php
	class FactorialTest extends \PHPUnit\Framework\TestCase {
		public static function setupBeforeClass() : void {
		}
		public static function teardownAfterClass() : void {
		}

		public function setup() : void {
			
			$this->factorial = new Factorial([
                               	'factorial' => 0,
       	                ]);
 		}

		public function teardown() : void {

		}


		public function test_factorial_of_0_is_1() {
			$this->assertTrue($this->factorial->getFactorial(0) == 1);

		}

		public function test_factorial_of_1_is_1() {
			$this->assertTrue($this->factorial->checkFactorial(1) == 1);

		}

		public function test_factorial_of_5_is_120() {
			$this->assertTrue($this->factorial->checkFactorial(5) == 120);

		}

		public function test_factorial_of_6_equals_factorial_of_5_multiplied_by_6() {
			$this->assertTrue($this->factorial->checkFactorial(6) == $this->factorial->checkFactorial(5)*6);

		}
	

		public function test_factorial_of_negative_3_is_null() {
			$this->assertTrue($this->factorial->checkFactorial(-3) == null);

		}


		public function test_factorial_of_one_and_half_is_null() {
			$this->assertTrue($this->factorial->checkFactorial(1.5) == null);

		}



		public function test_factorial_of_false_is_null() {
			$this->assertTrue($this->factorial->checkFactorial(false) == null);
		}


		public function test_factorial_of_abc_is_null() {
			$this->assertTrue($this->factorial->checkFactorial('abc') == null);

		}

	}
	