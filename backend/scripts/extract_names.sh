#!/bin/bash
read filename 
name_surname=$(grep -i "@amazon.com" "$filename" | awk -F ',' '{printf("%s %s,", $3, $2)} END {print " "}')
echo "$name_surname" >> output.txt 