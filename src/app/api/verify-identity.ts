/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';

export default function handler(req: { method: string; body: { userData: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; hmac?: string; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
    // Extract user-specific data from the request body (e.g., user ID, session token)
    const { userData } = req.body;

    // Ensure the secret key is loaded from environment variables
    const secretKey = process.env.SECRET_KEY;

    // Check if the required data exists
    if (!userData || !secretKey) {
      return res.status(400).json({ error: 'Missing user data or secret key' });
    }

    // Generate the HMAC (Hash-based Message Authentication Code) using SHA-256
    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(userData); // user-specific data
    const hmacResult = hmac.digest('hex'); // The resulting HMAC

    // Send the HMAC to Chatbase or any other verification service (you can make an API call here)
    res.status(200).json({ hmac: hmacResult });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
