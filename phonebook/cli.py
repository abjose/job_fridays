#!/usr/bin/env python


'''Phonebook management tool for HackerSchool job-prep Friday

Usage:
    phonebook.py create <phonebook>
    phonebook.py (add|change) <name> <number> <phonebook>
    phonebook.py (lookup|remove) <name> <phonebook>
    phonebook.py reverse-lookup <number> <phonebook>
    phonebook.py (-h | --help)
    phonebook.py --version

Options:
    -h --help   Show this screen.
    --version   Show version.
'''


# WRITE TESTS!!
# can move imports above docstring?

import re
from docopt import docopt
from phonebook import Phonebook


if __name__=='__main__':
    # parse call
    args = docopt(__doc__, version='Phonebook 0.1')
    with Phonebook(args['name']) as pb:
        print "in 'with' statement"
        pb.do_command(args)

    #phonebook = args['<phonebook>']
    #number = args['<number>']
    #name = args['<name>']
    #if args['create']:
    #    print phonebook
    #if args['add']:
    #    print name, number, phonebook
    #if args['change']:
    #    print name, number, phonebook
    #if args['lookup']:
    #    print name, phonebook
    #if args['remove']:
    #    print name, phonebook
    #if args['reverse-lookup']:
    #    print number, phonebook

