<?php

namespace App\Providers;

use App\Contracts\ResumeParserInterface;
use App\Services\Parsers\GeminiResumeParser;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(
            ResumeParserInterface::class,
            GeminiResumeParser::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
