(function () {
  const interval = setInterval(() => {
    const table = document.querySelector("#tblStudent");
    if (!table) return;

    clearInterval(interval);

    const theadRow = table.querySelector("thead tr");
    const tbodyRows = table.querySelectorAll("tbody tr");

    // Insert new header columns BEFORE the '%' column (which is currently the 8th column, zero-index 7)
    const percentTh = theadRow.children[7];
    if (!document.getElementById("leaveTakenHeader")) {
      // Create new headers
      const leaveTakenTh = document.createElement("th");
      leaveTakenTh.id = "leaveTakenHeader";
      leaveTakenTh.style.width = "100px";
      leaveTakenTh.textContent = "Leave Taken";
      leaveTakenTh.className = percentTh.className;

      const maxLeavesTh = document.createElement("th");
      maxLeavesTh.id = "maxLeavesHeader";
      maxLeavesTh.style.width = "140px";
      maxLeavesTh.textContent = "Max Leave Allowed";
      maxLeavesTh.className = percentTh.className;

      theadRow.insertBefore(leaveTakenTh, percentTh);
      theadRow.insertBefore(maxLeavesTh, percentTh);
    }

    tbodyRows.forEach(row => {
      // Skip if columns already added
      if (row.querySelector(".leave-taken-cell")) return;

      const tds = row.querySelectorAll("td");

      const attendedClasses = parseInt(tds[3].textContent.trim()) || 0;
      const totalClasses = parseInt(tds[5].textContent.trim()) || 0;

      // Calculate leave taken (no. of leaves)
      const leaveTaken = totalClasses - attendedClasses;

      // Calculate max additional leaves allowed to maintain 80% attendance
      let maxLeavesAllowed = Math.floor((attendedClasses - 0.8 * totalClasses) / 0.8);
      if (maxLeavesAllowed < 0) maxLeavesAllowed = 0;

      // Create and style cells consistent with the page's table style
      const leaveTakenTd = document.createElement("td");
      leaveTakenTd.className = tds[0].className + " leave-taken-cell";
      leaveTakenTd.style.textAlign = "center";
      leaveTakenTd.textContent = leaveTaken;

      const maxLeavesTd = document.createElement("td");
      maxLeavesTd.className = tds[0].className + " leave-taken-cell";
      maxLeavesTd.style.textAlign = "center";
      maxLeavesTd.textContent = maxLeavesAllowed;

      // Insert before % column (index 7)
      const percentTd = tds[7];
      row.insertBefore(leaveTakenTd, percentTd);
      row.insertBefore(maxLeavesTd, percentTd);
    });
  }, 300);
})();
