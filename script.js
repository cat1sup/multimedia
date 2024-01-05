document.addEventListener('DOMContentLoaded', function () {
    // Initialize the map
    let map = L.map('map').setView([44.4268, 26.1025], 12);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);

    startFunCanvasClock();
    function startFunCanvasClock() {
        let canvas = document.getElementById('funCanvas');
        let ctx = canvas.getContext('2d');

        function drawClock() {
            let now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 10, 0, 2 * Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.closePath();

            // Hour
            ctx.beginPath();
            var hourAngle = ((hours + 9) % 12 + minutes / 60) * 30 * Math.PI / 180;
            var hourLength = canvas.height / 2 - 40;
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 + hourLength * Math.cos(hourAngle), canvas.height / 2 + hourLength * Math.sin(hourAngle));
            ctx.lineWidth = 8;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.closePath();

            // Minute
            ctx.beginPath();
            var minuteAngle = (minutes + 45) * 6 * Math.PI / 180;
            var minuteLength = canvas.height / 2 - 20;
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 + minuteLength * Math.cos(minuteAngle), canvas.height / 2 + minuteLength * Math.sin(minuteAngle));
            ctx.lineWidth = 5;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.closePath();

            // Seconds
            ctx.beginPath();
            var secondAngle = (seconds + 45) * 6 * Math.PI / 180;
            var secondLength = canvas.height / 2 - 10;
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.lineTo(canvas.width / 2 + secondLength * Math.cos(secondAngle), canvas.height / 2 + secondLength * Math.sin(secondAngle));
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.stroke();
            ctx.closePath();

            requestAnimationFrame(drawClock);
        }

        drawClock();
    }

    function showUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let userLocation = [position.coords.latitude, position.coords.longitude];
                L.marker(userLocation).addTo(map).bindPopup('Your Location').openPopup();
                map.setView(userLocation, 12); // Set the view to the user's location
            });
        } else {
            alert('Geolocation is not supported by your browser');
        }
    }

    document.getElementById('findLocationBtn').addEventListener('click', function () {
        showUserLocation();
    });

    function handleBusClick(busNumber, scheduleData, startLocation, lastStopLocation) {
        let scheduleHtml = '<ul>';
        scheduleData.forEach(function (item) {
            scheduleHtml += `<li>${item.time} - ${item.route} - Stop: ${item.stop}</li>`;
        });
        scheduleHtml += '</ul>';
        document.getElementById('schedule').innerHTML = scheduleHtml;

        L.marker(startLocation).addTo(map).bindPopup(`Bus ${busNumber} start point`).openPopup();
        map.setView(startLocation, 12);

        L.marker(lastStopLocation).addTo(map).bindPopup(`Bus ${busNumber} last stop`).openPopup();
        map.setView(lastStopLocation, 12);
    }

    document.getElementById('bus1').addEventListener('click', function () {
        handleBusClick('101', scheduleData1, [44.4268, 26.1025], [44.443002, 26.124120]);
    });

    document.getElementById('bus2').addEventListener('click', function () {
        handleBusClick('102', scheduleData2, [44.435029, 26.070954], [44.417085, 26.107490]);
    });

    document.getElementById('bus3').addEventListener('click', function () {
        handleBusClick('103', scheduleData3, [44.427082, 26.065338], [44.403549, 26.169523]);
    });

    document.getElementById('bus4').addEventListener('click', function () {
        handleBusClick('104', scheduleData4, [44.455056, 26.138802], [44.408797, 26.057324]);
    });

    document.getElementById('bus5').addEventListener('click', function () {
        handleBusClick('105', scheduleData5, [44.397027, 26.148597], [44.480317, 26.056878]);
    });

    let scheduleData1 = [
        { time: '08:00 AM', route: 'Bus 101', stop: 'Piata Romana' },
        { time: '08:30 AM', route: 'Bus 101', stop: 'Pipera' },
        { time: '09:00 AM', route: 'Bus 101', stop: 'Berceni' },
        { time: '09:30 AM', route: 'Bus 101', stop: 'Pantelimon' },
        { time: '10:00 AM', route: 'Bus 101', stop: 'Colentina' },
        { time: '10:30 AM', route: 'Bus 101', stop: 'Nicolae Grigorescu' },
        { time: '11:00 AM', route: 'Bus 101', stop: 'Titan' },
        { time: '11:30 AM', route: 'Bus 101', stop: 'Costin Georgian' },
    ];

    let scheduleData2 = [
        { time: '08:00 AM', route: 'Bus 102', stop: 'Rome' },
        { time: '08:30 AM', route: 'Bus 102', stop: 'Paris' },
        { time: '09:00 AM', route: 'Bus 102', stop: 'Amsterdam' },
        { time: '09:30 AM', route: 'Bus 102', stop: 'Tirana' },
        { time: '10:00 AM', route: 'Bus 102', stop: 'Berlin' },
        { time: '10:30 AM', route: 'Bus 102', stop: 'Riga' },
        { time: '11:00 AM', route: 'Bus 102', stop: 'Seoul' },
        { time: '11:30 AM', route: 'Bus 102', stop: 'Tokyo' },
    ];

    let scheduleData3 = [
        { time: '08:00 AM', route: 'Bus 103', stop: 'Kaufland' },
        { time: '08:30 AM', route: 'Bus 103', stop: 'Penny' },
        { time: '09:00 AM', route: 'Bus 103', stop: 'Profi' },
        { time: '09:30 AM', route: 'Bus 103', stop: 'Mega Image' },
        { time: '10:00 AM', route: 'Bus 103', stop: 'Supeco' },
        { time: '10:30 AM', route: 'Bus 103', stop: 'Auchan' },
        { time: '11:00 AM', route: 'Bus 103', stop: 'Carrefour' },
        { time: '11:30 AM', route: 'Bus 103', stop: 'Lidl' },
    ];

    let scheduleData4 = [
        { time: '08:00 AM', route: 'Bus 104', stop: 'Super Bet' },
        { time: '08:30 AM', route: 'Bus 104', stop: 'Vlad Casino' },
        { time: '09:00 AM', route: 'Bus 104', stop: 'Fortuna' },
        { time: '09:30 AM', route: 'Bus 104', stop: 'Betano' },
        { time: '10:00 AM', route: 'Bus 104', stop: 'NetBet' },
        { time: '10:30 AM', route: 'Bus 104', stop: 'Princess Casino' },
        { time: '11:00 AM', route: 'Bus 104', stop: 'Unibet' },
        { time: '11:30 AM', route: 'Bus 104', stop: 'MaxBet' },
    ];

    let scheduleData5 = [
        { time: '08:00 AM', route: 'Bus 105', stop: 'Shibuya' },
        { time: '08:30 AM', route: 'Bus 105', stop: 'Ginza' },
        { time: '09:00 AM', route: 'Bus 105', stop: 'Asakusa' },
        { time: '09:30 AM', route: 'Bus 105', stop: 'Shinjuku' },
        { time: '10:00 AM', route: 'Bus 105', stop: 'Harajuku' },
        { time: '10:30 AM', route: 'Bus 105', stop: 'Akihabara' },
        { time: '11:00 AM', route: 'Bus 105', stop: 'Kagurazaka' },
        { time: '11:30 AM', route: 'Bus 105', stop: 'Kichijoji' },
    ];
});
