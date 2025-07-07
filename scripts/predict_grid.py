import numpy as np
import pandas as pd
import joblib

# Load your trained model
model = joblib.load('model/pm_model.pkl')

# Step 1: Create a grid of latitude and longitude across India
lat_range = np.linspace(8, 37, 50)     # South to North
lon_range = np.linspace(68, 97, 50)    # West to East
grid = [(lat, lon) for lat in lat_range for lon in lon_range]

df_grid = pd.DataFrame(grid, columns=['lat', 'lon'])

# Step 2: Add average weather + AOD values
df_grid['aod'] = 0.7          # Placeholder - adjust later
df_grid['temp'] = 28          # Celsius
df_grid['humidity'] = 65      # %
df_grid['wind_speed'] = 2     # m/s

# Step 3: Predict PM2.5 using trained model
features = ['aod', 'temp', 'humidity', 'wind_speed']
df_grid['predicted_pm25'] = model.predict(df_grid[features])

# Step 4: Save to CSV
df_grid[['lat', 'lon', 'predicted_pm25']].to_csv('data/predicted_pm_map.csv', index=False)
print("✅ Spatial prediction grid saved to data/predicted_pm_map.csv")
