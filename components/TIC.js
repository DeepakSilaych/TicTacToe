import React from 'react';
import { useDispatch } from 'react-redux';
import { setTicValue } from '../redux/gameSlice';
import styles from '../styles/component.module.css';

function TIC({ id, value, onClick }) {
  const a = [0,0,0,0]
  const radius = .1;
  if (id === 0) a[0] = radius;
  if (id === 2) a[1] = radius;
  if (id === 6) a[3] = radius;
  if (id === 8) a[2] = radius;
  const borderRadius = {
    borderRadius: `${a[0]*10}rem ${a[1]*10}rem ${a[2]*10}rem ${a[3]*10}rem`
  }

  return (
    <div className={styles.tic} style={borderRadius} onClick={onClick}>
      {value === '1' && 'X'}
      {value === '2' && 'O'}
    </div>
  );
}

export default TIC;
