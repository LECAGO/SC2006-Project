
Start-Job -Scriptblock {Set-Location $using:PWD;npm start}
Start-Job -Scriptblock {Set-Location $using:PWD;

do{
    $token=(Invoke-WebRequest -Method 'Get' -Uri "https://www.ura.gov.sg/uraDataService/insertNewToken.action" -Body ($body|ConvertTo-Json) -Headers @{'AccessKey' = '54053354-175e-49b0-a110-977699e79360'}).Content.Substring(43,100)
    (Invoke-WebRequest -Method 'Get' -ContentType "text/plain; charset=utf-8" -Uri "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Availability" -Body ($body|ConvertTo-Json) -Headers @{'AccessKey' = '54053354-175e-49b0-a110-977699e79360' ; 'Token' = $token}).content | Out-File "./public/uraavail.json" -Encoding utf8
    (Invoke-WebRequest -Method 'Get' -ContentType "text/plain; charset=utf-8" -Uri "https://www.ura.gov.sg/uraDataService/invokeUraDS?service=Car_Park_Details" -Body ($body|ConvertTo-Json) -Headers @{'AccessKey' = '54053354-175e-49b0-a110-977699e79360' ; 'Token' = $token}).content | Out-File "./public/uradetails.json" -Encoding utf8
    (Invoke-WebRequest -Method 'Get' -ContentType "text/plain; charset=utf-8" -Uri "http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2" -Body ($body|ConvertTo-Json) -Headers @{'AccountKey' = 'rDpiPJUZSHa+VKWIqzZLPA==' ; 'accept' = 'application/json'}).content | Out-File "./public/ltadatamall.json" -Encoding utf8


    start-sleep -Seconds 180
    Remove-Item './public/uraavail.json'
    Remove-Item './public/uradetails.json'
    Remove-Item './public/ltadatamall.json'
}while($true)
}