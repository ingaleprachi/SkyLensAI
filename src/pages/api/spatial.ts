import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'data/predicted_pm_map.csv');
  const results: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) =>
      results.push({
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        predicted_pm25: parseFloat(data.predicted_pm25),
      })
    )
    .on('end', () => {
      res.status(200).json(results);
    });
}
