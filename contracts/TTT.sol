pragma solidity 0.4.11;

contract TTT
{
    uint8[] _board = new uint8[](9);
    address _owner;
    
    address _player1;
    address _player2;
    address _lastWinner;

    bool _openSlots = true;
    bool _gameInProgress = false;

    uint8 _playerTurn;
    uint _winner;

    uint[][] _winStates = [[0,1,2],[3,4,5],[6,7,8], 
                          [0,3,6],[1,4,7],[2,5,8], 
                          [0,4,8],[2,4,6]];
    
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
        _openSlots = false;
        _gameInProgress = true;

        _playerTurn = 1;
    }

    function EndGame() private
    {
        _openSlots = true;
        _gameInProgress = false;

        _lastWinner = GetWinnerAddress();
        delete _player1;
        delete _player2;

        _playerTurn = 0;
    }

    function MakeMove(uint8 place) public
    CheckIfPlayersTurn
    CheckIfLegalMove(place)
    {
        _board[place - 1] = _playerTurn;

        _winner = LookForWinner();
        
        if (_winner != 0) 
        { 
            EndGame();
            return;
        }

        TogglePlayerTurn();
    }
    
    function TogglePlayerTurn() private
    {
        if (_playerTurn == 1) { _playerTurn = 2; return; }
        
        if (_playerTurn == 2) { _playerTurn = 1; return; }
    }

    function LookForWinner() private
    returns (uint)
    {
        for (uint i = 0; i < 8; i++)
        {
            uint[] memory b = _winStates[i];

            if (_board[b[0]] != 0 && 
                _board[b[0]] == _board[b[1]] && 
                _board[b[0]] == _board[b[2]])

            return _board[b[0]]; 
        }

        return 0;
    } 

    function GetLastWinnerAddress() public constant
    returns (address)
    {
        return _lastWinner;
    }

    function GetWinnerAddress() private 
    returns (address)
    {
        if (_winner == 1)
            return _player1;
        else if (_winner == 2)
            return _player2;

        return 0x0;
    }

    function GameState() public constant 
    returns(string, string, string) 
    {
        if (_winner > 0)
            return ("Check Last Winner", "GetLastWinnerAddress", "GG WP" );

        bytes[3] memory rows;
        rows[0] = new bytes(3);
        rows[1] = new bytes(3);
        rows[2] = new bytes(3);

        byte[] memory signs = new byte[](3);
        signs[0] = "-";
        signs[1] = "X";
        signs[2] = "O";
        
        uint8 l = 0;
        for (uint8 r = 0; r < 3; r++)
        {
            for (uint8 i = 0; i < 3; i++)
            {
                bytes(rows[r])[i] = signs[_board[l++]];
            }
        }
        
        return (string(rows[0]), string(rows[1]), string(rows[2]));
    }

    // Checks if 0-9 and it not occupied
    modifier CheckIfLegalMove(uint8 place)
    {
        require(place > 0);
        require(place <= 9);

        require(_board[place - 1] == 0);
        _;
    }

    modifier CheckIfPlayersTurn()
    {
        if ((_playerTurn == 1 && msg.sender == _player1) 
        || (_playerTurn == 2 && msg.sender == _player2))
        _;
        else
            throw;
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

    function WaitingForPlayersMove() public constant
    returns (address)
    { 
        if (_playerTurn == 0)
            return 0x0;
        else if (_playerTurn == 1)
        {
            return _player1;
        }
        else if (_playerTurn == 2)
        {
            return _player2;
        }
    }

    function CanIJoin() public constant
    returns (bool)
    { return _openSlots; }
}