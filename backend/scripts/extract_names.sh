#!/bin/bash
read filename
name_surname=$(grep -i "@amazon.com" "$filename" | awk -F ',' '{print $3 " " $2}')
echo $name_surname >> output.txt