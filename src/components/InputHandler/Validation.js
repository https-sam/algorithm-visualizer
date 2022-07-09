import {useState} from 'react';
import Helper     from './Helper';



const Validation = (input) => {
  const [error, setError]                         = useState('');
  const [errorMessage, setErrorMessage]           = useState('');
  const [inputNumbersCount, setinputNumbersCount] = useState(0);
  const [inputNumbersArray, setInputNumbersArray] = useState([]);
  const [inputStringsCount, setinputStringsCount] = useState(0);
  const [inputStringsArray, setInputStringsArray] = useState([]);

};