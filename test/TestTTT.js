var TTT = artifacts.require("TTT");

contract("TTT", function(accounts)
{
    var player1 = web3.eth.accounts[0];
    var player2 = web3.eth.accounts[1];

    var stranger = web3.eth.accounts[2];
    
    it ("Should join 2 players", function()
    {
        let ttt;

        return TTT.deployed().then(function(instance)
        {
            ttt = instance;
            return ttt.JoinGame({from: player1});

        }).then(function()
        {
            return ttt.Player1();

        }).then(function(player1Addr)
        {
            assert.equal(player1Addr, player1);
            return ttt.JoinGame({from: player2});
        }).then(function(){
            return ttt.Player2();
        }).then(function(player2Addr)
        {
            assert.equal(player2Addr, player2);
        })
    });

});