import { useState } from 'react';

import { Content } from './components/Content';
import { GenreResponseProps, SideBar } from './components/SideBar';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

export function App() {
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar setSelectedGenre={setSelectedGenre} selectedGenre={selectedGenre} />
      <Content genre={selectedGenre} />
    </div>
  )
}