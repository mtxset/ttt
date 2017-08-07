var TTT = artifacts.require("TTT");

contract("TTT", function(accounts)
{
    var player1 = web3.eth.accounts[0];
    var player2 = web3.eth.accounts[1];

    var realP1Addr;
    var realP2Addr;

    var thirdWheel = web3.eth.accounts[2];
    
    it ("Full Game sequence", function()
    {
        let ttt;

        return TTT.deployed().then(function(instance)
        {
            ttt = instance;
            // First player joins the game
            return ttt.JoinGame({from: player1});   
        }).then(function()
        {
            // Get first player's address
            return ttt.Player1();
        }).then(function(player1Addr)
        {
            // Compare 
            assert.equal(player1Addr, player1);
            // Second player joins the game
            return ttt.JoinGame({from: player2});
        }).then(function()
        {
            // Get second player's address
            return ttt.Player2();
        }).then(function(player2Addr)
        {
            // Compare
            assert.equal(player2Addr, player2);
            // Get which players turn
            return ttt.WaitingForPlayersMove();
        }).then(function(playersTurnAddr)
        {
            // Compare
            assert.equal(playersTurnAddr, player1);
            // Try getting game state 
            return ttt.GameState();
        }).then(function(gameState)
        {
            assert.equal(gameState[0], "---");
            assert.equal(gameState[1], "---");
            assert.equal(gameState[2], "---");

            // Make a move
            return ttt.MakeMove(1, {from:player1});
        }).then(function()
        {
            // Get game state again
            return ttt.GameState();
        }).then(function(gameState)
        {
            assert.equal(gameState[0], "X--");
            assert.equal(gameState[1], "---");
            assert.equal(gameState[2], "---");

            // Make a move 
            return ttt.MakeMove(2, {from:player2});
        }).then(function(){
            return ttt.GameState();
        }).then(function(gameState)
        {
            // progressing game
            assert.equal(gameState[0], "XO-");
            assert.equal(gameState[1], "---");
            assert.equal(gameState[2], "---");

            return ttt.MakeMove(4, {from:player1});
        }).then(function(){
            return ttt.MakeMove(5, {from:player2});
        }).then(function(){
            // Game winning move
            return ttt.MakeMove(7, {from:player1});
        }).then(function(){
            return ttt.GameState();
        }).then(function(gameState){
            
            assert.equal(gameState[2], "GG WP");
            return ttt.GetLastWinnerAddress();
        }).then(function(lastWinnerAddr){
            assert.equal(player1, lastWinnerAddr);
        })
    });

});