document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('search-form');
    var input = document.getElementById('search-input');
    if (form && input) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var q = encodeURIComponent(input.value.trim());
            if (!q) return;
            // Redirect to a web search (you can swap to naver if preferred)
            window.location.href = 'https://search.naver.com/search.naver?query=' + q;
        });
    }
});

