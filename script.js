document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const movieInput = document.getElementById('movieInput');
    const resultCard = document.getElementById('resultCard');
    const loading = document.getElementById('loading');
    const errorMsg = document.getElementById('error');
    const movieTitle = document.getElementById('movieTitle');
    const movieRating = document.getElementById('movieRating');
    const circle = document.querySelector('.circle');

    const genres = ["Action • Thriller", "Drama • Romance", "Sci-Fi • Adventure", "Comedy • Family", "Horror • Mystery"];

    searchBtn.addEventListener('click', fetchRating);
    movieInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchRating();
    });

    function fetchRating() {
        const title = movieInput.value.trim();
        if (!title) {
            errorMsg.classList.remove('hidden');
            resultCard.classList.add('hidden');
            return;
        }

        errorMsg.classList.add('hidden');
        resultCard.classList.add('hidden');
        loading.classList.remove('hidden');

        // Simulate API call
        setTimeout(() => {
            loading.classList.add('hidden');
            
            // Generate random rating for demo purposes
            const ratingNumber = (Math.random() * 5 + 5).toFixed(1); // Rating between 5.0 and 10.0
            const percentage = (ratingNumber / 10) * 100;
            
            // Set circle color based on rating
            let color = '#10b981'; // Green for high
            if (ratingNumber < 7) color = '#f59e0b'; // Yellow for medium
            if (ratingNumber < 6) color = '#ef4444'; // Red for low
            
            circle.style.stroke = color;
            // Short delay before setting the dasharray to trigger the CSS transition
            setTimeout(() => {
                circle.setAttribute('stroke-dasharray', `${percentage}, 100`);
            }, 50);
            
            movieTitle.textContent = title;
            document.getElementById('movieGenre').textContent = genres[Math.floor(Math.random() * genres.length)];
            movieRating.textContent = ratingNumber;
            
            resultCard.classList.remove('hidden');
        }, 1200);
    }
});
