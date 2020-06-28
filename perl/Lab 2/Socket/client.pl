#!/usr/bin/perl
## Script create a tcp client, connects to the server to port 7777

use strict;
use Socket;
use db;

my $TOPORT = 7777;
my $TPIP = "127.0.0.1";

socket(MYSOCKET, PF_INET, SOCK_STREAM, getprotobyname("tcp"));
connect(MYSOCKET, sockaddr_in($TOPORT, inet_aton($TPIP))) or die "Can not connect to server $! \n";

while (<>) {
	chomp;

	syswrite MYSOCKET, "$_\n";

	while (<MYSOCKET>) {
		chomp;

		print "$_\n";
	}
}

close(MYSOCKET);

exit 0;
