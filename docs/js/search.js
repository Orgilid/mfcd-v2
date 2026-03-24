let nutritionData = [];

// JSON өгөгдлүүдийг авах
$.getJSON('data/nutritions.json', function(data) {
  nutritionData = data;
});

// Хайх хэсэг. button дээр товшиж food_name-ээр хайна.
$('#searchBtn').click(function () {  
  $('input[name="foodcode"]:checked').prop('checked', false); // Бүх сонголтыг цуцлах  
  $('#resultTbl').empty(); // хүснэгт үүсгэх div-ыг цэвэрлэх
  const keyword = $('#searchTxt').val().trim().toLowerCase(); // Хайх үгийг авах

  // keyword хоосон байвал хайлт хийхгүй
  if (!keyword) {
    $('#resultTbl').html(`<p class="notification is-warning">Please enter a food name.</p>`);
    return;
  }
  // food_name нь keyword-оор эхэлсэн бүх утгыг сангаас шүүнэ.
  const matches = nutritionData.filter(item =>
    item.food_name.toLowerCase().startsWith(keyword)
  );

    // Nutritions: Proximates Minerals Vitamins гэх мэт сонголтын утгуудыг value авах
  const selectedNutrients = $('input[name="nutrition"]:checked').map(function () {
    return this.value;
  }).get(); // ["proximates", "minerals", "vitamins"] гэх мэт

  renderNutritionTables(matches, selectedNutrients);
});

// Хайх хэсэг. Жагсаалт дээр checked хийж food_code-оор хайна.
$('input[name="foodcode"]').on('change', function () {
  $('#searchTxt').val(''); 
  const selectedFoodCodes = $('input[name="foodcode"]:checked').map(function () {
    return this.value;
  }).get();

  const matches = nutritionData.filter(item =>
    selectedFoodCodes.includes(item.food_code)
  );

  // Nutritions: Proximates Minerals Vitamins гэх мэт сонголтын утгуудыг value авах
  const selectedNutrients = $('input[name="nutrition"]:checked').map(function () {
    return this.value;
  }).get(); // ["proximates", "minerals", "vitamins"] гэх мэт

  renderNutritionTables(matches, selectedNutrients);
});

// Тооцоолох хэсэг. Тооцоолох хүснэгт үүсгэнэ.
$('input[name="foodcalculate"]').on('change', function () {  
  const selectedCalFoodCodes = $('input[name="foodcalculate"]:checked').map(function () {
    return this.value;
  }).get();

  const calMatches = nutritionData.filter(item =>
    selectedCalFoodCodes.includes(item.food_code)
  );  

  renderCalculationTables(calMatches);
});

$('#calculateBtn').click(function () {    
  $('#resultCalculatedTbl').empty();

});

// Дэд функцүүд:
// - Эхний үсгийг том болгох, _ тэмдэгтийг зайгаар солих
function capitalizeFirstLetter(str) {
  const cleaned = str.replace(/_/g, ' '); // _ тэмдэгтийг зайгаар солих
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

// - Null утгыг "" болгох
function safeValue(val) {
  return val ?? "";
}

// - Хайх Nutrient хүснэгт үүсгэх
function generateNutrientTable(nutrientType, matches) {
  const capitalizedNutrientType = capitalizeFirstLetter(nutrientType);
  let tbl = `<div class="table-container box tbl">
               <h2 class="subtitle is-5 has-text-weight-bold has-text-centered">${capitalizedNutrientType}</h2>
               <table class="table is-striped is-bordered is-hoverable is-fullwidth">
               <thead> <tr> <th>Food name</th>`;

  if (nutrientType === "images") {
     tbl += `<th>Number of Images</th>`;
     tbl += `</tr> </thead><tbody>`;

    matches.forEach(match => {
      tbl += `<tr><td>${match.food_name}</td>`;
      const code = match.food_code;
      const imageCount = allImages.filter(img => img.includes(`/foods/${code}_`)).length;      
      tbl += `<td><a class="has-text-grey-dark" href="#" onclick="showImages('${code}', '${match.food_name}'); return false;">${imageCount}</a></td>`;
      tbl += `</tr>`;
    });

  } else if (nutrientType === "description") {
    tbl += `<th>Food group</th> <th>Scientific name</th> <th>Native name</th>`;
    tbl += `</tr> </thead><tbody>`;
    matches.forEach(match => {
      tbl += `<tr><td>${match.food_name}</td>`;
      tbl += `<td>${safeValue(match.food_group)}</td>`;
      tbl += `<td>${safeValue(match.scientific_name)}</td>`;
      tbl += `<td>${safeValue(match.native_name)}</td>`;
      tbl += `</tr>`;
    });
  } else {
    const nutrient = matches[0][nutrientType];
    $.each(nutrient, function(key, value) {
      tbl += `<th>${key}</th>`;
    });
    tbl += `</tr> </thead><tbody>`;

    matches.forEach(match => {
      tbl += `<tr><td>${match.food_name}</td>`;
      const n = match[nutrientType];
      $.each(n, function(key, value) {
        tbl += `<td>${safeValue(value)}</td>`;
      });
      tbl += `</tr>`;
    });
  }
  tbl += `</tbody> </table> </div> <br>`;
  return tbl;
}

// - Хайх хүснэгтийг харуулах
function renderNutritionTables(matches, selectedNutrients) {
  if (matches.length > 0 && selectedNutrients.length > 0) {
    let resultHTML = '';
    selectedNutrients.forEach(nutrientType => {
      resultHTML += generateNutrientTable(nutrientType, matches);
    });
    $('#resultTbl').html(resultHTML);
  } else {
    $('#resultTbl').html(`<p class="notification is-warning">No match found.</p>`);
  }
}

// - Тооцоолох хүснэгт үүсгэх
function generateCalculateTable(calMatches) {
  let tbl = `<div class="table-container box tbl">
               <h2 class="subtitle is-5 has-text-weight-bold has-text-centered">Calculation Table</h2>
               <table class="table is-striped is-bordered is-hoverable is-fullwidth">
               <thead> 
               <tr> 
                 <th>Food Name</th> 
                 <th>Amount (g)</th> 
                 <th>Calculated Energy (kcal)</th>
                 <th>Protein Energy (%)</th>
                 <th>Fat Energy (%)</th>
                 <th>Carbohydrate Energy (%)</th> 
               </tr> 
               </thead> 
               <tbody>`;

  calMatches.forEach(match => {
    const code = match.food_code;
    const protein = parseFloat(match.proximates["Protein (g)"]) || 0;
    const fat = parseFloat(match.proximates["Fat (g)"]) || 0;
    const carb = parseFloat(match.proximates["Carbohydrate (g)"]) || 0;

    const baseEnergy = protein * 4 + fat * 9 + carb * 4;
    const protPct = baseEnergy ? (protein * 4 / baseEnergy * 100).toFixed(2) : "0.00";
    const fatPct = baseEnergy ? (fat * 9 / baseEnergy * 100).toFixed(2) : "0.00";
    const carbPct = baseEnergy ? (carb * 4 / baseEnergy * 100).toFixed(2) : "0.00";

    tbl += `<tr>`;
    tbl += `<td>${match.food_name || "N/A"}</td>`;
    tbl += `<td>
              <input type="number" id="amount-${code}" value="100" min="1"
                     oninput="recalculate('${code}', ${protein}, ${fat}, ${carb})"
                     style="border: none; background: transparent; outline: none; color: #ff914d; width: auto; min-width: 4ch; max-width: 10ch;"
                     class="amount-input">
            </td>`;
    tbl += `<td id="energy-${code}">${baseEnergy.toFixed(2)}</td>`;
    tbl += `<td id="prot-${code}">${protPct}</td>`;
    tbl += `<td id="fat-${code}">${fatPct}</td>`;
    tbl += `<td id="carb-${code}">${carbPct}</td>`;
    tbl += `</tr>`;
  });

  // Total row (tfoot)
  tbl += `</tbody>
          <tfoot>
            <tr style="font-weight: bold;">
              <td>Total</td>              
              <td id="total-amount">0.00</td>
              <td id="total-energy">0.00</td>
              <td id="total-prot">0.00</td>
              <td id="total-fat">0.00</td>
              <td id="total-carb">0.00</td>
            </tr>
          </tfoot>
          </table>
          </div>`;
  return tbl;
}

// - Тооцоолох хүснэгтийг харуулах
function renderCalculationTables(calMatches) {
  if (calMatches.length > 0) {
    let resultHTML = '';
    
      resultHTML += generateCalculateTable(calMatches);
    
    $('#resultCalculatedTbl').html(resultHTML);
  } else {
    $('#resultCalculatedTbl').html(`<p class="notification is-warning">No match found.</p>`);
  }  
}