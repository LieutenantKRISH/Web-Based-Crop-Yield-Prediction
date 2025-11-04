import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Lasso, Ridge
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.svm import SVR
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import joblib

# 1. Load dataset
df = pd.read_csv('backend\yield_df.csv')

# 2. Drop unnecessary index column
if 'Unnamed: 0' in df.columns:
    df.drop('Unnamed: 0', axis=1, inplace=True)

# 3. Remove non-numeric rainfall entries
def is_str(obj):
    try:
        float(obj)
        return False
    except:
        return True

bad_idx = df[df['average_rain_fall_mm_per_year'].apply(is_str)].index
df.drop(bad_idx, inplace=True)

# 4. Drop duplicates
df.drop_duplicates(inplace=True)

# 5. Encode categorical variables
df = pd.get_dummies(df, columns=['Area', 'Item'], drop_first=True)

# 6. Specify the target column
target_column = 'hg/ha_yield'

# 7. Split features and target
X = df.drop(target_column, axis=1)
y = df[target_column]

# 8. Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 9. Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 10. Initialize models
models = {
    'LinearRegression': LinearRegression(),
    'Lasso': Lasso(alpha=1.0),
    'Ridge': Ridge(alpha=1.0),
    'DecisionTree': DecisionTreeRegressor(random_state=42),
    'RandomForest': RandomForestRegressor(random_state=42, n_estimators=100),
    'GradientBoosting': GradientBoostingRegressor(random_state=42),
    'XGBoost': XGBRegressor(random_state=42, objective='reg:squarederror'),
    'SVR': SVR(kernel='rbf')
}

# 11. Train and evaluate models
results = []
for name, model in models.items():
    model.fit(X_train_scaled, y_train)
    preds = model.predict(X_test_scaled)
    rmse = np.sqrt(mean_squared_error(y_test, preds))
    mae = mean_absolute_error(y_test, preds)
    r2 = r2_score(y_test, preds)
    results.append({'model': name, 'RMSE': rmse, 'MAE': mae, 'R2': r2})

# 12. Display results
results_df = pd.DataFrame(results).sort_values(by='RMSE')
print("\nModel Comparison:")
print(results_df)

# 13. Save the best-performing model
best_model_name = results_df.iloc[0]['model']
best_model = models[best_model_name]
joblib.dump(best_model, f'{best_model_name.lower()}_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
feature_columns = X_train.columns.tolist()
joblib.dump(feature_columns, 'model_columns.pkl')

print(f"\nBest model ('{best_model_name}') saved to {best_model_name.lower()}_model.pkl")
print("Scaler saved to scaler.pkl")
print("Feature columns saved to model_columns.pkl")