<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Broadcast;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {}

    public function boot(): void
    {
        Broadcast::routes([
            'middlewaare' => ['jwt.auth.middleware']
        ]);

        require base_path ('routes/channels.php');
    }
}
