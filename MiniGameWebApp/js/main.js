    const gameBoxes = document.querySelectorAll(".GameBox");

    gameBoxes[0].focus();

    document.addEventListener("keydown", function(event) {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const focusedBox = document.activeElement;
        if (focusedBox.classList.contains("GameBox")) {
          const currentIndex = Array.from(gameBoxes).indexOf(focusedBox);
          let nextIndex;

          if (event.key === "ArrowLeft") {
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) {
              nextIndex = gameBoxes.length - 1;
            }
          } else if (event.key === "ArrowRight") {
            nextIndex = currentIndex + 1;
            if (nextIndex >= gameBoxes.length) {
              nextIndex = 0;
            }
          }

          gameBoxes[nextIndex].focus();
        }
      }
    });