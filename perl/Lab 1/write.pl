#!/usr/bin/perl
use strict;

my $i;

for ($i = 1; $i <= 1000; $i++) {
	print `echo $i >> numbers`;
}