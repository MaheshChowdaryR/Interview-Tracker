document.addEventListener("DOMContentLoaded", function () {
    const calendarGrid = document.querySelector(".calendar-grid");
    const calendarTitle = document.getElementById("calendar-title");
    const taskList = document.getElementById("task-list");
    const remarkText = document.getElementById("remark-text");
    const saveRemarkBtn = document.getElementById("save-remark");
    let selectedDate = null;
    let currentMonth = new Date().getMonth(); // Current Month
    let currentYear = new Date().getFullYear(); // Current Year

    // Initial Month and Year display
    function updateCalendar() {
        calendarTitle.innerText = `Calendar for ${getMonthName(currentMonth)} ${currentYear}`;
        generateCalendar();
    }

    // Get Month Name
    function getMonthName(monthIndex) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[monthIndex];
    }

    // Generate the Calendar Grid
    function generateCalendar() {
        calendarGrid.innerHTML = ''; // Clear existing grid
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dateDiv = document.createElement("div");
            dateDiv.innerText = i;
            dateDiv.addEventListener("click", function () {
                selectedDate = new Date(currentYear, currentMonth, i);
                document.getElementById("selected-date").innerText = selectedDate.toLocaleDateString();
                document.getElementById("remark-date").innerText = selectedDate.toLocaleDateString();
                loadRemark();
            });
            calendarGrid.appendChild(dateDiv);
        }
    }

    // Save Remark
    saveRemarkBtn.addEventListener("click", function () {
        if (selectedDate) {
            localStorage.setItem(selectedDate.toLocaleDateString(), remarkText.value);
        }
    });

    // Load Remark
    function loadRemark() {
        if (selectedDate) {
            const storedRemark = localStorage.getItem(selectedDate.toLocaleDateString());
            if (storedRemark) {
                remarkText.value = storedRemark;
            } else {
                remarkText.value = "";
            }
        }
    }

    // Navigation Button Events
    document.getElementById("prev-month").addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });

    document.getElementById("next-month").addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });

    // Year Navigation
    function updateYearSelector() {
        const yearSelector = document.getElementById("year-selector");
        yearSelector.innerHTML = ''; // Clear existing options
        for (let i = currentYear - 5; i <= currentYear + 5; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.innerText = i;
            yearSelector.appendChild(option);
        }
        yearSelector.value = currentYear;
    }

    document.getElementById("prev-year").addEventListener("click", function () {
        currentYear--;
        updateYearSelector();
        updateCalendar();
    });

    document.getElementById("next-year").addEventListener("click", function () {
        currentYear++;
        updateYearSelector();
        updateCalendar();
    });

    document.getElementById("year-selector").addEventListener("change", function () {
        currentYear = parseInt(this.value);
        updateCalendar();
    });

    // Initialize Calendar
    updateCalendar();
    updateYearSelector();
});
