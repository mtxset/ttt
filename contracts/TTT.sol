pragma solidity 0.4.11;

contract TTT
{
    uint8[] _board = new uint8[](8);
    address _owner;
    
    address _player1;
    address _player2;

    bool _openSlots = true;
    bool _gameInProgress = false;
    
    function TTT()
    {
        _owner = msg.sender;
    }
    
    function Disconnect() public
    {
        if (_player1 == msg.sender)
            delete _player1;
        
        if (_player2 == msg.sender)
            delete _player2;
    }

    function JoinGame() public
    CheckForOpenSlots
    CheckIfNoGames
    CheckIfUniquePlayer
    CheckIf2PlayersConnected
    {
        if (!FillSlot(msg.sender))
            throw;
    }

    function FillSlot(address joiningPlayer) private
    returns (bool)
    {
        if (_player1 == 0)
        {
            _player1 = joiningPlayer;
            return true;
        }
        
        if (_player2 == 0)
        {
            _player2 = joiningPlayer;
            return true;
        }

        return false;
    }

    function StartGame() private
    {

    }

    // Check to avoid same player joining twice
    modifier CheckIfUniquePlayer()
    {
        if (_player1 == msg.sender || _player2 == msg.sender)
            throw;

        _;
    }

    // Checks if both addresses are filled, if so starts game routine
    modifier CheckIf2PlayersConnected()
    {
        _;
        if (_player1 != 0 && _player2 != 0)
        {
            _openSlots = false;
            StartGame();
        }
    }

    modifier CheckIfNoGames()
    {
        require(!_gameInProgress);
        _;
    }

    modifier CheckForOpenSlots()
    {
        require(_openSlots);
        _;
    }

    function Player1() public constant
    returns (address)
    { return _player1; }
    
    function Player2() public constant
    returns (address)
    { return _player2; }

    function CanIJoin() public constant
    returns (bool)
    { return _openSlots; }
}