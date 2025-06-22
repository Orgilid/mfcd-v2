let nutritionData=[];function capitalizeFirstLetter(t){let e=t.replace(/_/g," ");return e.charAt(0).toUpperCase()+e.slice(1)}function safeValue(t){return t??""}function generateNutrientTable(t,e){let a=capitalizeFirstLetter(t),n=`<div class="table-container box tbl">
               <h2 class="subtitle is-5 has-text-weight-bold has-text-centered">${a}</h2>
               <table class="table is-striped is-bordered is-hoverable is-fullwidth">
               <thead> <tr> <th>Food name</th>`;if("images"===t)n+="<th>Number of Images</th>",n+="</tr> </thead><tbody>",e.forEach(t=>{n+=`<tr><td>${t.food_name}</td>`;let e=t.food_code,a=allImages.filter(t=>t.includes(`/foods/${e}_`)).length;n+=`<td><a class="has-text-grey-dark" href="#" onclick="showImages('${e}', '${t.food_name}'); return false;">${a}</a></td>`,n+="</tr>"});else if("description"===t)n+="<th>Food group</th> <th>Scientific name</th> <th>Native name</th>",n+="</tr> </thead><tbody>",e.forEach(t=>{n+=`<tr><td>${t.food_name}</td>`,n+=`<td>${safeValue(t.food_group)}</td>`,n+=`<td>${safeValue(t.scientific_name)}</td>`,n+=`<td>${safeValue(t.native_name)}</td>`,n+="</tr>"});else{let o=e[0][t];$.each(o,function(t,e){n+=`<th>${t}</th>`}),n+="</tr> </thead><tbody>",e.forEach(e=>{n+=`<tr><td>${e.food_name}</td>`;let a=e[t];$.each(a,function(t,e){n+=`<td>${safeValue(e)}</td>`}),n+="</tr>"})}return n+="</tbody> </table> </div> <br>"}$.getJSON("data/nutritions.json",function(t){nutritionData=t}),$("#searchBtn").click(function(){$('input[name="foodcode"]:checked').prop("checked",!1),$("#resultTbl").empty();let t=$("#searchTxt").val().trim().toLowerCase();if(!t){$("#resultTbl").html('<p class="notification is-warning">Please enter a food name.</p>');return}let e=nutritionData.filter(e=>e.food_name.toLowerCase().startsWith(t)),a=$('input[name="nutrition"]:checked').map(function(){return this.value}).get();renderNutritionTables(e,a)}),$('input[name="foodcode"]').on("change",function(){$("#searchTxt").val("");let t=$('input[name="foodcode"]:checked').map(function(){return this.value}).get(),e=nutritionData.filter(e=>t.includes(e.food_code)),a=$('input[name="nutrition"]:checked').map(function(){return this.value}).get();renderNutritionTables(e,a)}),$('input[name="foodcalculate"]').on("change",function(){let t=$('input[name="foodcalculate"]:checked').map(function(){return this.value}).get(),e=nutritionData.filter(e=>t.includes(e.food_code));renderCalculationTables(e)}),$("#calculateBtn").click(function(){$("#resultCalculatedTbl").empty()});

function renderNutritionTables(t,e){if(t.length>0&&e.length>0){let a="";e.forEach(e=>{a+=generateNutrientTable(e,t)}),$("#resultTbl").html(a)}else $("#resultTbl").html('<p class="notification is-warning">No match found.</p>')}function generateCalculateTable(t){let e=`<div class="table-container box tbl">
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
               <tbody>`;return t.forEach(t=>{let a=t.food_code,l=parseFloat(t.proximates["Protein (g)"])||0,d=parseFloat(t.proximates["Fat (g)"])||0,o=parseFloat(t.proximates["Carbohydrate (g)"])||0,i=4*l+9*d+4*o,n=i?(4*l/i*100).toFixed(2):"0.00",r=i?(9*d/i*100).toFixed(2):"0.00",h=i?(4*o/i*100).toFixed(2):"0.00";e+="<tr>",e+=`<td>${t.food_name||"N/A"}</td>`,e+=`<td>
              <input type="number" id="amount-${a}" value="100" min="1"
                     oninput="recalculate('${a}', ${l}, ${d}, ${o})"
                     style="border: none; background: transparent; outline: none; color: #ff914d; width: auto; min-width: 4ch; max-width: 10ch;"
                     class="amount-input">
            </td>`,e+=`<td id="energy-${a}">${i.toFixed(2)}</td>`,e+=`<td id="prot-${a}">${n}</td>`,e+=`<td id="fat-${a}">${r}</td>`,e+=`<td id="carb-${a}">${h}</td>`,e+="</tr>"}),e+=`</tbody>
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
          </div>`}function renderCalculationTables(t){if(t.length>0){let e="";e+=generateCalculateTable(t),$("#resultCalculatedTbl").html(e)}else $("#resultCalculatedTbl").html('<p class="notification is-warning">No match found.</p>')}