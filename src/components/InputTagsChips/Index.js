import React, { useState } from 'react';

import './styles.css';

export default function InputTagsChips({placeholder, handle}) {
  const [text, setText] = useState('');
  const [items, setItems] = useState([]);

  function addItems(e) {
    if (e.key === 'Enter') {
      if (text !== '') {
        if (items.indexOf(text) >= 0)
          alert('Tag name is a duplicate');
        else {
          handle([...items, text]);
          setItems([...items, text]);
          setText('');
          e.preventDefault();
        }
      } else {
        alert('Please type a tag Name');
      }
    }
  }
  
  function deleteItems(i) {
    const resItems = items.filter(item => items.indexOf(item) !== i);
    setItems(resItems);
  }

  return (
    <div className="input-tags-chips">
      <input
        id="txt"
        placeholder={placeholder}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={addItems}
      />

      <ul className="list-tags-chips">
        {items.map((item, i) => (
          <li key={i}>
            <span>{item}</span>
            <button
              type="button"
              onClick={() => deleteItems(i)}
            >X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}