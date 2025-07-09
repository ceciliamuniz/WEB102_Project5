import React from 'react';

const BanList = ({ bans, onUnban }) => (
  <div style={{ marginTop: '20px', textAlign: 'center' }}>
    <h3>🚫 Ban List</h3>
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      {bans.length === 0 ? (
        <li style={{ fontStyle: 'italic', color: '#888', textAlign: 'center' }}>
          (Empty)
        </li>
      ) : (
        bans.map((item, i) => (
          <li
            key={i}
            onClick={() => onUnban(item)}
            style={{ cursor: 'pointer', color: 'red', textAlign: 'center' }}
          >
            {item.value || "(no value)"} (Click to unban ❌)
          </li>
        ))
      )}
    </ul>
  </div>
);

export default BanList;
