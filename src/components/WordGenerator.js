import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WordGenerator() {
  const [word, setWord] = useState('');

  useEffect(() => {
    async function fetchWord() {
      let response = await axios.get(
        'https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5',
        {
          headers: {
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
            'x-rapidapi-key': '1e20cf9f5emsh9b90b84706bd09fp1351ebjsnae2ef578cca7',
          },
        }
      );

      while (response.data.word.length !== 5) {
        response = await axios.get(
          'https://wordsapiv1.p.rapidapi.com/words/?random=true&letters=5',
          {
            headers: {
              'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
              'x-rapidapi-key': '1e20cf9f5emsh9b90b84706bd09fp1351ebjsnae2ef578cca7',
            },
          }
        );
      }

      setWord(response.data.word.toLowerCase());
    }

    fetchWord();
  }, []);

  return word;
}

export default WordGenerator;
