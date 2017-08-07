pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TTT.sol";

contract TestTTT 
{
    function testInit()
    {
        TTT game = new TTT();

        Assert.equal(game.Player1(), 0, "Player1 should be 0");
        Assert.equal(game.Player2(), 0, "Player2 should be 0");
        Assert.equal(game.CanIJoin(), true, "You should be allowed to join");
    }

}
