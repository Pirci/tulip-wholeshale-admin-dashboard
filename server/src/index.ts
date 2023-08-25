import express, { Request, Response } from 'express';
import { customers } from './db/customers';
import cors from 'cors';

const app = express();
const allowedOrigins = ['http://localhost:4200'];
//Emre buraya bakabilirsin, cors ile ilgili değişiklikler yaptım
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  exposedHeaders: ['X-Total-Count'],
};
const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);
const port = 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/customers', (req: Request, res: Response) => {
  try {
    const { _page } = req.query;
    const { _limit } = req.query;
    const page = _page ? parseInt(_page.toString()) : 1;
    const limit = _limit ? parseInt(_limit.toString()) : customers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const tempCustomers = customers.slice(startIndex, endIndex);
    // res.setHeader('X-Total-Count', customers.length);
    res.set({
      'Content-Type': 'application/json',
      'X-Total-Count': customers.length.toString(),
    });
    // res.setHeader('content-type', 'application/json')
    return res.status(200).json(tempCustomers);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/customers/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = customers.find((customer) => customer.id === id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
