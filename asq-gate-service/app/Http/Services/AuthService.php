<?php

namespace App\Http\Services;

class AuthService extends BaseService
{
    protected const ASQ_AUTH_BASE_URL = "http://nginx/api/auth";

    public function __construct (
        # insert your Dependency Injections here
    ){
        parent::construct();
    }

}