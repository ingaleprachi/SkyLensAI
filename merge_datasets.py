
import pandas as pd

# Load CSV files
aod = pd.read_csv('data/sample_aod.csv')
pm25 = pd.read_csv('data/sample_pm25.csv')
merra = pd.read_csv('data/sample_merra.csv')

# Merge all three datasets on lat, lon, and datetime
df = pd.merge(pm25, aod, on=['lat', 'lon', 'datetime'])
df = pd.merge(df, merra, on=['lat', 'lon', 'datetime'])

# Drop any missing values
df.dropna(inplace=True)

# Save merged dataset
df.to_csv('data/merged_dataset.csv', index=False)
print('✅ Merged dataset saved to data/merged_dataset.csv')
