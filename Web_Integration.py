# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

model      = joblib.load('RandomForest.h5')
model_cols = joblib.load('model_columns.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df   = pd.DataFrame([data])
    df   = pd.get_dummies(df)
    for c in model_cols:
        if c not in df.columns:
            df[c] = 0
    df = df[model_cols]
    p  = model.predict(df)[0]
    return jsonify({'prediction': round(float(p),2)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
