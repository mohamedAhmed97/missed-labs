#!/usr/bin/perl
## Script create a server that listen on port 7777

use strict;
use Socket;
use db;

my $SERVERPORT = 7777;
my $SERVERIP = "127.0.0.1";
my $PAADDR;
my $id;
my $retval;
my @data;

#SERVERD : Socket Descriptor
#PF_INET: IP V4
#SOCK_STREAM: TCP

socket(SERVERD, PF_INET, SOCK_STREAM, getprotobyname("tcp"));
bind(SERVERD, sockaddr_in($SERVERPORT, inet_aton($SERVERIP))) or die "Can not bind $! \n";
listen(SERVERD, SOMAXCONN) or die "Can not listen";

while ($PAADDR = accept(CLIENTD, SERVERD)) {
	print "Incoming connection .. \n";

	$id = fork();

	if ($id == 0) { # Child
		while (<CLIENTD>) {
			chomp;
			@data = split(":", $_);

			if (@data[0] eq "r") {
				$retval = db::register(@data[1], @data[2], @data[3]);

				if ($retval == 1) {
					syswrite CLIENTD, "Invalid given data\n";
				}
				elsif ($retval == 2) {
					syswrite CLIENTD, "Email already exists\n";
				}
				else {
					syswrite CLIENTD, "User registered\n";
				}
			}
			elsif (@data[0] eq "l") {
				$retval = db::login(@data[1], @data[2]);

				if ($retval == 1) {
					syswrite CLIENTD, "Invalid given data\n";
				}
				elsif ($retval == 2) {
					syswrite CLIENTD, "Credentials not valid\n";
				}
				else {
					syswrite CLIENTD, "User Logged in\n";
				}
			}
		}

		close(CLIENTD);
	}
}

close(SERVERD);

exit 0;
