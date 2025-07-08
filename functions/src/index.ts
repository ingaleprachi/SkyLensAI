import * as functions from 'firebase-functions';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';

export const getAQIData = functions.https.onRequest((req, res) => {
  const data = [
    { time: '10:00', aqi: 55 },
    { time: '11:00', aqi: 72 },
    { time: '12:00', aqi: 65 },
    { time: '13:00', aqi: 81 },
    { time: '14:00', aqi: 76 }
  ];
  res.status(200).json(data);
});

export const getSpatialData = functions.https.onRequest((req, res) => {
  const filePath = path.join(__dirname, '../../data/predicted_pm_map.csv');
  const results: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csvParser.default())
    .on('data', (data) => {
      results.push({
        lat: parseFloat(data.lat),
        lon: parseFloat(data.lon),
        predicted_pm25: parseFloat(data.predicted_pm25)
      });
    })
    .on('end', () => {
      res.status(200).json(results);
    });
});
