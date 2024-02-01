interface Movie {
  poster_path: string;
  title: string;
  genres: [{ name: string; id: string }];
  original_language: string;
  release_date: string;
  runtime: string;
  vote_average: string;
  overview: string;
  videos: {
    results: [{ type: string; key: string }];
  };
}

interface Genres {
  index: number;
  name: string;
  length?: number;
}
