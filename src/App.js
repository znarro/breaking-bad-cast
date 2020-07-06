import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/ui/Header'
import CharacterGrid from './components/characters/CharacterGrid'
import Search from './components/ui/Search'
import Footer from './components/ui/Footer'
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);  // Characters' list state
  const [isLoading, setIsLoading] = useState(true);  // Loading state for fetch characters
  const [query, setQuery] = useState('');  // Input query state

  useEffect(() => {
    // useEffect's callback can't be async, so...
    const fetchItems = async () => {
      const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query}`);
      console.log(result.data);

      setItems(result.data);
      setIsLoading(false);
    }

    fetchItems();
  }, [query])

  return (
    <div className="container">
      <Header />
      <Search getQuery={(query) => setQuery(query)} />
      <CharacterGrid isLoading={isLoading} items={items} />
      <Footer />
    </div>
  );
}

export default App;
