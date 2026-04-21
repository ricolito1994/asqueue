<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('update.queue-number.{id}', function ($dept, $id) {
    return (int) $dept->id === (int) $id;
});