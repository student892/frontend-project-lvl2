#!/usr/bin/env node
import program from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .option('-F, -f, --format [type]', 'output format', 'stylish')
  .helpOption('-H, -h, --help', 'output usage information');

program.parse(process.argv);
