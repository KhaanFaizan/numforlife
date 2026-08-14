# One-time monorepo migration: single app -> frontend + admin + packages/shared
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

function Ensure-Dir($path) {
  if (-not (Test-Path $path)) { New-Item -ItemType Directory -Path $path -Force | Out-Null }
}

Write-Host "==> Creating directories"
Ensure-Dir "packages/shared/components/ui"
Ensure-Dir "frontend/app/api"
Ensure-Dir "frontend/components"
Ensure-Dir "frontend/public"
Ensure-Dir "admin/app/api"
Ensure-Dir "admin/components/admin"

Write-Host "==> Moving shared lib"
if (Test-Path "lib") {
  Get-ChildItem "lib" | ForEach-Object { Move-Item $_.FullName "packages/shared/lib/" -Force }
  Remove-Item "lib" -Force -Recurse -ErrorAction SilentlyContinue
}

Write-Host "==> Moving shared UI components"
if (Test-Path "components/ui") {
  Get-ChildItem "components/ui" | ForEach-Object { Move-Item $_.FullName "packages/shared/components/ui/" -Force }
  Remove-Item "components/ui" -Force -Recurse -ErrorAction SilentlyContinue
}

Write-Host "==> Moving admin components"
if (Test-Path "components/admin") {
  Get-ChildItem "components/admin" | ForEach-Object { Move-Item $_.FullName "admin/components/admin/" -Force }
  Remove-Item "components/admin" -Force -Recurse -ErrorAction SilentlyContinue
}

Write-Host "==> Moving frontend components"
if (Test-Path "components") {
  Move-Item "components" "frontend/components" -Force
}

Write-Host "==> Moving public assets"
if (Test-Path "public") {
  Get-ChildItem "public" | ForEach-Object { Move-Item $_.FullName "frontend/public/" -Force }
  Remove-Item "public" -Force -Recurse -ErrorAction SilentlyContinue
}

Write-Host "==> Moving admin app routes"
$adminAppPaths = @(
  "app/admin",
  "app/api/admin",
  "app/api/cms",
  "app/api/auth"
)
foreach ($p in $adminAppPaths) {
  if (Test-Path $p) {
    $dest = $p -replace "^app/", "admin/app/"
    Ensure-Dir (Split-Path $dest -Parent)
    Move-Item $p $dest -Force
  }
}

Write-Host "==> Moving frontend app routes"
$frontendSkip = @("admin", "api")
Get-ChildItem "app" -Directory | Where-Object { $frontendSkip -notcontains $_.Name } | ForEach-Object {
  Move-Item $_.FullName "frontend/app/$($_.Name)" -Force
}

Write-Host "==> Moving frontend API routes"
$frontendApi = @("health", "member")
foreach ($name in $frontendApi) {
  $src = "app/api/$name"
  if (Test-Path $src) {
    Ensure-Dir "frontend/app/api/$name"
    Move-Item $src "frontend/app/api/$name" -Force
  }
}

Write-Host "==> Moving root app files to frontend"
$rootAppFiles = @("layout.tsx", "template.tsx", "not-found.tsx", "globals.css", "page.tsx", "robots.ts", "sitemap.ts")
foreach ($f in $rootAppFiles) {
  $src = "app/$f"
  if (Test-Path $src) { Move-Item $src "frontend/app/$f" -Force }
}

Write-Host "==> Cleaning empty app directory"
if (Test-Path "app") {
  Remove-Item "app" -Force -Recurse -ErrorAction SilentlyContinue
}

Write-Host "==> Moving proxy to frontend"
if (Test-Path "proxy.ts") { Move-Item "proxy.ts" "frontend/proxy.ts" -Force }

Write-Host "==> Copying health route to admin"
if (Test-Path "frontend/app/api/health") {
  Ensure-Dir "admin/app/api/health"
  Copy-Item "frontend/app/api/health/route.ts" "admin/app/api/health/route.ts" -Force
}

Write-Host "==> Migration complete"
