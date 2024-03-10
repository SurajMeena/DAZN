import mongoose from 'mongoose';
import validator from 'validator';

export interface IMovie {
  movieId: string;
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}

function new_(
  movieId: string,
  title: string,
  genre: string,
  rating: number,
  streamingLink: string,
): IMovie {
  return {
    movieId: movieId,
    title: title,
    genre: genre,
    rating: rating,
    streamingLink: streamingLink,
  };
}

function isMovie(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'movieId' in arg &&
    'title' in arg &&
    'genre' in arg &&
    'rating' in arg &&
    'streamingLink' in arg
  );
}

const movieSchema = new mongoose.Schema<IMovie>({
  movieId: {
    type: String,
    required: [true, 'Please enter the movieId'],
    unique: true,
    validate: [validator.isInt, 'movieId should be integer'],
  },
  title: {
    type: String,
    required: [true, 'Please enter the title'],
    maxLength: [200, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  genre: {
    type: String,
    required: [true, 'Please enter the genre'],
    maxLength: [200, 'genre cannot exceed 30 characters'],
    minLength: [4, 'genre should have more than 4 characters'],
  },
  rating: {
    type: Number,
    required: [true, 'Please enter the rating'],
    min: [1, 'Rating cannot be less than 1'],
    max: [5, 'Rating cannot be more than 5'],
  },
  streamingLink: {
    type: String,
    required: [true, 'Please enter the streaming link'],
    maxLength: [200, 'streaming link cannot exceed 30 characters'],
    minLength: [4, 'streaming link should have more than 4 characters'],
    validate: [validator.isURL, 'streaming link should be a valid URL'],
  },
});

const movieModel = mongoose.model<IMovie>('Movie', movieSchema);
export default {
  movieModel,
  new: new_,
  isMovie,
};
