#!/usr/bin/perl

use dbtext;

my $n;
$n = @ARGV;

if($n lt 1) {
	print "Error: Invalid arguments\n";
	print "Usage: \n";
	print "\t id\n";
	exit 1;
}

$id = $ARGV[0];
dbtext::deleteData($id);
print "Data deleted\n";

exit 0
