#!/bin/bash
read filename 
email_matches=$(grep -i "@amazon.com" "$filename")
name_surname=$(echo "$email_matches" | awk -F ',' '{printf("%s %s , ", $3, $2)} END {print ""}')
echo "$name_surname" >> output.txt 