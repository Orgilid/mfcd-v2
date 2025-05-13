      // Аймгуудын мэдээллийн JSON
      const aimagInfo = {
        MN061: {
          title: "Dornod",
          content: "Дорнод аймаг"
        },
        MN0710: {
          title: "Bayan-Ulgii",
          content: "Баян-Өлгий аймаг"
        },
        MN043: {
          title: "Khovd",
          content: "Ховд аймаг"
        },
        MN051: {
          title: "Sukhbaatar",
          content: "Сүхбаатар аймаг"
        },
        MN063: {
          title: "Dornogovi",
          content: "Дорноговь аймаг"
        },
        MN0650: {
          title: "Govi-Altai",
          content: "Говь-Алтай аймаг"
        },
        MN0690: {
          title: "Bayankhongor",
          content: "Баянхонгор аймаг"
        },
        MN053: {
          title: "Umnugovi",
          content: "Өмнөговь аймаг"
        },
        MN041: {
          title: "Khuvsgul",
          content: "Хөвсгөл аймаг"
        },
        MN067: {
          title: "Bulgan",
          content: "Булган аймаг"
        },
        MN046: {
          title: "Uvs",
          content: "Увс аймаг"
        },
        MN049: {
          title: "Selenge",
          content: "Сэлэнгэ аймаг"
        },
        MN0570: {
          title: "Zavkhan",
          content: "Завхан аймаг"
        },
        MN039: {
          title: "Khentii",
          content: " аймаг"
        },
        MN037: {
          title: "Darkhan-Uul",
          content: " аймаг"
        },
        MN047: {
          title: "Tuv",
          content: " аймаг"
        },
        MN073: {
          title: "Arkhangai",
          content: " аймаг"
        },
        MN035: {
          title: "Orkhon",
          content: " аймаг"
        },
        MN059: {
          title: "Dundgovi",
          content: " аймаг"
        },
        MN055: {
          title: "Uvurkhangai",
          content: " аймаг"
        },
        MN064: {
          title: "Govi-Sumber",
          content: " аймаг"
        },
        MN1: {
          title: "Ulaanbaatar",
          content: " аймаг"
        }        
      };
  
      // SVG-г fetch хийж оруулах
      fetch('img/map.svg')
        .then(response => response.text())
        .then(svgData => {
          document.getElementById('svg-container').innerHTML = svgData;
  
          // SVG ачаалсны дараа click event холбох
          document.querySelectorAll("svg path").forEach(path => {
            path.addEventListener("click", () => {
              const id = path.id;             
              if (aimagInfo[id]) {
                document.getElementById("modalTitle").textContent = aimagInfo[id].title;
                document.getElementById("modalContent").textContent = aimagInfo[id].content;
                document.getElementById("infoModal").classList.add("is-active");
              }
            });
          });
        });
  
      // Modal хаах
      function closeModal() {
        document.getElementById("infoModal").classList.remove("is-active");
      }