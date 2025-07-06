// src/pages/api/aqi.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type AQIData = {
  time: string;
  aqi: number;
}[];

export default function handler(req: NextApiRequest, res: NextApiResponse<AQIData>) {
  const mockData = [
    { time: '10:00', aqi: 55 },
    { time: '11:00', aqi: 70 },
    { time: '12:00', aqi: 65 },
    { time: '13:00', aqi: 80 },
    { time: '14:00', aqi: 75 },
  ];

  res.status(200).json(mockData);
}
