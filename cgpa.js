const gradeMap = {
  'S': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0
};

function calculateCGPA() {
  const rows = document.querySelectorAll("#tblGridViewComplete tbody tr");
  let totalPoints = 0, subjectCount = 0;

  rows.forEach(row => {
    const grade = row.children[3]?.innerText.trim();
    const status = row.children[4]?.innerText.trim();

    if (grade && gradeMap[grade] !== undefined && status === "PASS") {
      totalPoints += gradeMap[grade];
      subjectCount += 1;
    }
  });

  return subjectCount === 0
    ? "No valid subjects"
    : (totalPoints / subjectCount).toFixed(2);
}

function injectCGPABlock() {
  const referenceBox = document.querySelector(".portlet.box.purple-soft");
  if (!referenceBox) {
    console.warn("Graduation Status box not found");
    return;
  }

  // Create the outer green box
  const cgpaBox = document.createElement("div");
  cgpaBox.className = "portlet box";
  cgpaBox.style.backgroundColor = "#37928c";
  cgpaBox.style.border = "none";
  cgpaBox.style.marginTop = "20px";

  // Portlet Title (Header)
  const title = document.createElement("div");
  title.className = "portlet-title";
  title.innerHTML = `
    <div class="caption font-dark">
      <i class="fa fa-calculator"></i>
      <span class="caption-subject uppercase">CGPA CALCULATOR</span>
    </div>
  `;
  title.style.backgroundColor = "#37928c";
  title.style.color = "white";
  title.style.padding = "10px 15px";

  // Portlet Body
  const body = document.createElement("div");
  body.className = "portlet-body";
  body.style.backgroundColor = "#f8f9f9";
  body.style.padding = "20px";
  body.style.display = "flex";
  body.style.alignItems = "center";
  body.style.justifyContent = "space-between"; // left-right spacing
  body.style.textAlign = "left";

  // CGPA label and value container
  const cgpaContainer = document.createElement("div");
  cgpaContainer.style.display = "flex";
  cgpaContainer.style.alignItems = "center";
  cgpaContainer.style.gap = "10px";

  // CGPA Label
  const label = document.createElement('h3');
  label.textContent = 'CGPA';
  label.style.margin = '0';
  label.style.fontSize = '14px';                // matching table font size
  label.style.fontWeight = 'normal';            // matching table font weight
  label.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'; // matching table font family

  // CGPA Value
  const cgpaValue = document.createElement("p");
  cgpaValue.id = "cgpaValue";
  cgpaValue.style.fontSize = '14px';            // matching table font size
  cgpaValue.style.fontWeight = 'bold';          // bold for emphasis
  cgpaValue.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
  cgpaValue.style.color = "#333";
  cgpaValue.style.margin = "0";
  cgpaValue.textContent = calculateCGPA();

  cgpaContainer.appendChild(label);
  cgpaContainer.appendChild(cgpaValue);

  // Recalculate Button
  const button = document.createElement("button");
  button.textContent = "Recalculate";
  button.className = "btn btn-success btn-sm rounded-2";
  button.style.height = "36px";
  button.onclick = (e) => {
    e.preventDefault();
    cgpaValue.innerText = calculateCGPA();
  };

  // Append CGPA container (left) and button (right) to body
  body.appendChild(cgpaContainer);
  body.appendChild(button);

  // Append title and body to the outer box
  cgpaBox.appendChild(title);
  cgpaBox.appendChild(body);

  // Insert the CGPA box right after the Graduation Status box
  referenceBox.parentElement.insertBefore(cgpaBox, referenceBox.nextSibling);
}

// Wait for Graduation Status box to appear before injecting
const interval = setInterval(() => {
  const found = document.querySelector(".portlet.box.purple-soft");
  if (found) {
    clearInterval(interval);
    injectCGPABlock();
  }
}, 500);
