#Dashboard

A dashboard with charts fed by a backend, built as a practice task for my frontend internship to learn how to turn raw data into visualizations people can actually read at a glance.

## What it does

- Three stat cards showing total sales, total orders, and average order value
- A line chart showing sales trend by month
- A bar chart showing sales by category
- A pie chart showing category share of total sales
- A category filter dropdown that re-fetches and updates all charts and stats at once
- Responsive layout — charts reflow into a single column on smaller screens

## Built with

**Backend:**
- Python
- Flask
- Flask-CORS

**Frontend:**
- HTML
- CSS (CSS Grid for the responsive chart layout)
- Chart.js (loaded via CDN)

## Project structure
dashboard-app/
  backend/
    app.py
  frontend/
    index.html
    script.js
    style.css

## How it works

The backend generates sample sales data (by month and category) and aggregates it server-side into totals, monthly sales, and category sales, based on an optional `category` query parameter. The frontend fetches this aggregated data, populates the stat cards, and renders three Chart.js charts from it.

When the category filter dropdown changes, the frontend re-fetches from the backend with the selected category and re-renders everything — the filtering/aggregation happens on the server, not by slicing already-loaded data in the browser.

## Running it locally

1. In `backend/`, install dependencies and run the server:
pip install flask flask-cors
python app.py

2. Open `frontend/index.html` in a browser (or use a local server like VS Code Live Server).
