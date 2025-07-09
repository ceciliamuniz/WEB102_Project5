import React from 'react';

const DogCard = ({ dog, onBan }) => {
  const b = dog.breeds[0] || {};

  // Helper function to safely ban
  const handleBan = (attribute, value) => {
    if (value && value !== "Unknown") {
      onBan(attribute, value);
    }
  };

  return (
    <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
      <img src={dog.url} alt={b.name} width="300" style={{ borderRadius: '8px' }} />

      {/* Breed */}
      <h2
        onClick={() => handleBan("breed", b.name)}
        style={{ cursor: 'pointer', color: 'darkorange' }}
      >
        Breed: {b.name || "Unknown"} (click to ban)
      </h2>

      {/* Origin */}
      <p onClick={() => handleBan("origin", b.origin)} style={{ cursor: 'pointer' }}>
        Origin: {b.origin || "Unknown"}
      </p>

      {/* Temperament */}
      <p>
        Temperament:{" "}
        {b.temperament
          ? b.temperament.split(', ').map((trait, i) => (
              <span
                key={i}
                onClick={() => handleBan("temperament", trait)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  padding: '2px 6px',
                  marginRight: '6px',
                  display: 'inline-block'
                }}
              >
                {trait}
              </span>
            ))
          : "Unknown"}
      </p>

      {/* Life Span */}
      <p onClick={() => handleBan("life_span", b.life_span)} style={{ cursor: 'pointer' }}>
        Life Span: {b.life_span || "Unknown"}
      </p>

      {/* Weight */}
      <p onClick={() => handleBan("weight", b.weight?.imperial)} style={{ cursor: 'pointer' }}>
        Weight: {b.weight?.imperial || "Unknown"} lbs
      </p>

      {/* Height */}
      <p onClick={() => handleBan("height", b.height?.imperial)} style={{ cursor: 'pointer' }}>
        Height: {b.height?.imperial || "Unknown"} in
      </p>

      {/* Bred For */}
      <p onClick={() => handleBan("bred_for", b.bred_for)} style={{ cursor: 'pointer' }}>
        Bred For: {b.bred_for || "Unknown"}
      </p>

      {/* Breed Group */}
      <p onClick={() => handleBan("breed_group", b.breed_group)} style={{ cursor: 'pointer' }}>
        Group: {b.breed_group || "Unknown"}
      </p>
    </div>
  );
};

export default DogCard;
