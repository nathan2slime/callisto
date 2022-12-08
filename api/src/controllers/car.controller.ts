// Dependencies
import { Request, Response } from 'express';

// Utils
import CarService from '../services/car.service';
import log from '../log';

// Types
import { CreateCar, Paginate, UpdateCar } from '../types';

class CarControllers {
  carServices: CarService;

  constructor() {
    this.carServices = new CarService();
  }

  all = async (req: Request, res: Response) => {
    try {
      const { currentPage, perPage, order } = req.query;

      log.info(req.body);

      const cars = await this.carServices.all({
        currentPage: parseInt(currentPage as any) || 1,
        perPage: parseInt(perPage as any) || 24,
        order: (order as any) || 'recent',
      });

      return res.json(cars);
    } catch (error: any) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  };

  show = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      log.info(req.body);

      const cars = await this.carServices.show(parseInt(id));

      return res.json(cars);
    } catch (error: any) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { brand, model, name, photo, price } = req.body as CreateCar;

      log.info(req.body);

      const car = await this.carServices.create({
        brand,
        model,
        name,
        photo,
        price,
      });

      return res.json(car);
    } catch (error: any) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const { brand, model, name, photo, id, price } = req.body as UpdateCar;

      log.info(req.body);

      const car = await this.carServices.update(
        {
          brand,
          model,
          name,
          photo,
          price,
        },
        id
      );

      return res.json(car);
    } catch (error: any) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      log.info(req.params);

      const data = await this.carServices.delete(parseInt(id));

      return res.json(data);
    } catch (error: any) {
      return res.json({
        error: true,
        message: error.message,
      });
    }
  };
}

export default CarControllers;
