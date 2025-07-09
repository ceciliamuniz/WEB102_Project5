import React, { useState } from 'react';
import DogCard from './components/DogCard';
import BanList from './components/BanList';

function App() {
  const [currentDog, setCurrentDog] = useState(null);
  const [banList, setBanList] = useState([]);

  // Checks if any attribute/value in dog's breeds is banned
  const isBanned = (dog) => {
    if (!dog || !dog.breeds || dog.breeds.length === 0) return false;
    const b = dog.breeds[0];

    // Check all relevant attributes against banList
    return banList.some(({ attribute, value }) => {
      if (attribute === 'temperament' && b.temperament) {
        // temperament is a comma-separated string, split and check each trait
        return b.temperament.split(', ').includes(value);
      }
      // for other attributes, check direct equality (handle optional chaining)
      return b[attribute]?.toString() === value;
    });
  };

  const fetchDog = async () => {
    try {
      let dog;
      let tries = 0;
      do {
        const res = await fetch(
          'https://api.thedogapi.com/v1/images/search?has_breeds=1',
          {
            headers: { 'x-api-key': import.meta.env.VITE_DOG_API_KEY },
          }
        );
        const data = await res.json();
        dog = data[0];
        tries++;
      } while (isBanned(dog) && tries < 10);

      if (!isBanned(dog)) setCurrentDog(dog);
      else setCurrentDog(null); // no suitable dog found after tries
    } catch (e) {
      console.error('Failed to fetch dog:', e);
    }
  };

  const handleBan = (attribute, value) => {
    if (!attribute || !value) return; // safety check
    const alreadyBanned = banList.some(
      (item) => item.attribute === attribute && item.value === value
    );
    if (!alreadyBanned) {
      setBanList((prev) => [...prev, { attribute, value }]);
    }
  };

  const handleUnban = (banItem) => {
    setBanList((prev) =>
      prev.filter(
        (item) =>
          item.attribute !== banItem.attribute || item.value !== banItem.value
      )
    );
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>🐶 DogDiscovery 🐶</h1>
      <h3>Discover New Dogs!</h3>
      <button onClick={fetchDog}>Show Me a Dog</button>

      {currentDog && <DogCard dog={currentDog} onBan={handleBan} />}

      <BanList bans={banList} onUnban={handleUnban} />
    </div>
  );
}

export default App;
