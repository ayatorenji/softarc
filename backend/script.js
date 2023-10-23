document.addEventListener("DOMContentLoaded", function() {
    const incrementButton = document.getElementById("incrementButton");
    const decrementButton = document.getElementById("decrementButton");
    const numberDisplay = document.getElementById("numberDisplay");

    let count = 0;

    async function incrementCounter() {
        try {
            const response = await fetch('/api/increment', {
                method: 'POST',
            });
            const data = await response.json();
            count = data.count;
            updateNumberDisplay();
        } catch (error) {
            console.error("Error incrementing counter:", error);
        }
    }

    async function decrementCounter() {
        try {
            const response = await fetch('/api/decrement', {
                method: 'POST',
            });
            const data = await response.json();
            count = data.count;
            updateNumberDisplay();
        } catch (error) {
            console.error("Error decrementing counter:", error);
        }
    }

    function updateNumberDisplay() {
        numberDisplay.textContent = count;
    }

    incrementButton.addEventListener("click", incrementCounter);
    decrementButton.addEventListener("click", decrementCounter);

    async function loadInitialCount() {
        try {
            const response = await fetch('/api/count');
            const data = await response.json();
            count = data.count;
            updateNumberDisplay();
        } catch (error) {
            console.error("Error loading initial count:", error);
        }
    }

    // Load the initial count when the DOM is ready
    loadInitialCount();
});
