import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import { useDispatch } from 'react-redux';
import { setGameId, setPlayer } from '../redux/gameSlice';
import Footer from '../components/footer';

export default function Home() {
  const [username, setUsername] = useState('');
  const [newGameId, setNewGameID] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const handleStartGame = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/game/create_game/', { username });
      const gameid = response.data.game_id;

      console.log(gameid);
      dispatch(setGameId(gameid));
      dispatch(setPlayer({id: 1, username: username}));
      router.push(`/game/`);

    } catch (error) {
      console.error('Error starting game:', error);

    }
  }

  const handleJoinGame = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/game/join_game/${newGameId}/`, { username });
      const gameId = response.data.game_id;
      dispatch(setGameId(gameId));
      dispatch(setPlayer({id: 2, username: username}));
      router.push(`/game/`);
    } catch (error) {
      alert('Game not found');
    }
  }

  return (
    <div className={styles.container}>

      <div className={styles.logocontainer}>
        <img src="./img/tac.png" alt="" />
        <img src="./img/tic.png" alt="" />
        <img src="./img/toe.png" alt="" />
      </div>
      <main className={styles.main}>
        <input
          type="text"
          name="name"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="button" onClick={handleStartGame}>
          Start New Game
        </button>
        <div className={styles.joindiv}>
          <h3>Ask your friend for GameID!!</h3>
          <span className={styles.joinspan}>
            <input
              type="text"
              name="mode"
              placeholder="Enter Game ID"
              value={newGameId}
              onChange={(e) => setNewGameID(e.target.value)}
            />
            <button type="button" onClick={handleJoinGame}>
              Join Existing Game
            </button>
          </span>
        </div>
      </main>
      <section className={styles.aboutsection}>
        <h1>How to play</h1>
        <p>
        Tic-Tac-Toe is a game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner.
        </p>
      </section>

      <section className={styles.aboutsection}>
        <h1>Rules</h1>
        <div className={styles.rules}>
          <img src="./img/ttt.jpg" alt="" />
          <p>
            The game is played on a grid that's 3 squares by 3 squares.
            <br />
            You are X, your friend (or the computer in this case) is O. Players take turns putting their marks in empty squares.
            <br />
            The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.
            When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.
          </p>
        </div>
      </section>

      <section className={styles.aboutsection}>
        <h1>History</h1>
        <p>
        Tic-tac-toe (American English), noughts and crosses (Commonwealth English), or Xs and Os is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a diagonal, horizontal, or vertical row is the winner. It is a solved game with a forced draw assuming best play from both players.
        </p>

        <p>
        The game's history can be traced back to ancient Egypt, where it was played on boards carved into roofing slates. The game has been played in various forms since the Roman Empire, and
        </p>
      </section>

      <Footer />
      
    </div>
  );
}
