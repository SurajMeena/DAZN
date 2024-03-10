import supertest, { Test, Response } from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { defaultErrMsg as ValidatorErr } from 'jet-validator';

import app from '@src/server';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';

import Paths from 'spec/support/Paths';
import { TReqBody } from 'spec/support/types';
import Movie, { IMovie } from '@src/models/Movie';
import MovieRepo from '@src/repos/MovieRepo';
import insertUrlParams from 'inserturlparams';
import { MOVIE_NOT_FOUND_ERR } from '@src/services/MovieService';

// StatusCodes
const { OK, CREATED, NOT_FOUND, BAD_REQUEST } = HttpStatusCodes;

// **** Types **** //

type TRes = Omit<Response, 'body'> & {
  body: {
    movies: IMovie[];
    error: string;
  };
};

const DummyGetAllMovies: IMovie[] = [
  Movie.new(
    '1',
    'The Shawshank Redemption',
    'Drama',
    5,
    'https://www.google.com',
  ),
  Movie.new('2', 'The Godfather', 'Drama', 4, 'https://google.com'),
  Movie.new('3', 'The Dark Knight', 'Action', 5, 'https://google.com'),
  Movie.new('4', '12 Angry Men', 'Drama', 4, 'https://google.com'),
  Movie.new('5', 'Schindler\'s List', 'Drama', 4, 'https://google.com'),
] as const;

const DummyMovieData: { movie: IMovie } = {
  movie: Movie.new(
    '6',
    'The Shawshank Redemption',
    'Drama',
    5,
    'https://google.com',
  ),
} as const;

describe('MovieRouter', () => {
  let agent: TestAgent<Test>;

  // Run before all tests
  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  // ** Get all movies ** //
  describe(`"GET:${Paths.Movies.Get}"`, () => {
    const callApi = () => agent.get(Paths.Movies.Get);

    // Success
    it(
      'should return a JSON object with all the movies and a status code ' +
        `of "${OK}" if the request was successful.`,
      (done) => {
        // Add spy
        spyOn(MovieRepo, 'getAll').and.resolveTo([...DummyGetAllMovies]);
        // Call API
        callApi().end((_: Error, res: TRes) => {
          expect(res.status).toBe(OK);
          for (let i = 0; i < res.body.movies.length; i++) {
            const movie = res.body.movies[i];
            expect(movie).toEqual(DummyGetAllMovies[i]);
          }
          done();
        });
      },
    );
  });

  describe(`"POST:${Paths.Movies.Add}"`, () => {
    const ERROR_MSG = `${ValidatorErr}"movie".`;

    const callApi = (reqBody: TReqBody) =>
      agent.post(Paths.Movies.Add).type('form').send(reqBody);

    // Test add movie success
    it(
      `should return a status code of "${CREATED}" if the request was ` +
        'successful.',
      (done) => {
        // Spy
        spyOn(MovieRepo, 'add').and.resolveTo();
        // Call api
        callApi(DummyMovieData).end((_: Error, res: TRes) => {
          expect(res.status).toBe(CREATED);
          expect(res.body.error).toBeUndefined();
          done();
        });
      },
    );

    // Missing param
    it(
      'should return a JSON object with an error message of ' +
        `"${ERROR_MSG}" and a status code of "${BAD_REQUEST}" if the movie ` +
        'param was missing.',
      (done) => {
        // Call api
        callApi({}).end((_: Error, res: TRes) => {
          expect(res.status).toBe(BAD_REQUEST);
          done();
        });
      },
    );
  });

  // ** Update movies ** //
  describe(`"PUT:${Paths.Movies.Update}"`, () => {
    const ERROR_MSG = `${ValidatorErr}"movie".`;

    const callApi = (reqBody: TReqBody) =>
      agent.put(Paths.Movies.Update).type('form').send(reqBody);

    // Success
    it(`should return a status code of "${OK}" if the request was 
    successful.`, (done) => {
      // Setup spies
      spyOn(MovieRepo, 'update').and.resolveTo();
      spyOn(MovieRepo, 'persists').and.resolveTo(true);
      // Call api
      callApi(DummyMovieData).end((_: Error, res: TRes) => {
        expect(res.status).toBe(OK);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    // Param missing
    it(
      'should return a JSON object with an error message of ' +
        `"${ERROR_MSG}" and a status code of "${BAD_REQUEST}" if the movie ` +
        'param was missing.',
      (done) => {
        // Call api
        callApi({}).end((_: Error, res: TRes) => {
          expect(res.status).toBe(BAD_REQUEST);
          done();
        });
      },
    );

    // Movie not found
    it(
      'should return a JSON object with the error message of ' +
        `"${MOVIE_NOT_FOUND_ERR}" and a status code of 
        "${NOT_FOUND}" if the id ` +
        'was not found.',
      (done) => {
        // Call api
        spyOn(MovieRepo, 'persists').and.resolveTo(false);
        callApi(DummyMovieData).end((_: Error, res: TRes) => {
          expect(res.status).toBe(NOT_FOUND);
          done();
        });
      },
    );
  });

  // ** Delete Movie ** //
  describe(`"DELETE:${Paths.Movies.Delete}"`, () => {
    const VALIDATOR_ERR = `${ValidatorErr}"id".`;

    const callApi = (id: number) =>
      agent.delete(insertUrlParams(Paths.Movies.Delete, { id }));

    // Success
    it(`should return a status code of "${OK}" if the request
  was successful.`, (done) => {
      // Setup spies
      spyOn(MovieRepo, 'remove').and.resolveTo();
      spyOn(MovieRepo, 'persists').and.resolveTo(true);
      // Call api
      callApi(6).end((err: Error, res: TRes) => {
        if (err) {
          done.fail(err);
        } else {
          expect(res.status).toBe(OK);
          done();
        }
      });
    });

    // Movie not found
    it(
      'should return a JSON object with the error message of ' +
        `"${MOVIE_NOT_FOUND_ERR}" and a status code of
  "${NOT_FOUND}" if the id ` +
        'was not found.',
      (done) => {
        spyOn(MovieRepo, 'persists').and.resolveTo(false);
        callApi(-1).end((err: Error, res: TRes) => {
          if (err) {
            done.fail(err);
          } else {
            expect(res.status).toBe(NOT_FOUND);
            done();
          }
        });
      },
    );

    // Invalid param
    it(
      `should return a status code of "${BAD_REQUEST}" and
  return an error ` +
        `message of "${VALIDATOR_ERR}" if the id was not a valid number`,
      (done) => {
        spyOn(MovieRepo, 'persists').and.resolveTo(false);
        callApi('horse' as unknown as number).end((_: Error, res: TRes) => {
          expect(res.status).toBe(NOT_FOUND);
          done();
        });
      },
    );
  });
});
