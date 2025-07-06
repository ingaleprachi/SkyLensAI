import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import numpy as np


# Load merged dataset
df = pd.read_csv('data/merged_dataset.csv')

# Features and target
features = ['aod', 'temp', 'humidity', 'wind_speed']  # replace with real column names
target = 'pm25'  # change to your actual PM column if different

# Drop rows with missing values
df = df.dropna(subset=features + [target])

# Split into train/testS
X = df[features]
y = df[target]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
print("✅ R2 Score:", r2_score(y_test, y_pred))
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
print("✅ RMSE:", rmse)


# Save model
joblib.dump(model, 'model/pm_model.pkl')
print("✅ Model saved to model/pm_model.pkl")
