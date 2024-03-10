import {IMovie} from '@src/models/Movie';
import MovieService from '@src/services/MovieService';
import {IReq, IRes} from './types/express/misc';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';

async function getAll(_: IReq, res: IRes) {
  const movies = await MovieService.getAll();
  return res.status(HttpStatusCodes.OK).json({movies});
}

async function add(req: IReq<{ movie: IMovie }>, res: IRes) {
  const {movie} = req.body;
  await MovieService.addOne(movie);
  return res.status(HttpStatusCodes.CREATED).end();
}

async function update(req: IReq<{movie: IMovie}>, res:IRes) {
  const {movie} = req.body;
  await MovieService.updateOne(movie);
  return res.status(HttpStatusCodes.OK).end();
}

async function delete_(req: IReq, res: IRes) {
  const id = req.params.id;
  await MovieService.deleteOne(id);
  return res.status(HttpStatusCodes.OK).end();
}

async function search(req: IReq, res: IRes) {
  const query = req.query.q as string;
  const movies = await MovieService.search(query);
  return res.status(HttpStatusCodes.OK).json({movies});
}


export default {
  getAll,
  add,
  update,
  search,
  delete: delete_,
} as const;