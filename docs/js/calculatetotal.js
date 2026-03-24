function recalculate(code, baseProtein, baseFat, baseCarb) {
  const amount = parseFloat(document.getElementById(`amount-${code}`).value) || 0;

  const protein = baseProtein * amount / 100;
  const fat = baseFat * amount / 100;
  const carb = baseCarb * amount / 100;

  const energy = protein * 4 + fat * 9 + carb * 4;

  const protPct = energy ? (protein * 4 / energy * 100).toFixed(2) : "0.00";
  const fatPct = energy ? (fat * 9 / energy * 100).toFixed(2) : "0.00";
  const carbPct = energy ? (carb * 4 / energy * 100).toFixed(2) : "0.00";

  document.getElementById(`energy-${code}`).textContent = energy.toFixed(2);
  document.getElementById(`prot-${code}`).textContent = protPct;
  document.getElementById(`fat-${code}`).textContent = fatPct;
  document.getElementById(`carb-${code}`).textContent = carbPct;

  // 🔁 Нийтийг шинэчлэх
  updateTotals();
}

function updateTotals() {
  let totalAmount = 0;
  let totalEnergy = 0;
  let totalProteinEnergy = 0;
  let totalFatEnergy = 0;
  let totalCarbEnergy = 0;
  let rowCount = 0;

  document.querySelectorAll('.amount-input').forEach(input => {
    const code = input.id.replace("amount-", "");
    const amount = parseFloat(input.value) || 0;
    const energy = parseFloat(document.getElementById(`energy-${code}`).textContent) || 0;
    const prot = parseFloat(document.getElementById(`prot-${code}`).textContent) || 0;
    const fat = parseFloat(document.getElementById(`fat-${code}`).textContent) || 0;
    const carb = parseFloat(document.getElementById(`carb-${code}`).textContent) || 0;

    totalAmount += amount;
    totalEnergy += energy;
    totalProteinEnergy += prot;
    totalFatEnergy += fat;
    totalCarbEnergy += carb;
    rowCount++;
  });

  document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
  document.getElementById("total-energy").textContent = totalEnergy.toFixed(2);
  document.getElementById("total-prot").textContent = (rowCount ? totalProteinEnergy / rowCount : 0).toFixed(2);
  document.getElementById("total-fat").textContent = (rowCount ? totalFatEnergy / rowCount : 0).toFixed(2);
  document.getElementById("total-carb").textContent = (rowCount ? totalCarbEnergy / rowCount : 0).toFixed(2);
}
