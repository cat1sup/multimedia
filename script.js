var map = L.map('map').setView([44.4268, 26.1025], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Handle form submission
document.getElementById('getRoutesBtn').addEventListener('click', function () {
    var origin = document.getElementById('origin').value;
    var destination = document.getElementById('destination').value;

    // TODO: Implement logic to fetch and display public transport routes based on user input

    // Example marker for user's location (replace with actual logic)
    L.marker([44.4268, 26.1025]).addTo(map).bindPopup('Your Location: ' + origin).openPopup();
});

// TODO: Implement logic to fetch and display public transport schedule

// Example schedule data (replace with actual data)
var scheduleData = [
    { time: '08:00 AM', route: 'Bus 101', stop: 'Piata Romana' },
    { time: '08:30 AM', route: 'Bus 102', stop: 'Pipera' },
    { time: '09:00 AM', route: 'Bus 103', stop: 'Berceni' },
    { time: '09:30 AM', route: 'Bus 104', stop: 'Pantelimon' },
    { time: '10:00 AM', route: 'Bus 105', stop: 'Colentina' },
    { time: '10:30 AM', route: 'Bus 106', stop: 'Nicolae Grigorescu' },
    { time: '11:00 AM', route: 'Bus 107', stop: 'Titan' },
    { time: '11:30 AM', route: 'Bus 108', stop: 'Costin Georgian' },


    // Add more schedule data as needed
];

// Display the schedule
var scheduleHtml = '<ul>';
scheduleData.forEach(function (item) {
    scheduleHtml += `<li>${item.time} - ${item.route} - Stop: ${item.stop}</li>`;
});
scheduleHtml += '</ul>';
document.getElementById('schedule').innerHTML = scheduleHtml;


