export default function handler(req: any, res: any) {
  res.status(200).json([
    { time: '10AM', aqi: 85 },
    { time: '11AM', aqi: 90 },
    { time: '12PM', aqi: 120 },
    { time: '1PM', aqi: 100 },
    { time: '2PM', aqi: 95 },
  ]);
}
