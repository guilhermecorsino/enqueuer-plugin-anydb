# enqueuer-plugin-anydb

[![npm version](https://badge.fury.io/js/enqueuer-plugin-anydb.svg)](https://badge.fury.io/js/enqueuer-plugin-anydb) [![Build Status](https://travis-ci.org/guilhermecorsino/enqueuer-plugin-anydb.svg?branch=master)](https://travis-ci.org/guilhermecorsino/enqueuer-plugin-anydb)

Enqueuer plugin to enable any database manipulation

## Currently supported actuators

- mondogb
- postgres
- dynamodb

## Usage

    npm install enqueuer enqueuer-plugin-anydb
    nqr <testing-file> -l enqueuer-plugin-anydb
