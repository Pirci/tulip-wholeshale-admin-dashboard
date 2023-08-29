import express, { Request, Response } from 'express';
import { customers } from './db/customers';
import { vendors } from './db/vendors';
import { products } from './db/products';
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

// vendors endpoint should be done here, nice to have queries
app.get('/vendors', (req: Request, res: Response) => {
  try {
    const { _page, _limit } = req.query;
    const page = _page ? parseInt(_page.toString()) : 1;
    const limit = _limit ? parseInt(_limit.toString()) : vendors.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const tempVendors = vendors.slice(startIndex, endIndex);
    res.set({
      'Content-Type': 'application/json',
      'X-Total-Count': vendors.length.toString(),
    });
    return res.status(200).json(tempVendors);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/vendors/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const vendor = vendors.find((vendor) => vendor.id === id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    return res.status(200).json(vendor);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



// products endpoint should be done here, nice to have queries
app.get('/products', (req: Request, res: Response) => {
  try {
    const { _page, _limit } = req.query;
    const page = _page ? parseInt(_page.toString()) : 1;
    const limit = _limit ? parseInt(_limit.toString()) : products.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const tempProducts = products.slice(startIndex, endIndex);
    res.set({
      'Content-Type': 'application/json',
      'X-Total-Count': products.length.toString(),
    });
    return res.status(200).json(tempProducts);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/products/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = products.find((product) => product.id === id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
