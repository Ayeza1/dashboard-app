const API = "http://127.0.0.1:5004/dashboard";
let lineChart, barChart, pieChart;

async function loadDashboard(category = "all") {
  document.getElementById("loadingState").style.display = "block";
  document.getElementById("errorState").style.display = "none";
  document.getElementById("dashboardContent").style.display = "none";

  try {
    const res = await fetch(`${API}?category=${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    const data = await res.json();

    populateFilterOnce(data.categories);
    renderStats(data.stats);
    renderCharts(data.sales_by_month, data.sales_by_category);

    document.getElementById("loadingState").style.display = "none";
    document.getElementById("dashboardContent").style.display = "block";
  } catch (err) {
    console.error(err);
    document.getElementById("loadingState").style.display = "none";
    document.getElementById("errorState").style.display = "block";
    document.getElementById("errorMsg").textContent = "Couldn't load dashboard data. Please try again.";
  }
}

let filterPopulated = false;
function populateFilterOnce(categories) {
  if (filterPopulated) return;
  const select = document.getElementById("categoryFilter");
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
  filterPopulated = true;
}

function renderStats(stats) {
  document.getElementById("statSales").textContent = `$${stats.total_sales.toLocaleString()}`;
  document.getElementById("statOrders").textContent = stats.total_orders.toLocaleString();
  document.getElementById("statAvg").textContent = `$${stats.avg_order_value}`;
}

function renderCharts(salesByMonth, salesByCategory) {
  const months = Object.keys(salesByMonth);
  const monthValues = Object.values(salesByMonth);
  const cats = Object.keys(salesByCategory);
  const catValues = Object.values(salesByCategory);

  if (lineChart) lineChart.destroy();
  if (barChart) barChart.destroy();
  if (pieChart) pieChart.destroy();

  lineChart = new Chart(document.getElementById("lineChart"), {
    type: "line",
    data: { labels: months, datasets: [{ label: "Sales ($)", data: monthValues, borderColor: "#2563eb", tension: 0.3 }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: { labels: cats, datasets: [{ label: "Sales ($)", data: catValues, backgroundColor: "#2563eb" }] },
    options: { responsive: true, maintainAspectRatio: false }
  });

  pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: { labels: cats, datasets: [{ data: catValues, backgroundColor: ["#2563eb","#16a34a","#f59e0b","#dc2626","#7c3aed"] }] },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

document.getElementById("categoryFilter").addEventListener("change", (e) => {
  loadDashboard(e.target.value);
});

loadDashboard();