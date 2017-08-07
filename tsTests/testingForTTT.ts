const TTT = artifacts.require("TTT")
import {expectThrow} from "./helpers/index"
import * as assert from "assert"

let player1, player2, thirdWheel;
let ttt = null;

contract("TTT", (accounts)=> {

    before(async()=>
    {
        ttt = await TTT.deployed()
        player1 = accounts[0];
        player2 = accounts[1];
        thirdWheel = accounts[2];
    });
    
    contract("Players joining", ()=>
    {
        it("2 Players should join ", async()=> 
        {

            await ttt.JoinGame({from: player1});
            assert.equal(await ttt.Player1(), player1,"Addresses should be equal")

            await ttt.JoinGame({from: player2});
            assert.equal(await ttt.Player2(), player2, "Addresses should be equal")
        });

        it("3 player should not be able to join", async() => {
            await expectThrow(ttt.JoinGame({from:thirdWheel}));

            assert.equal(await ttt.Player1(), player1, "Addresses should be equal")
            assert.equal(await ttt.Player2(), player2, "Addresses should be equal")
        });
    })

    contract("Test reset: Players joining again", ()=>
    {
        it("2 Players can join again", async()=>
        {
            ttt.JoinGame({from: player1});
            assert.equal(await ttt.Player1(), player1,"Addresses should be equal")

            ttt.JoinGame({from: player2});
            assert.equal(await ttt.Player2(), player2, "Addresses should be equal")
        })
    })

    contract("Full Game Sequence", async()=>
    {
        it("Should play full game", async()=>
        {
            await ttt.JoinGame({from: player1})
            await ttt.JoinGame({from: player2})

            assert.equal(await ttt.Player1(), player1,"Addresses should be equal")
            assert.equal(await ttt.Player2(), player2,"Addresses should be equal")

            assert.equal(await ttt.WaitingForPlayersMove(), player1, "Addresses should match")

            let gameState = await ttt.GameState()

            assert.equal(gameState[0], "---"); 
            assert.equal(gameState[1], "---"); 
            assert.equal(gameState[2], "---");

            // Make first move
            await ttt.MakeMove(1, {from: player1})

            gameState = await ttt.GameState()

            assert.equal(gameState[0], "X--"); 
            assert.equal(gameState[1], "---"); 
            assert.equal(gameState[2], "---");

            await ttt.MakeMove(2, {from: player2})

            gameState = await ttt.GameState()

            assert.equal(gameState[0], "XO-"); 
            assert.equal(gameState[1], "---"); 
            assert.equal(gameState[2], "---");

            await ttt.MakeMove(4, {from: player1})
            await ttt.MakeMove(5, {from: player2})
            await ttt.MakeMove(7, {from: player1})

            gameState = await ttt.GameState()

            assert.equal(gameState[2], "GG WP");

            // check for winner address
            assert.equal(await ttt.GetLastWinnerAddress(), player1);
        })
    })

})