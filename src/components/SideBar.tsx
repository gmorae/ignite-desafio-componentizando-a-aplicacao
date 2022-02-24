import { useState, useEffect } from "react";

import { Button } from "./Button";

import { api } from "../services/api";

interface SideBarProps {
  selectedGenre: GenreResponseProps | null,
  setSelectedGenre: (text: GenreResponseProps) => void
}

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({ setSelectedGenre, selectedGenre }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(({ data }) => {
      setGenres(data);

      const [initGenre] = data
      handleClickButton(initGenre)
    });
  }, []);

  function handleClickButton(genre: GenreResponseProps) {
    setSelectedGenre(genre);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre)}
            selected={selectedGenre?.id === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}