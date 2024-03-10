import { Router } from 'express';

import Paths from '../constants/Paths';
import MovieRoutes from './MovieRoutes';

// **** Variables **** //

const apiRouter = Router();
const movieRouter = Router();

movieRouter.get(Paths.Movies.Get, MovieRoutes.getAll);
movieRouter.get(Paths.Movies.Search, MovieRoutes.search);
movieRouter.post(Paths.Movies.Add, MovieRoutes.add);

movieRouter.put(Paths.Movies.Update, MovieRoutes.update);

movieRouter.delete(Paths.Movies.Delete, MovieRoutes.delete);

apiRouter.use(Paths.Movies.Base, movieRouter);

// **** Export default **** //

export default apiRouter;
