$(document).ready(function() {
    // Function to handle SFTP connection
    $("#credentialsForm").submit(function(event) {
        event.preventDefault();

        const username = $("#username").val();
        const password = $("#password").val();

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        // Hide credentials form
        $("#credentialsForm").hide();

        // Show file upload form, download button, and file list
        $("#uploadForm").show();
        $("#downloadBtn").show();
        $("#fileList").show();

        // Function to fetch list of files from SFTP server
        function fetchFileList() {
            $.ajax({
                url: `sftp://${sftpHost}:${sftpPort}/`,
                type: 'GET',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(`${username}:${password}`));
                },
                success: function(response) {
                    const fileList = response.split('\n');
                    const filesElement = $("#files");
                    filesElement.empty();
                    fileList.forEach(function(file) {
                        if (file.trim() !== '') {
                            filesElement.append(`<li>${file}</li>`);
                        }
                    });
                },
                error: function(xhr, status, error) {
                    alert("Error fetching file list: " + error);
                }
            });
        }

        // Fetch file list on page load
        fetchFileList();

        // Periodically update file list every 10 seconds
        setInterval(fetchFileList, 10000);
    });

    // Function to upload file to SFTP server
    $("#uploadForm").submit(function(event) {
        event.preventDefault();
        // File upload logic here
    });

    // Function to download sample file from SFTP server
    $("#downloadBtn").click(function() {
        // File download logic here
    });
});
