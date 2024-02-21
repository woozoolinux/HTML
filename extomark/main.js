document.getElementById('upload').addEventListener('change', function(e) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, {type: 'array'});

        // 예시는 첫 번째 시트를 기준으로 합니다.
        var firstSheetName = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[firstSheetName];

        // SheetJS로부터 얻은 데이터를 Markdown 형식으로 변환
        var markdown = XLSX.utils.sheet_to_json(worksheet, {header:1})
            .map(row => row.join(" | "))
            .join("\n");

        document.getElementById('output').textContent = markdown;
    };
    reader.readAsArrayBuffer(e.target.files[0]);
});

