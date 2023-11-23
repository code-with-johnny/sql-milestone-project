import { API_URL } from "../constants.js";

(async () => {
  const table = document.getElementById("cat-comparison");
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  table.appendChild(loadingIndicator());

  try {
    const catData = await fetchCatData();
    table.removeChild(table.querySelector(".loading"));

    Object.keys(catData[0]).forEach((key) => {
      const th = document.createElement("th");
      th.innerText = formatCamelCase(key);
      thead.appendChild(th);
    });

    catData.forEach((cat) => {
      const tr = document.createElement("tr");
      Object.entries(cat).forEach(([key, value]) => {
        const td = document.createElement("td");

        if (typeof value === "boolean") {
          const content = value ? "&#x2714;" : "&#10060;";
          td.innerHTML = content;
          if (value) {
            td.classList.add("check-mark");
          }
        }

        if (typeof value === "string") {
          td.innerText = value.charAt(0).toUpperCase() + value.slice(1);
        }

        if (typeof value === "number") {
          td.innerText = key === "weight" ? `${value}lbs` : value;
        }

        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  } catch (err) {
    table.removeChild(table.querySelector(".loading"));
    table.appendChild(errorMessage());
  }
})();

async function fetchCatData() {
  const response = await axios.get(`${API_URL}/cat-data`);
  return response.data;
}

function loadingIndicator() {
  const loading = document.createElement("div");
  loading.innerText = "Loading data...";
  loading.classList.add("loading");
  return loading;
}

function errorMessage() {
  const error = document.createElement("div");
  error.innerText = "Whoops! An error occurred while fetching the data.";
  error.classList.add("error");
  return error;
}

function formatCamelCase(inputString) {
  return inputString
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
