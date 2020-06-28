#!/usr/bin/perl

use db;

my $n;
$n = @ARGV;

if($n lt 6) {
	print "Error: Invalid arguments\n";
	print "Usage: \n";
	print "\t id name email grade1 grade2 grade3\n";
	exit 1;
}

$id = $ARGV[0];
$name = $ARGV[1];
$email = $ARGV[2];
$grade1 = $ARGV[3];
$grade2 = $ARGV[4];
$grade3 = $ARGV[5];
db::insertData($id, $name, $email, $grade1, $grade2, $grade3);
print "Data inserted\n";

exit 0
