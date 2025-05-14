      // Аймгуудын мэдээллийн JSON
      const aimagInfo = {
        MN061: {
          title: "Dornod",
          content: "Sample Information Database"
        },
        MN0710: {
          title: "Bayan-Ulgii",
          content: "Sample Information Database"
        },
        MN043: {
          title: "Khovd",
          content: "Sample Information Database"
        },
        MN051: {
          title: "Sukhbaatar",
          content: "Sample Information Database"
        },
        MN063: {
          title: "Dornogovi",
          content: "Sample Information Database"
        },
        MN0650: {
          title: "Govi-Altai",
          content: "Sample Information Database"
        },
        MN0690: {
          title: "Bayankhongor",
          content: "Sample Information Database"
        },
        MN053: {
          title: "Umnugovi",
          content: "Sample Information Database"
        },
        MN041: {
          title: "Khuvsgul",
          content: "Sample Information Database"
        },
        MN067: {
          title: "Bulgan",
          content: "Sample Information Database"
        },
        MN046: {
          title: "Uvs",
          content: "Sample Information Database"
        },
        MN049: {
          title: "Selenge",
          content: "Sample Information Database"
        },
        MN0570: {
          title: "Zavkhan",
          content: "Sample Information Database"
        },
        MN039: {
          title: "Khentii",
          content: "Sample Information Database"
        },
        MN037: {
          title: "Darkhan-Uul",
          content: "Sample Information Database"
        },
        MN047: {
          title: "Tuv",
          content: "Sample Information Database"
        },
        MN073: {
          title: "Arkhangai",
          content: "Sample Information Database"
        },
        MN035: {
          title: "Orkhon",
          content: "Sample Information Database"
        },
        MN059: {
          title: "Dundgovi",
          content: "Sample Information Database"
        },
        MN055: {
          title: "Uvurkhangai",
          content: "Sample Information Database"
        },
        MN064: {
          title: "Govi-Sumber",
          content: "Sample Information Database"
        },
        MN1: {
          title: "Ulaanbaatar",
          content: "Sample Information Database"
        }        
      };
  
      // SVG-г fetch хийж оруулах
      fetch('./img/map.svg')
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