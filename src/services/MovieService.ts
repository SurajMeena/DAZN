import { RouteError } from '@src/other/classes';
import MovieRepo from '../repos/MovieRepo';
import { IMovie } from '@src/models/Movie';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

export const MOVIE_NOT_FOUND_ERR = 'Movie not found';

function getAll(): Promise<IMovie[]> {
  return MovieRepo.getAll();
}

function addOne(movie: IMovie): Promise<void> {
  return MovieRepo.add(movie);
}

async function updateOne(movie: IMovie): Promise<void> {
  const persists = await MovieRepo.persists(movie.movieId);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, MOVIE_NOT_FOUND_ERR);
  }
  return MovieRepo.update(movie);
}

async function deleteOne(id: string): Promise<void> {
  const persists = await MovieRepo.persists(id);
  if (!persists) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, MOVIE_NOT_FOUND_ERR);
  }
  return MovieRepo.remove(id);
}

function search(query: string): Promise<IMovie[]> {
  return MovieRepo.getByTitleOrGenre(query);
}

export default {
  getAll,
  addOne,
  updateOne,
  deleteOne,
  search,
} as const;
