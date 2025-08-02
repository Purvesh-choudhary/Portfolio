      // Get the game name from the current filename
      const currentPage = window.location.pathname.split("/").pop();

     fetch("../games.json")
        .then((res) => res.json())
        .then((games) => {
          const game = games.find((g) => g.page === "Games/" + currentPage);
          if (!game) return;

          // Update Title & Desc
          document.title = `${game.title} | Game Detail`;
          document.querySelector("h1").textContent = game.title;
        //   document.querySelector("p").textContent = game.desc;

          // Update Play + GitHub Links
          const links = document.querySelectorAll("a");
          links.forEach((link) => {
            if (link.textContent.includes("▶ Play Game")) link.href = game.link;
            if (link.textContent.includes("Source Code"))
              link.href =
                game.github
          });

          // Dynamically add gallery images
          const gallery = document.getElementById("gallery");
          for (let i = 1; i <= game.imageCount; i++) {
            const img = document.createElement("img");
            img.src = `../${game.imageFolder} (${i}).png`;
            img.alt = `${game.title} Screenshot ${i}`;
            img.className = "rounded-xl shadow-md object-cover";
            gallery.appendChild(img);
          }
        })
        .catch((err) => console.error("Error loading game data:", err));
    