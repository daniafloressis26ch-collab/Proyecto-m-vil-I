// src/components/Calculator/ButtonPad/ButtonPad.tsx
import React from 'react';
import Button from '../Button/Button';
import styles from './ButtonPad.module.css';
import type { Operator } from '../../../types/calculator';

interface ButtonPadProps {
  onNumberClick: (num: string) => void;
  onOperatorClick: (op: Operator) => void;
  onClearClick: () => void;
  onBackspaceClick: () => void;
  onEqualsClick: () => void;
}

const ButtonPad: React.FC<ButtonPadProps> = ({
  onNumberClick,
  onOperatorClick,
  onClearClick,
  onBackspaceClick,
  onEqualsClick,
}) => {
  return (
    <div className={styles.pad}>
      {/* Fila 1: Ahora tiene C y ← juntos, seguidos de potencia y división */}
      <Button label="C" onClick={onClearClick} variant="special" />
      <Button label="←" onClick={onBackspaceClick} variant="special" />
      <Button label="^" onClick={() => onOperatorClick('^')} variant="operator" />
      <Button label="/" onClick={() => onOperatorClick('/')} variant="operator" />

      {/* Fila 2 */}
      <Button label="7" onClick={() => onNumberClick('7')} />
      <Button label="8" onClick={() => onNumberClick('8')} />
      <Button label="9" onClick={() => onNumberClick('9')} />
      <Button label="*" onClick={() => onOperatorClick('*')} variant="operator" />

      {/* Fila 3 */}
      <Button label="4" onClick={() => onNumberClick('4')} />
      <Button label="5" onClick={() => onNumberClick('5')} />
      <Button label="6" onClick={() => onNumberClick('6')} />
      <Button label="-" onClick={() => onOperatorClick('-')} variant="operator" />

      {/* Fila 4 */}
      <Button label="1" onClick={() => onNumberClick('1')} />
      <Button label="2" onClick={() => onNumberClick('2')} />
      <Button label="3" onClick={() => onNumberClick('3')} />
      <Button label="+" onClick={() => onOperatorClick('+')} variant="operator" />
      
      {/* Fila 5: El 0 ocupa 1 espacio y el '=' ocupa los 3 restantes */}
      <div></div>
        <Button label="0" onClick={() => onNumberClick('0')} />
        <Button label="=" onClick={onEqualsClick} variant="equals" />
    </div>
  );
};

export default ButtonPad;