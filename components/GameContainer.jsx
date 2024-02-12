import React from 'react';
import { useSelector } from 'react-redux';
import BasicTTT from './BasicTTT';
import style from '../styles/component.module.css';

function GameContainer() {
  const turn = useSelector((state) => state.game.turn);
  const player = useSelector((state) => state.game.player);

  return (
    <div className={style.gamecontainer}>
      <div className={style.topbar}>
        <div className={style.topbaricon}>
          <img src={`./svg/${player.id === 1 ? 'cross' : 'circle'}.svg`} alt="" />
          <h1>{player.username}</h1>
        </div>
        <div className={style.turncounter}>
          <h1>Turn</h1>
          <span>
            <img src={`./svg/${turn === 1 ? 'cross' : 'circle'}.svg`} alt="" />
          </span>
          <p>{turn === player.id ? 'Your Turn' : "Opponent's Turn"}</p>
        </div>
        <div className={style.topbaricon}>
          <img src={`./svg/${player.id === 2 ? 'cross' : 'circle'}.svg`} alt="" />
          <h1>Opponent</h1>
        </div>
      </div>
      <div className={style.main}>
        <BasicTTT />
      </div>
    </div>
  );
}

export default GameContainer;
