import Movie, { IMovie } from '../models/Movie';

const getAll = async (): Promise<IMovie[]> => {
  return Movie.movieModel.find();
};

const add = async (movie: IMovie): Promise<void> => {
  await Movie.movieModel.create(movie);
  return;
};
const update = async (movie: IMovie): Promise<void> => {
  await Movie.movieModel.updateOne({ movieId: movie.movieId }, movie);
  return;
};
const remove = async (id: string): Promise<void> => {
  await Movie.movieModel.deleteOne({ movieId: id });
  return;
};

const persists = async (id: string): Promise<boolean> => {
  const exists = await Movie.movieModel.exists({ movieId: id });
  if (exists) {
    return true;
  }
  return false;
};

const getByTitleOrGenre = async (query: string): Promise<IMovie[]> => {

  return Movie.movieModel.find({
    $or: [
      { 
        title: { 
          $regex: query, 
          $options: 'i',
        },
      },
      {
        genre: {
          $regex: query,
          $options: 'i', 
        },  
      },
    ],
  });

};

export default {
  getAll,
  add,
  update,
  remove,
  persists,
  getByTitleOrGenre,
};
