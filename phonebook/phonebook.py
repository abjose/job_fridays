#!/usr/bin/env python
'''Phonebook management tool for HackerSchool job-prep Friday

Usage:
    phonebook.py create <phonebook>
    phonebook.py (add|change) <name> <number> <phonebook>
    phonebook.py (lookup|remove) <name> <phonebook>
    phonebook.py reverse-lookup <number> <phonebook>
    phonebook.py (-h | --help)
    phonebook.py --test
    phonebook.py --version

Options:
    -h --help   Show this screen.
    --version   Show version.
'''

import os.path
from docopt import docopt
import cPickle as pickle

class Phonebook:

    def __init__(self, phonebook):
        # load phonebook (or make new one if doesn't exists)
        self.pb_name = phonebook
        self.pb = None
        #self.pb = self.load()

    def __enter__(self, ):
        return self

    def __exit__(self, type, value, traceback):
        self.save()

    def save(self):
        # only save if a phonebook has been created
        if self.pb != None:
            pickle.dump(self.pb, open(self.pb_name,'wb'))

    def load(self):
        # load phonebook
        if os.path.isfile(self.pb_name):
            self.pb = pickle.load(open(self.pb_name,'rb'))
        else:
            print 'No such phonebook exists.'
        #return dict()

    def create(self):
        if os.path.isfile(self.pb_name):
            print 'That phonebook already exists!'
        else:
            self.pb = dict()
            print 'Created phonebook',self.pb_name,'in current directory'

    def add(self, name, number):
        if name not in self.pb:
            self.pb[name] = number
        else:
            print name,'is already in the phonebook!'

    def change(self, name, number):
        if name in self.pb:
            self.pb[name] = number
        else:
            print name,'is not in the phonebook!'

    def remove(self, name, number):
        if name in self.pb:
            print 'Removing',name,'from the phonebook.'
            del self.pb[name]
        else:
            print name,"wasn't found in the phonebook."

    def lookup(self, name, number):
        names = [n for n in self.pb if name in n]
        if names:
            for n in names:
                print 'Results for lookup:'
                print n,'\t',self.pb[n]
        else:
            print 'No results found for name:',name

    def reverse_lookup(self, name, number):
        numbers = [(name,n) for name,n in self.pb.items() if number in n]
        if numbers:
            for name,num in numbers:
                print 'Results for reverse-lookup:'
                print name,'\t',num
        else:
            print 'No results found for number:',number

    def do_command(self, args):
        phonebook = args['<phonebook>']
        number = args['<number>']
        name = args['<name>']
        if args['create']:
            self.create()

        elif args['add']:
            self.load()
            self.add(name, number)

        elif args['change']:
            self.load()
            self.change(name, number)

        elif args['remove']:
            self.load()
            self.remove(name, number)

        elif args['lookup']:
            # switch to regular expressions?
            self.load()
            self.lookup(name, number)

        elif args['reverse-lookup']:
            self.load()
            self.reverse_lookup(name, number)

if __name__=='__main__':
    # parse call
    args = docopt(__doc__, version='Phonebook 0.1')

    with Phonebook(args['<phonebook>']) as pb:
        pb.do_command(args)

