# scripts/csv_to_json.py
import pandas as pd
import os

# Ensure paths are correct relative to the script
root_dir = os.path.dirname(os.path.dirname(__file__))

aqi_csv = os.path.join(root_dir, 'data', 'sample_pm25.csv')
spatial_csv = os.path.join(root_dir, 'data', 'predicted_pm_map.csv')
aqi_json = os.path.join(root_dir, 'public', 'aqi.json')
spatial_json = os.path.join(root_dir, 'public', 'spatial.json')

# Convert AQI CSV to JSON
aqi_df = pd.read_csv(aqi_csv)
aqi_df.rename(columns={'pm25': 'aqi'}, inplace=True)
aqi_df.to_json(aqi_json, orient='records')

# Convert Spatial Grid CSV to JSON
spatial_df = pd.read_csv(spatial_csv)
spatial_df.to_json(spatial_json, orient='records')

print("✅ JSON files exported to /public")
