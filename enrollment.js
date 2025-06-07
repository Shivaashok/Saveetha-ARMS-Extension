(function () {
  const interval = setInterval(() => {
    const rejectedSpan = [...document.querySelectorAll("span")].find(s => s.textContent.trim() === "Rejected");
    const courseDetailsBox = document.querySelector(".portlet.box.blue-hoki");

    if (rejectedSpan && courseDetailsBox) {
      clearInterval(interval);

      if (document.getElementById("facultySlotInjector")) return;

      const container = document.createElement("div");
      container.className = "portlet box";
      container.style.backgroundColor = "#37928c";
      container.style.border = "none";
      container.style.margin = "20px 0";
      container.id = "facultySlotInjector";

      const title = document.createElement("div");
      title.className = "portlet-title";
      title.style.backgroundColor = "#37928c";
      title.style.color = "white";
      title.style.padding = "10px 15px";
      title.innerHTML = `
        <div class="caption font-dark">
          <i class="fa fa-search"></i>
          <span class="caption-subject uppercase">FACULTY SLOT SEARCH</span>
        </div>`;

      const body = document.createElement("div");
      body.className = "portlet-body";
      body.style.backgroundColor = "#f8f9f9";
      body.style.padding = "20px";
      body.style.display = "flex";
      body.style.alignItems = "center";
      body.style.justifyContent = "flex-start";
      body.style.gap = "15px";

      const slotSelect = document.createElement("select");
      slotSelect.id = "slotSelect";
      slotSelect.className = "form-control";
      slotSelect.style.width = "150px";
      slotSelect.style.height = "36px";
      slotSelect.style.fontSize = "14px";
      slotSelect.innerHTML = `<option value="0">-- Select Slot --</option>` +
        Array.from({ length: 20 }, (_, i) => {
          const letter = String.fromCharCode(65 + i);
          return `<option value="${i + 1}">Slot ${letter}</option>`;
        }).join("");

      const facultyInput = document.createElement("input");
      facultyInput.type = "text";
      facultyInput.id = "facultyInput";
      facultyInput.placeholder = "Enter Faculty Name";
      facultyInput.style.height = "36px";
      facultyInput.style.fontSize = "14px";
      facultyInput.style.padding = "0 8px";
      facultyInput.style.width = "250px";

      const startBtn = document.createElement("button");
      startBtn.textContent = "Start Monitoring";
      startBtn.className = "btn btn-success btn-sm rounded-2";
      startBtn.style.height = "36px";

      const pauseBtn = document.createElement("button");
      pauseBtn.textContent = "Pause";
      pauseBtn.className = "btn btn-warning btn-sm rounded-2";
      pauseBtn.style.height = "36px";
      pauseBtn.disabled = true;

      const endBtn = document.createElement("button");
      endBtn.textContent = "■";
      endBtn.className = "btn btn-danger btn-sm rounded-2";
      endBtn.style.height = "36px";
      endBtn.title = "End Monitoring";
      endBtn.disabled = true;

      const statusText = document.createElement("span");
      statusText.id = "monitorStatus";
      statusText.style.marginLeft = "10px";
      statusText.style.fontWeight = "bold";
      statusText.style.fontSize = "14px";
      statusText.style.color = "#333";

      body.appendChild(slotSelect);
      body.appendChild(facultyInput);
      body.appendChild(startBtn);
      body.appendChild(pauseBtn);
      body.appendChild(endBtn);
      body.appendChild(statusText);

      container.appendChild(title);
      container.appendChild(body);

      courseDetailsBox.parentElement.insertBefore(container, courseDetailsBox);

      let cycleInterval = null;
      let refreshTimeoutId = null;
      let isPaused = false;
      let matchedLabels = [];
      let currentHighlightIndex = 0;

      function resetHighlights() {
        matchedLabels.forEach(label => label.style.backgroundColor = "");
      }

      function selectPageSlotAndSearch(slotValue) {
        const realSlotDropdown = document.getElementById("cphbody_ddlslot");
        if (!realSlotDropdown) {
          console.warn("Real page slot dropdown not found");
          return false;
        }
        if (realSlotDropdown.value !== slotValue) {
          realSlotDropdown.value = slotValue;
          realSlotDropdown.dispatchEvent(new Event('change', { bubbles: true }));
          return true;
        }
        return false;
      }

      function findMatchingFaculties(facultyName) {
        const tbody = document.getElementById("tbltbodyslota");
        if (!tbody) return [];
        const labels = Array.from(tbody.querySelectorAll("label"));
        return labels.filter(label => label.innerText.toLowerCase().includes(facultyName.toLowerCase()));
      }

      function cycleHighlighting(facultyName, slotValue) {
        resetHighlights();
        matchedLabels = findMatchingFaculties(facultyName);
        currentHighlightIndex = 0;

        if (matchedLabels.length === 0) {
          statusText.textContent = `Faculty "${facultyName}" NOT found in Slot ${slotSelect.options[slotSelect.selectedIndex].text}. Refreshing in 5 seconds...`;
          refreshTimeoutId = setTimeout(() => {
            if (!isPaused) location.reload();
          }, 5000);
          return;
        }

        statusText.textContent = `Found ${matchedLabels.length} matches for "${facultyName}". Cycling through...`;

        cycleInterval = setInterval(() => {
          if (isPaused) return;

          resetHighlights();

          if (matchedLabels[currentHighlightIndex]) {
            matchedLabels[currentHighlightIndex].style.backgroundColor = "#ffff99";
            matchedLabels[currentHighlightIndex].scrollIntoView({ behavior: "smooth", block: "center" });
          }

          currentHighlightIndex++;

          if (currentHighlightIndex >= matchedLabels.length) {
            clearInterval(cycleInterval);
            statusText.textContent = `Completed cycle for Slot ${slotSelect.options[slotSelect.selectedIndex].text}. Refreshing in 5 seconds...`;
            refreshTimeoutId = setTimeout(() => {
              if (!isPaused) location.reload();
            }, 5000);
          }
        }, 1500);
      }

      function performSearchCycle() {
        if (isPaused) {
          statusText.textContent = "Monitoring paused.";
          return;
        }

        const facultyName = facultyInput.value.trim();
        const slotValue = slotSelect.value;

        if (!facultyName || slotValue === "0") {
          statusText.textContent = "Please select a slot and enter faculty name.";
          return;
        }

        statusText.textContent = `Selecting slot ${slotSelect.options[slotSelect.selectedIndex].text} and searching...`;

        const changed = selectPageSlotAndSearch(slotValue);

        if (changed) {
          setTimeout(() => {
            cycleHighlighting(facultyName, slotValue);
          }, 2500);
        } else {
          cycleHighlighting(facultyName, slotValue);
        }
      }

      startBtn.onclick = (e) => {
        e.preventDefault();

        const selectedSlot = slotSelect.value;
        const facultyName = facultyInput.value.trim();

        if (selectedSlot === "0" || facultyName === "") {
          statusText.textContent = "Please select a slot and enter faculty name before starting.";
          return;
        }

        // Store state
        localStorage.setItem("monitoring", "true");
        localStorage.setItem("facultyName", facultyName);
        localStorage.setItem("slotValue", selectedSlot);

        isPaused = false;
        pauseBtn.textContent = "Pause";

        pauseBtn.disabled = false;
        endBtn.disabled = false;
        startBtn.disabled = true;
        slotSelect.disabled = true;
        facultyInput.disabled = true;

        if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
        if (cycleInterval) clearInterval(cycleInterval);

        statusText.textContent = `Monitoring started for faculty "${facultyName}" in Slot ${slotSelect.options[slotSelect.selectedIndex].text}.`;

        performSearchCycle();
      };

      pauseBtn.onclick = (e) => {
        e.preventDefault();
        if (!startBtn.disabled) {
          statusText.textContent = "Monitoring not started yet.";
          return;
        }
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? "Resume" : "Pause";
        statusText.textContent = isPaused ? "Monitoring paused." : "Monitoring resumed.";

        if (!isPaused) {
          if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
          performSearchCycle();
        } else {
          if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
          if (cycleInterval) clearInterval(cycleInterval);
        }
      };

      endBtn.onclick = (e) => {
        e.preventDefault();

        if (refreshTimeoutId) clearTimeout(refreshTimeoutId);
        if (cycleInterval) clearInterval(cycleInterval);

        resetHighlights();

        facultyInput.value = "";
        slotSelect.value = "0";

        slotSelect.disabled = false;
        facultyInput.disabled = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        endBtn.disabled = true;

        const realSlotDropdown = document.getElementById("cphbody_ddlslot");
        if (realSlotDropdown) {
          realSlotDropdown.value = "0";
          realSlotDropdown.dispatchEvent(new Event('change', { bubbles: true }));
        }

        isPaused = false;
        pauseBtn.textContent = "Pause";
        refreshTimeoutId = null;

        statusText.textContent = "Monitoring ended and inputs cleared.";

        // Clear localStorage
        localStorage.removeItem("monitoring");
        localStorage.removeItem("facultyName");
        localStorage.removeItem("slotValue");
      };

      // Resume on reload if previously monitoring
      const savedMonitoring = localStorage.getItem("monitoring");
      const savedFaculty = localStorage.getItem("facultyName");
      const savedSlot = localStorage.getItem("slotValue");

      if (savedMonitoring === "true" && savedFaculty && savedSlot) {
        facultyInput.value = savedFaculty;
        slotSelect.value = savedSlot;
        setTimeout(() => startBtn.click(), 1000);
      }
    }
  }, 500);
})();
