let nutritionData = [];

// JSON өгөгдлүүдийг авах
$.getJSON('data/nutritions.json', function(data) {
  nutritionData = data;
});

// button дээр товшиж food_name-ээр хайна.
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

// li дээр сонгож food_code-оор хайна.
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

// - Nutrient хүснэгт үүсгэх
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

// - Хүснэгтийг харуулах
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