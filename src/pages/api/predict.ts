import type { NextApiRequest, NextApiResponse } from 'next';
import { spawn } from 'child_process';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { aod, temp, humidity, wind_speed } = req.body;

  if (!aod || !temp || !humidity || !wind_speed) {
    return res.status(400).json({ error: "Missing inputs." });
  }

  // Spawn Python script
  const py = spawn('python', ['ml/predict.py', aod, temp, humidity, wind_speed]);

  let result = '';

  py.stdout.on('data', (data) => {
    result += data.toString();
  });

  py.stderr.on('data', (err) => {
    console.error("Python error:", err.toString());
  });

  py.on('close', () => {
    return res.status(200).json({ pm: parseFloat(result) });
  });
}
