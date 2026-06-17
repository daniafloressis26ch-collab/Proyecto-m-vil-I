// src/components/Calculator/Calculator.tsx
import React, { useState, useEffect } from 'react';
import Display from './Display/Display';
import ButtonPad from './ButtonPad/ButtonPad';
import History from './History/History';
import styles from './Calculator.module.css';
import type { Operation, Operator } from '../../types/calculator';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [currentOperator, setCurrentOperator] = useState<Operator | null>(null);
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);
  const [history, setHistory] = useState<Operation[]>([]);

  // CARGAR HISTORIAL: Al montar el componente, leemos desde localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error("Error al cargar el historial", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  const handleNumberClick = (num: string) => {
    if (isNewNumber || display === '0' || display === 'Error') {
      setDisplay(num);
      setIsNewNumber(false);
    } else {
      if (display.length < 12) {
        setDisplay(display + num);
      }
    }
  };

  const handleOperatorClick = (op: Operator) => {
    const currentValue = parseFloat(display);

    if (currentOperator && !isNewNumber) {
      const result = calculate(previousValue ?? 0, currentValue, currentOperator);
      if (result === 'Error') {
        setDisplay('Error');
        setPreviousValue(null);
        setCurrentOperator(null);
      } else {
        setDisplay(String(result));
        setPreviousValue(Number(result));
      }
    } else {
      setPreviousValue(currentValue);
    }

    setCurrentOperator(op);
    setIsNewNumber(true);
  };

  const calculate = (a: number, b: number, op: Operator): number | 'Error' => {
    let res = 0;
    switch (op) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/': 
        if (b === 0) return 'Error'; 
        res = a / b; 
        break;
      case '^': 
      res = Math.pow(a, b);
      break; 
      default: return b;
    }
    return Math.round(res * 10000) / 10000;
  };

  const handleEqualsClick = () => {
    if (!currentOperator || previousValue === null || isNewNumber) return;

    const currentValue = parseFloat(display);
    const result = calculate(previousValue, currentValue, currentOperator);

    if (result === 'Error') {
      setDisplay('Error');
    } else {
      const newOperation: Operation = {
        id: Date.now(),
        expression: `${previousValue} ${currentOperator} ${currentValue}`,
        result: Number(result),
        timestamp: new Date(),
      };

      setHistory((prev) => [newOperation, ...prev]);
      setDisplay(String(result));
    }

    setPreviousValue(null);
    setCurrentOperator(null);
    setIsNewNumber(true);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPreviousValue(null);
    setCurrentOperator(null);
    setIsNewNumber(true);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleBackspaceClick = () => {
  if (display === 'Error' || isNewNumber) {
    setDisplay('0');
    return;
  }

  // Si solo queda un dígito, al borrarlo debe volver a ser '0'
  if (display.length <= 1) {
    setDisplay('0');
  } else {
    // Quitamos el último carácter del string
    setDisplay(display.slice(0, -1));
  }
};
  return (
    <div className={styles.calculatorLayout}>
      <div className={styles.calculatorCard}>
        <h2 className={styles.title}>Calculadora Modular</h2>
        <Display value={display} />
        <ButtonPad
          onNumberClick={handleNumberClick}
          onOperatorClick={handleOperatorClick}
          onClearClick={handleClearClick}
          onBackspaceClick={handleBackspaceClick}
          onEqualsClick={handleEqualsClick}
        />
      </div>
      <div className={styles.historyCard}>
        <History history={history} onClearHistory={handleClearHistory} />
      </div>
    </div>
  );
};

export default Calculator;