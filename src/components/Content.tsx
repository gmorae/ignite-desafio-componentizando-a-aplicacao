import { useEffect, useState } from "react";

import { GenreResponseProps } from "./SideBar";
import { MovieCard } from "./MovieCard";

import { api } from "../services/api";

interface ContentProps {
  genre: GenreResponseProps | null
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content({ genre }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genre?.id}`).then(response => {
      setMovies(response.data);
    });
  }, [genre])

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {genre?.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}