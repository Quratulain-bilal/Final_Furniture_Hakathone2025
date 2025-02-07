import { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/sanity/lib/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { productId, quantity } = req.body;

  if (!productId || typeof quantity !== 'number') {
    return res.status(400).json({ message: 'Invalid request body' });
  }

  try {
    // Fetch current stock level
    const currentStock = await client.fetch(
      `*[_type == "shopProduct" && _id == $productId][0].stockLevel`,
      { productId }
    );

    if (currentStock === null) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (currentStock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Update stock level
    await client
      .patch(productId)
      .set({ stockLevel: currentStock - quantity })
      .commit();

    return res.status(200).json({ message: 'Stock updated successfully' });
  } catch (error) {
    console.error('Error updating stock:', error);
    return res.status(500).json({ message: 'Error updating stock' });
  }
}

