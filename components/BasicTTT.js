import React, { useEffect } from 'react';
import TIC from './TIC';
import style from '../styles/component.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setTurn, setBoard, setGameStatus } from '../redux/gameSlice';
import axios from 'axios';

function BasicTTT() {
  const turn = useSelector((state) => state.game.turn);
  const gameId = useSelector((state) => state.game.gameId);
  const gameStatus = useSelector((state) => state.game.gameStatus);
  const player = useSelector((state) => state.game.player);
  const board = useSelector((state) => state.game.board); 
  console.log(board);

  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const getGameData = async () => {
        if (gameStatus.status === 2) {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/game/game_status/${gameId}/`);
            dispatch(setBoard(response.data.board));
            dispatch(setTurn(response.data.turn));
            if (response.game.winner){
              clearInterval(intervalId)
              window.alert(response.game.winner)
            }
          } catch (error) {
            console.error('Error fetching game data:', error);
          }
        }
      };
      getGameData();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [gameId, gameStatus.status, dispatch]);

  const handleClick = async (id) => {
    console.log('clicked', id);
    if (turn === player.id) {
      console.log('turn:', turn);
      const data = {
        'player': turn,
        'tic_id': id
      };
      if (board[id] === '-') {
        console.log('making move');
        console.log(gameId, data);
        try {
          const response = await axios.post(`http://127.0.0.1:8000/game/move/${gameId}/`, data );
          console.log(response.data);
        } catch (error) {
          console.error('Error making move:', error);
        }
      }
    }
  };

  return (
    <div className={style.BasicTTT}>
      {board.split('').map((value, id) => (
        <TIC key={id} id={id} value={value} onClick={() => handleClick(id)} />
      ))}
    </div>
  );
}

export default BasicTTT;
