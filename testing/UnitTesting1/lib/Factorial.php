<?php 
	class Factorial{
		
		private $factorial=0;

		public function getFactorial($number)
		{ 
		    $result = 1; 
			for ($i = $number; $i >0 ; $i--)
			{ 
		      $result = $result * $i; 
		    } 
		    return $result; 
		} 
		  
		public function checkFactorial($num){
			if (is_int($num)){

					if($num>0){
						$result=$this->getFactorial($num);
						return $result;
					}

					elseif($num<0){
						$result=null;
						return $result;
					}
			
				else{
					return null;
				}

			}
		}
	}