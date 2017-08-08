const TTT = artifacts.require("TTT")
import {expectThrow} from "./helpers/index"
import * as assert from "assert"

let player1, player2, thirdWheel;
let ttt = null;

let ticketPrice =  3 * 10**15;

function checkBalance(addr):number
{
    return web3.eth.getBalance(addr);
}

contract("TTT Payable", (accounts)=> {

    before(async()=>
    {
        ttt = await TTT.deployed()
        player1 = accounts[0];
        player2 = accounts[1];
        thirdWheel = accounts[2];
    });
    
    contract("Players joining", ()=>
    {
        it("2 Players should join and contract balance increase", async()=> 
        {   
            assert.equal(await checkBalance(ttt.address), 0, "Balances should be 0")

            await ttt.JoinGame({from: player1, value: ticketPrice});
            assert.equal(await ttt.Player1(), player1,"Addresses should be equal")

            await ttt.JoinGame({from: player2, value: ticketPrice});
            assert.equal(await ttt.Player2(), player2, "Addresses should be equal")

            assert.equal(await checkBalance(ttt.address), ticketPrice*2, "Balances should be 0")
        });

        it("3 player should not be able to join", async() => {
            await expectThrow(ttt.JoinGame({from:thirdWheel,value: ticketPrice}));

            assert.equal(await ttt.Player1(), player1, "Addresses should be equal")
            assert.equal(await ttt.Player2(), player2, "Addresses should be equal")
        });
    })

    contract("Test join without paying, underpaying, overpaying", ()=>
    {
        it("Player can't join without paying", async()=>
        {
            expectThrow(ttt.JoinGame({from: player1}));
            assert.equal(await ttt.Player1(), 0,"Addresses should be equal")
        })

        it("Player can't join because of underpaying", async()=>
        {
            expectThrow(ttt.JoinGame({from: player1, value: ticketPrice - 1}));
            assert.equal(await ttt.Player1(), 0,"Addresses should be equal")
        })

        it("Player can't join because of overpaying", async()=>
        {
            expectThrow(ttt.JoinGame({from: player1, value: ticketPrice + 1}));
            assert.equal(await ttt.Player1(), 0,"Addresses should be equal")
        })
    })

    contract("Full Game Sequence payable", async()=>
    {
        it("Should play full game", async()=>
        {
            await ttt.JoinGame({from: player1, value: ticketPrice})
            await ttt.JoinGame({from: player2, value: ticketPrice})

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

            // get Balance for p1
            let balance = await checkBalance(player1);

            // make winning move
            await ttt.MakeMove(7, {from: player1})

            gameState = await ttt.GameState()
            // expect some maneyyy
            assert(balance < await checkBalance(player1))
            assert.equal(gameState[2], "GG WP");

            // check for winner address
            assert.equal(await ttt.GetLastWinnerAddress(), player1);
        })
    })

})