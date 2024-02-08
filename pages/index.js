import Head from 'next/head';
import styles from '../styles/Home.module.css';
import GameContainer from '../components/GameContainer';

export default function Home() {
  return (
    <div className={styles.container}>
      <GameContainer/>
    </div>
  );
}
