import styles from '../styles/Home.module.css';

import Footer from '../components/footer';
import GameContainer from '../components/GameContainer';

import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setTurn, setGameStatus} from '../redux/gameSlice';

export default function Game() {
  const [playerjoined, setPlayerJoined] = useState(false);
  const gameId = useSelector((state) => state.game.gameId);
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {

      const getGameId = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/game/waiting/${gameId}/`);
          console.log(response.data);
          if (response.data.is_active === 2) {
            const turn = response.data.turn;

            dispatch(setTurn(turn));
            dispatch(setGameStatus({status: 2, result: null}));

            setPlayerJoined(true);
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error('Error waiting for player:', error);
        }
      };

      getGameId();
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [gameId]);

  return (
    <>
      <div className={styles.container}>
        {playerjoined ? <GameContainer /> :
        <div className={styles.waitingdiv}>
          <h1>
            Game ID: {gameId} <br />
            Waiting for player to join...
          </h1>
        </div>}
      </div>
      <Footer />
    </>
  );
}
