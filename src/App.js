import React, { useState, useEffect } from 'react';

import api from './services/api';

import './styles.css';

import InputTagsChips from './components/InputTagsChips/Index'

export default function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  function handleTechs(val) {
    setTechs(val);
  }

  async function handleAddRepository(e) {
    e.preventDefault();

    const { data } = await api.post('repositories', {
      title,
      url,
      techs
    });

    setRepositories([...repositories, data]);
  }

  async function handleDeleteRepository(id) {
    api.delete(`repositories/${id}`).then(res => {
      if (res.status === 204) {
        const newRepositories = repositories.filter(r => r.id !== id)
        setRepositories(newRepositories);
      }
    })
  }

  return (
    <>
      <h1 className="container">Repositories</h1>

      <div className="container">
        <section className="container-form">
          <form onSubmit={handleAddRepository}>
            <input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <input
              placeholder="URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />

            <InputTagsChips
              placeholder="Press enter to create a tag name for Techs"
              handle={handleTechs}
            />

            <button className="btn" type="submit">Adicionar</button>
          </form>
        </section>

        <div className="container-list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Techs</th>
                <th className='td-actions'>Action</th>
              </tr>
            </thead>

            <tbody data-testid='repository-list'>
              {repositories.map((repository, i) => (
                <tr key={i} className={`${(i + 1) % 2 === 0 ? 'even' : 'odd'}`}>
                  <td>{repository.title}</td>
                  <td>
                    <a
                      href={repository.url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >Github</a>
                  </td>
                  <td>{repository.techs.join(', ')}</td>
                  <td className="td-actions">
                    <button
                      onClick={() => handleDeleteRepository(repository.id)}
                    ><span>Remover</span>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}
