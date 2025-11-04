from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)  # Allow all origins

# Load the model, scaler, and feature columns
model = joblib.load('randomforest_model.pkl')
scaler = joblib.load('scaler.pkl')
feature_columns = joblib.load('model_columns.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = {
            'Year': float(data.get('Year', 0)),
            'average_rain_fall_mm_per_year': float(data.get('average_rain_fall_mm_per_year', 0)),
            'pesticides_tonnes': float(data.get('pesticides_tonnes', 0)),
            'avg_temp': float(data.get('avg_temp', 0)),
            'Area': data.get('Area', ''),
            'Item': data.get('Item', '')
        }
        input_df = pd.DataFrame([input_data])
        input_df = pd.get_dummies(input_df, columns=['Area', 'Item'], drop_first=True)
        for col in feature_columns:
            if col not in input_df.columns:
                input_df[col] = 0
        input_df = input_df[feature_columns]
        input_scaled = scaler.transform(input_df)
        prediction = model.predict(input_scaled)[0]
        return jsonify({'prediction': float(prediction)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)