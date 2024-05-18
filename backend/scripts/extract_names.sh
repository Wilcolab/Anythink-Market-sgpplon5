#!/bin/bash
filename=$1
output_filename=$2
name_surname=$(grep -i "@amazon.com" "$filename" | awk -F ',' '{printf("%s %s\n", $3, $2)}')
echo "$name_surname" >> "$output_filename"