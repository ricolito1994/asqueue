FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    bash \
    curl \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
    linux-headers \
    supervisor \
    autoconf \
    g++ \
    make 

RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    zip \
    bcmath \
    opcache \
    pcntl \
    posix

RUN pecl install redis \
    && docker-php-ext-enable redis

WORKDIR /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./
RUN composer install --no-scripts --no-autoloader --prefer-dist --no-interaction

COPY . .

RUN composer dump-autoload --optimize

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

COPY php.ini /usr/local/etc/php/php.ini

COPY supervisord.conf /etc/supervisord.conf

EXPOSE 9000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]