from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

CATEGORIES = ["Electronics", "Clothing", "Books", "Home", "Sports"]
MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

random.seed(42)
RAW_DATA = []
for month in MONTHS:
    for cat in CATEGORIES:
        RAW_DATA.append({
            "month": month,
            "category": cat,
            "sales": random.randint(500, 5000),
            "orders": random.randint(10, 200)
        })

@app.route("/dashboard", methods=["GET"])
def dashboard():
    category = request.args.get("category", "all")

    data = RAW_DATA if category == "all" else [d for d in RAW_DATA if d["category"] == category]

    total_sales = sum(d["sales"] for d in data)
    total_orders = sum(d["orders"] for d in data)
    avg_order_value = round(total_sales / total_orders, 2) if total_orders else 0

    sales_by_month = {}
    for m in MONTHS:
        sales_by_month[m] = sum(d["sales"] for d in data if d["month"] == m)

    sales_by_category = {}
    for c in CATEGORIES:
        relevant = RAW_DATA if category != "all" else RAW_DATA
        sales_by_category[c] = sum(d["sales"] for d in RAW_DATA if d["category"] == c) if category == "all" else (total_sales if c == category else 0)

    return jsonify({
        "stats": {
            "total_sales": total_sales,
            "total_orders": total_orders,
            "avg_order_value": avg_order_value
        },
        "sales_by_month": sales_by_month,
        "sales_by_category": sales_by_category,
        "categories": CATEGORIES
    })

if __name__ == "__main__":
    app.run(debug=False, port=5004)