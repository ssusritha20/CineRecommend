Set-Location -Path "c:\Users\sswam\movie-recommendation-system\frontend"

Write-Host "Initializing Angular Application..."
npx -y @angular/cli@17 new movie-frontend --directory . --skip-git --routing --style css --defaults

Write-Host "Generating Core Module..."
npx -y @angular/cli@17 generate module core
npx -y @angular/cli@17 generate service core/services/movie
npx -y @angular/cli@17 generate service core/services/auth
npx -y @angular/cli@17 generate service core/services/user
npx -y @angular/cli@17 generate service core/services/recommendation
npx -y @angular/cli@17 generate guard core/guards/auth --skip-tests
npx -y @angular/cli@17 generate interceptor core/interceptors/auth --skip-tests

Write-Host "Generating Shared Module..."
npx -y @angular/cli@17 generate module shared
npx -y @angular/cli@17 generate component shared/components/navbar --skip-tests
npx -y @angular/cli@17 generate component shared/components/movie-card --skip-tests
npx -y @angular/cli@17 generate component shared/components/loader --skip-tests
npx -y @angular/cli@17 generate pipe shared/pipes/truncate --skip-tests
npx -y @angular/cli@17 generate directive shared/directives/highlight --skip-tests

Write-Host "Generating Layout..."
npx -y @angular/cli@17 generate component layout/main-layout --skip-tests

Write-Host "Generating Features Modules..."
npx -y @angular/cli@17 generate module features/movies --routing
npx -y @angular/cli@17 generate component features/movies/components/movie-list --skip-tests
npx -y @angular/cli@17 generate component features/movies/components/movie-detail --skip-tests
npx -y @angular/cli@17 generate component features/movies/components/recommendations --skip-tests
npx -y @angular/cli@17 generate component features/movies/pages/home --skip-tests
npx -y @angular/cli@17 generate component features/movies/pages/movie-page --skip-tests

Write-Host "Generating User Modules..."
npx -y @angular/cli@17 generate module features/user --routing
npx -y @angular/cli@17 generate component features/user/components/login --skip-tests
npx -y @angular/cli@17 generate component features/user/components/register --skip-tests
npx -y @angular/cli@17 generate component features/user/pages/login-page --skip-tests
npx -y @angular/cli@17 generate component features/user/pages/register-page --skip-tests

Write-Host "Scaffolding Complete!"
