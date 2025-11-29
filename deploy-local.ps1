$ErrorActionPreference = "Stop"

Write-Host "Building project..."
pnpm build

$dest = "D:\Portfolio\parth-12pm.github.io"

if (Test-Path $dest) {
    Write-Host "Copying files to $dest..."
    Copy-Item -Path ".\out\*" -Destination $dest -Recurse -Force
    Write-Host "Successfully deployed to $dest"
} else {
    Write-Error "Destination folder $dest does not exist. Please check the path."
}
