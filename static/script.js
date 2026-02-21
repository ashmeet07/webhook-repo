let page = 1;

async function loadEvents() {
    const feed = document.getElementById("feed");

    try {
        const res = await fetch(`/events?page=${page}`);
        const data = await res.json();

        feed.innerHTML = "";

        if (data.length === 0) {
            feed.innerHTML = `<div class="log-entry">No activity yet...</div>`;
            return;
        }

        data.forEach(event => {

            let text = "";

            if (event.action === "PUSH") {
                text = `"${event.author}" pushed to "${event.to_branch}" on ${event.timestamp}`;
            }

            else if (event.action === "PULL_REQUEST") {
                text = `"${event.author}" opened a pull request from "${event.from_branch}" to "${event.to_branch}" on ${event.timestamp}`;
            }

            else if (event.action === "MERGE") {
                text = `"${event.author}" merged branch "${event.from_branch}" into "${event.to_branch}" on ${event.timestamp}`;
            }

            feed.innerHTML += `<div class="log-entry">${text}</div>`;
        });

    } catch (err) {
        feed.innerHTML = `<div class="log-entry">Error loading events...</div>`;
    }
}

function nextPage() {
    page++;
    loadEvents();
}

function prevPage() {
    if (page > 1) {
        page--;
        loadEvents();
    }
}

loadEvents();