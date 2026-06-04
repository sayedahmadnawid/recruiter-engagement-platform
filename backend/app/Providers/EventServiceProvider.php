<?php

namespace App\Providers;

use App\Events\RecruiterSentMessage;
use App\Listeners\LogRecruiterMessageEvent;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{

    protected $listen = [
        RecruiterSentMessage::class => [
            LogRecruiterMessageEvent::class,
        ],
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
