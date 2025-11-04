# Create models folder if not exists
if (!(Test-Path -Path "./models")) {
    New-Item -ItemType Directory -Path "./models"
}

# File URLs
$frontend = "https://drive.google.com/uc?export=download&id=131vtKfjjGN2zBjmRWAFUTrp7shUY04kf"
$backend  = "https://drive.google.com/uc?export=download&id=1i64T3FvZ05MV9exiCHPO7GRDlc_Pt-6V"

# Output names
$frontend_out = "./models/frontend_model.pt"
$backend_out  = "./models/backend_model.pt"

Invoke-WebRequest -Uri $frontend -OutFile $frontend_out
Invoke-WebRequest -Uri $backend -OutFile $backend_out

Write-Host "✅ Download complete! Models are saved in /models folder"
