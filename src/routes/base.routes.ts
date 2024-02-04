import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';

class BaseRoute implements Routes {
  public path = '/alive';
  public router = Router();

  constructor() {
    this.initBaseRoutes();
  }

  /*
    *initBaseRoutes is a method that initializes the base route
    of the application.
  */
  public initBaseRoutes() {
    this.router.get(`${this.path}`, (_req, res) => {
      res.status(200).json({ ok: true, message: 'Server is alive' });
    });
  }
}

export default BaseRoute;
