###

```
php artisan serve

```

### install

```
composer create-project --prefer-dist laravel/laravel ReactBoard
copy .env.example .env
php artisan key:generate
php artisan migrate

composer require laravel/ui
php artisan ui react --auth
npm install
```