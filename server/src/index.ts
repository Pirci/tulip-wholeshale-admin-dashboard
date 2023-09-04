/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rzmzaudwtwnnzgzoxqhb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6bXphdWR3dHdubnpnem94cWhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0OTMxNzEsImV4cCI6MjAwOTA2OTE3MX0.Jiu6tid1sGF-oKkHuTpAbTn1vVLSmoCo_VFpIpPiGXE'
);

const app = express();
app.use(bodyParser.json());
const allowedOrigins = ['http://localhost:4200'];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  exposedHeaders: ['X-Total-Count'],
};
const corsMiddleware = cors(corsOptions);
app.use(corsMiddleware);
const port = 4000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello From Tulip Backend!');
});

app.get('/customers', async (req: Request, res: Response) => {
  try {
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*');

    const { _page } = req.query;
    const { _limit } = req.query;
    const page = _page ? parseInt(_page.toString()) : 1;
    const limit = _limit
      ? parseInt(_limit.toString())
      : (customers ?? []).length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const tempCustomers = (customers ?? []).slice(startIndex, endIndex);
    // res.setHeader('X-Total-Count', customers.length);
    res.set({
      'Content-Type': 'application/json',
      'X-Total-Count': (customers ?? []).length.toString(),
    });
    // res.setHeader('content-type', 'application/json')
    return res.status(200).json(tempCustomers);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/customers/:id', async (req: Request, res: Response) => {
  try {
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*');
    const { id } = req.params;
    const customer = (customers ?? []).find(
      (customer: any) => customer.id === id
    );
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    return res.status(200).json(customer);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/customers', async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { data, error } = await supabase
      .from('customers')
      .insert([{ id: new Date().getTime(), ...req.body }])
      .select();

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/customers/:id', async (req: Request, res: Response) => {
  try {
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*');
    const { id } = req.params;
    const customer = (customers ?? []).find(
      (customer: any) => customer.id === id
    );
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await supabase.from('customers').delete().eq('id', id);

    return res.status(204).json({ message: 'Customer deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put('/customers/:id', async (req: Request, res: Response) => {
  try {
    const { data: customers, error } = await supabase
      .from('customers')
      .select('*');
    const { id } = req.params;
    const customer = (customers ?? []).find(
      (customer: any) => customer.id === id
    );
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const { data } = await supabase
      .from('customers')
      .update({ ...req.body })
      .eq('id', id)
      .select();

    return res.status(204).json(data);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// vendors endpoint should be done here, nice to have queries
app.get('/vendors', async (req: Request, res: Response) => {
  try {
    const { data: vendors, error } = await supabase.from('vendors').select('*');

    const { _page } = req.query;
    const { _limit } = req.query;
    const page = _page ? parseInt(_page.toString()) : 1;
    const limit = _limit ? parseInt(_limit.toString()) : (vendors ?? []).length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const tempVendors = (vendors ?? []).slice(startIndex, endIndex);

    res.set({
      'Content-Type': 'application/json',
      'X-Total-Count': (vendors ?? []).length.toString(),
    });

    return res.status(200).json(tempVendors);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/vendors/:id', async (req: Request, res: Response) => {
  try {
    const { data: vendors, error } = await supabase.from('vendors').select('*');
    const { id } = req.params;
    const vendor = (vendors ?? []).find((vendor: any) => vendor.id === id);

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    return res.status(200).json(vendor);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/vendors', async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { data, error } = await supabase
      .from('vendors')
      .insert([{ id: new Date().getTime(), ...req.body }])
      .select();

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// products endpoint should be done here, nice to have queries
app.get('/products', async (req: Request, res: Response) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');

    const { _page } = req.query;
    const { _limit } = req.query;
    const page = _page ? parseInt(_page.toString()) : 1;
    const limit = _limit
      ? parseInt(_limit.toString())
      : (products ?? []).length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const tempProducts = (products ?? []).slice(startIndex, endIndex);

    res.set({
      'Content-Type': 'application/json',
      'X-Total-Count': (products ?? []).length.toString(),
    });

    return res.status(200).json(tempProducts);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*');
    const { id } = req.params;
    const product = (products ?? []).find((product: any) => product.id === id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/products', async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { data, error } = await supabase
      .from('products')
      .insert([{ id: new Date().getTime(), ...req.body }])
      .select();

    return res.status(201).json(data);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
