<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\RecruiterSentMessage;
use App\Models\RecruiterEvent;

class LogRecruiterMessageEvent
{
    /**
     * Create the event listener.
     */
    public function __construct() {}

    /**
     * Handle the event.
     */
    public function handle(RecruiterSentMessage $event): void
    {
        RecruiterEvent::create([
            'event_type' => 'message_sent',
            'name' => $event->message->name,
            'email' => $event->message->email,
            'metadata' => [
                'message_id' => $event->message->id,
            ],
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}
