FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
    bash curl git unzip \
    libzip-dev oniguruma-dev postgresql-dev icu-dev \
    linux-headers supervisor \
    autoconf g++ make

RUN docker-php-ext-install \
    pdo_mysql pdo_pgsql mbstring zip bcmath intl \
    opcache pcntl posix

RUN pecl install redis \
    && docker-php-ext-enable redis

WORKDIR /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_MEMORY_LIMIT=-1

COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --prefer-dist --no-interaction

COPY . .

RUN composer dump-autoload --optimize \
    && mkdir -p storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

COPY php.ini /usr/local/etc/php/php.ini
COPY supervisord.conf /etc/supervisord.conf

EXPOSE 9000
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]