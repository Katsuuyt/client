document.getElementById('uploadButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const confirmation = document.getElementById('confirmation');
    const fileInfo = document.getElementById('fileInfo');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        fileInfo.textContent = `Nama File: ${file.name}, Ukuran File: ${file.size} bytes`;
        confirmation.style.display = 'block';
    } else {
        alert('Silakan pilih file untuk diupload.');
    }
});

document.getElementById('confirmButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    fetch('/api/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        const result = document.getElementById('result');
        const shortLink = document.getElementById('shortLink');
        const longLink = document.getElementById('longLink');
        const fileSize = document.getElementById('fileSize');

        shortLink.textContent = data.shortLink;
        longLink.textContent = data.longLink;
        fileSize.textContent = data.size;

        confirmation.style.display = 'none';
        result.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});