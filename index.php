<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio ? maybe</title>
    <link rel="stylesheet" href="assets/css/base.css">
</head>
<body>
    <nav>
        <ul>
            <li><a href="#" data-section="0">Blopi & Blopa</a></li>
            <li><a href="#" data-section="1">Skull & Knight</a></li>
            <li><a href="#" data-section="2">Un-Star-Ble</a></li>
        </ul>
    </nav>

    <main>
        <section class="project-section active">
            <div class="video-container">
                <video src="assets/videos/blopi-blopa.mp4" autoplay loop muted></video>
            </div>
            <button class="nav-arrow left-arrow">&larr;</button>
            <button class="nav-arrow right-arrow">&rarr;</button>
            <h2>Blopi & Blopa</h2>
            <p>Description du projet, etc.</p>
        </section>

        <section class="project-section">
            <div class="video-container">
                <video src="assets/videos/skull-knight.mp4" autoplay loop muted></video>
            </div>
            <button class="nav-arrow left-arrow">&larr;</button>
            <button class="nav-arrow right-arrow">&rarr;</button>
            <h2>Skull & Knight</h2>
            <p>Description du projet, etc.</p>
        </section>

        <section class="project-section">
            <div class="video-container">
                <video src="assets/videos/un-star-ble.mp4" autoplay loop muted></video>
            </div>
            <button class="nav-arrow left-arrow">&larr;</button>
            <button class="nav-arrow right-arrow">&rarr;</button>
        </section>
    </main>

    <script src="assets/js/script.js"></script>
</body>
</html>