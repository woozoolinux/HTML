var originalFile = null;

function encode() {
  var fileInput = document.getElementById('fileInput');
  var file = fileInput.files[0];
  if (file) {
    originalFile = file;
    var reader = new FileReader();
    reader.onload = function(event) {
      var encodedText = btoa(event.target.result);
      document.getElementById('outputText').value = encodedText;
    };
    reader.readAsBinaryString(file);
  } else {
    alert('Please select a file.');
  }
}

function reset() {
  document.getElementById('fileInput').value = '';
  document.getElementById('outputText').value = '';
  originalFile = null;
}

function copyToClipboard() {
  var outputText = document.getElementById('outputText');
  outputText.select();
  document.execCommand('copy');
  alert('Encoded text copied to clipboard!');
}
