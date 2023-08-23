import express, { Request, Response } from 'express';
import { customers } from './db/customers';

const app = express();
const port = 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.get('/api/customers', (req: Request, res: Response) => {
  try {
    const tempCustomers = structuredClone(customers);
    return res.status(200).json(tempCustomers);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/customers/:id', (req: Request, res: Response) => {
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
