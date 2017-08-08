"Simple Tiku-Taku-Tak game for Ethereum Blockchain" 

Avoiding solidity tests because they run way too slowly.

Using TypeScript to transpile into JavaScript tests

There are two branches: Free TTT (master) and TTT with entry fee (payable)

Using
=====
Truffle, TestRPC, TypeScript

Download
========

Free TTT

    git clone http://github.com/mtxset/ttt

TTT with entry fee

    git clone -b payable http://github.com/mtxset/ttt

Run
===

    testrpc
    truffle compile
    truffle migrate
    truffle test