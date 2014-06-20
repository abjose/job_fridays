#!/bin/bash 
rm test.pb
python phonebook.py create test.pb
python phonebook.py create test.pb
python phonebook.py add 'Sarah Ahmed' '12345' test.pb
python phonebook.py lookup Sarah test.pb
python phonebook.py change 'Sarah Ahmed' '67890' test.pb
python phonebook.py reverse-lookup '678' test.pb
python phonebook.py remove 'Sarah Ahmed' test.pb
python phonebook.py lookup Sarah test.pb