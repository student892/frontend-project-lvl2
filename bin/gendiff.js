#!/usr/bin/env node
import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);
