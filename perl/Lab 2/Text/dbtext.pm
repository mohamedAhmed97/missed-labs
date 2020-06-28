#!/usr/bin/perl

package dbtext;

sub insertData {
	my ($id, $name, $email, $grade1, $grade2, $grade3) = @_;

	insertIntoMaster($id, $name, $email);
	insertIntoDetails($id, $grade1, $grade2, $grade3);
}

sub insertIntoMaster {
	my ($id, $name, $email) = @_;

	open(MYFILE, ">>master") or die "Error: Can not open file";

	print MYFILE "$id:$name:$email\n";

	close(MYFILE);
}

sub insertIntoDetails {
	my ($id, $grade1, $grade2, $grade3) = @_;

	open(MYFILE, ">>details") or die "Error: Can not open file";

	print MYFILE "1:$id:$grade1\n";
	print MYFILE "2:$id:$grade2\n";
	print MYFILE "3:$id:$grade3\n";

	close(MYFILE);
}

sub deleteData {
	my $id = @_[0];

	deleteFromMaster($id);
	deleteFromDetails($id);
}

sub deleteFromMaster {
	my $uid = @_[0];
	my @lines;
	my $id;
	my $name;
	my $email;

	open(MYFILE, "<master") or die "Error: Can not open file";

	@lines = <MYFILE>;
	close(MYFILE);

	open(MYFILE, ">master") or die "Error: Can not open file";

	foreach(@lines) {
		chomp;
		($id, $name, $email) = split(":", $_);

		if($id != $uid) {
			print MYFILE "$_\n";
		}
	}

	close(MYFILE);
}

sub deleteFromDetails {
	my $uid = @_[0];
	my @lines;
	my $seq;
	my $id;
	my $grade;

	open(MYFILE, "<details") or die "Error: Can not open file";

	@lines = <MYFILE>;
	close(MYFILE);

	open(MYFILE, ">details") or die "Error: Can not open file";

	foreach(@lines) {
		chomp;
		($seq, $id, $grade) = split(":", $_);

		if($id != $uid) {
			print MYFILE "$_\n";
		}
	}

	close(MYFILE);
}

sub printData {
	my $id = @_[0];

	printFromMaster($id);
	printFromDetails($id);
}

sub printFromMaster {
	my $uid = @_[0];
	my @lines;
	my $line;
	my $id;
	my $name;
	my $email;

	open(MYFILE, "<master") or die "Error: Can not open file";

	@lines = <MYFILE>;
	close(MYFILE);

	foreach(@lines) {
		chomp;
		($id, $name, $email) = split(":", $_);

		if($id == $uid) {
			print "ID: " . $id . "\n";
			print "Name: " . $name . "\n";
			print "Email: " . $email . "\n";
			last;
		}
	}
}

sub printFromDetails {
	my $uid = @_[0];
	my @lines;
	my $line;
	my $seq;
	my $id;
	my $grade;
	my $i = 1;

	open(MYFILE, "<details") or die "Error: Can not open file";

	@lines = <MYFILE>;
	close(MYFILE);

	foreach(@lines) {
		chomp;
		($seq, $id, $grade) = split(":", $_);

		if($id == $uid) {
			print "Grade $i: " . $grade . "\n";
			$i = $i + 1;
		}
	}
}
1;
