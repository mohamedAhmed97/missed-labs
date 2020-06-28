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

sub insertData {
	my ($id, $name, $email, $grade1, $grade2, $grade3) = @_;

	insertIntoMaster($id, $name, $email);
	insertIntoDetails($id, $grade1, $grade2, $grade3);
}

sub insertIntoMaster {
	my ($id, $name, $email) = @_;
	my $DSN;
	my $DBH;
	my $SQLSTMT;

	$DSN = "DBI:mysql:database=$DBSETTINGS{'DBNAME'};host=$DBSETTINGS{'DBHOST'}";
	$DBH = DBI->connect($DSN, $DBSETTINGS{"DBUSER"}, $DBSETTINGS{"DBPASS"});

	$SQLSTMT = $DBH->prepare("insert into master values ($id, '$name', '$email')") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";

	$SQLSTMT->finish;
}

sub insertIntoDetails {
	my ($id, $grade1, $grade2, $grade3) = @_;
	my $DSN;
	my $DBH;
	my $SQLSTMT;

	$DSN = "DBI:mysql:database=$DBSETTINGS{'DBNAME'};host=$DBSETTINGS{'DBHOST'}";
	$DBH = DBI->connect($DSN, $DBSETTINGS{"DBUSER"}, $DBSETTINGS{"DBPASS"});

	$SQLSTMT = $DBH->prepare("insert into details values (1, $id, $grade1)") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";
	$SQLSTMT = $DBH->prepare("insert into details values (2, $id, $grade2)") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";
	$SQLSTMT = $DBH->prepare("insert into details values (3, $id, $grade3)") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";

	$SQLSTMT->finish;
}

sub deleteData {
	my $id = @_[0];

	deleteFromMaster($id);
	deleteFromDetails($id);
}

sub deleteFromMaster {
	my $id = @_[0];
	my $DSN;
	my $DBH;
	my $SQLSTMT;

	$DSN = "DBI:mysql:database=$DBSETTINGS{'DBNAME'};host=$DBSETTINGS{'DBHOST'}";
	$DBH = DBI->connect($DSN, $DBSETTINGS{"DBUSER"}, $DBSETTINGS{"DBPASS"});

	$SQLSTMT = $DBH->prepare("delete from master where id = $id") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";

	$SQLSTMT->finish;
}

sub deleteFromDetails {
	my $id = @_[0];
	my $DSN;
	my $DBH;
	my $SQLSTMT;

	$DSN = "DBI:mysql:database=$DBSETTINGS{'DBNAME'};host=$DBSETTINGS{'DBHOST'}";
	$DBH = DBI->connect($DSN, $DBSETTINGS{"DBUSER"}, $DBSETTINGS{"DBPASS"});

	$SQLSTMT = $DBH->prepare("delete from details where id = $id") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";

	$SQLSTMT->finish;
}

sub printData {
	my $id = @_[0];

	printFromMaster($id);
	printFromDetails($id);
}

sub printFromMaster {
	my $id = @_[0];
	my $DSN;
	my $DBH;
	my $SQLSTMT;
	my $Rec;

	$DSN = "DBI:mysql:database=$DBSETTINGS{'DBNAME'};host=$DBSETTINGS{'DBHOST'}";
	$DBH = DBI->connect($DSN, $DBSETTINGS{"DBUSER"}, $DBSETTINGS{"DBPASS"});

	$SQLSTMT = $DBH->prepare("select * from master where id = $id") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";

	if ($Rec = $SQLSTMT->fetchrow_hashref()) {
		print "ID: " . $Rec->{"id"} . "\n";
		print "Name: " . $Rec->{"name"} . "\n";
		print "Email: " . $Rec->{"email"} . "\n";
	}

	$SQLSTMT->finish;
}

sub printFromDetails {
	my $id = @_[0];
	my $DSN;
	my $DBH;
	my $SQLSTMT;
	my $Rec;
	my $i = 1;

	$DSN = "DBI:mysql:database=$DBSETTINGS{'DBNAME'};host=$DBSETTINGS{'DBHOST'}";
	$DBH = DBI->connect($DSN, $DBSETTINGS{"DBUSER"}, $DBSETTINGS{"DBPASS"});

	$SQLSTMT = $DBH->prepare("select * from details where id = $id") or die "$DBH->errstr()";
	$SQLSTMT->execute() or die "$DBH->errstr()";

	while ($Rec = $SQLSTMT->fetchrow_hashref()) {
		print "Grade $i: " . $Rec->{"grade"} . "\n";
		$i = $i + 1;
	}

	$SQLSTMT->finish;
}

readDBSettings();

1;
