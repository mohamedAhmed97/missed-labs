#!/usr/bin/perl

use strict;
use DBI;

package db;

my %DBSETTINGS;

sub readDBSettings {
	my @lines;
	my $VAR;
	my $VAL;
	open(FH, "<appsettings") or die "Cannot open db settings file\n";
	@lines = <FH>;
	close(FH);

	foreach (@lines) {
		chomp;
		($VAR, $VAL) = split("=", $_);
		$DBSETTINGS{$VAR} = $VAL;
	}
}

sub register {
	my ($name, $email, $password) = @_;

	if ($name eq "" || $email eq "" || $password eq "") {
		return 1
	}

	my $DSN;
	my $DBH;
	my $SQLSTMT;
	my $Rec;

	$DSN = "DBI:mysql:database=$DBSETTINGS{'DBNAME'};host=$DBSETTINGS{'DBHOST'}";
	$DBH = DBI->connect($DSN, $DBSETTINGS{"DBUSER"}, $DBSETTINGS{"DBPASS"});

	$SQLSTMT = $DBH->prepare("select * from users where email = '$email'") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";
	$Rec = $SQLSTMT->fetchrow_hashref();
	$SQLSTMT->finish;

	if ($Rec) {
		return 2;
	}

	$SQLSTMT = $DBH->prepare("insert into users (name, email, password) values ('$name', '$email', '$password')") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";

	$SQLSTMT->finish;

	return 0;
}

sub login {
	my ($email, $password) = @_;

	if ($email eq "" || $password eq "") {
		return 1
	}

	my $DSN;
	my $DBH;
	my $SQLSTMT;
	my $Rec;

	$DSN = "DBI:mysql:database=$DBSETTINGS{'DBNAME'};host=$DBSETTINGS{'DBHOST'}";
	$DBH = DBI->connect($DSN, $DBSETTINGS{"DBUSER"}, $DBSETTINGS{"DBPASS"});

	$SQLSTMT = $DBH->prepare("select * from users where email = '$email' and password = '$password'") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";
	$Rec = $SQLSTMT->fetchrow_hashref();
	$SQLSTMT->finish;

	if ($Rec) {
		return 0;
	}

	return 2;
}

readDBSettings();

1;
