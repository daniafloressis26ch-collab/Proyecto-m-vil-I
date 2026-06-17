// src/components/Calculator/History/History.tsx
import React from 'react';
import styles from './History.module.css';
import type { Operation } from '../../../types/calculator';

interface HistoryProps {
  history: Operation[];
  onClearHistory: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onClearHistory }) => {
  return (
    <div className={styles.historyContainer}>
      <div className={styles.header}>
        <h3>Historial</h3>
        {history.length > 0 && (
          <button className={styles.clearBtn} onClick={onClearHistory}>
            Borrar
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <p className={styles.empty}>No hay operaciones recientes</p>
      ) : (
        <ul className={styles.list}>
          {history.map((op) => (
            <li key={op.id} className={styles.item}>
              <span className={styles.expression}>{op.expression} =</span>
              <span className={styles.result}>{op.result}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;