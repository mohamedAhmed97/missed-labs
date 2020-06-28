#!/usr/bin/perl
use strict;

my @array = `cat numbers`;
my $i;

for ($i = 0; $i < @array; $i++) {
	print @array[$i];
}