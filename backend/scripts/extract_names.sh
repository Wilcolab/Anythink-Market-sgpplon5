#!/bin/bash
filename=$1
email_matches=$(grep -i "@amazon.com" "$filename")
name_surname=$(echo "$email_matches" | awk -F ',' '{printf("%s %s \n", $3, $2)}')
echo "$name_surname" >> output_names.txt 