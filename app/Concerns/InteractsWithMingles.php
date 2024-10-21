<?php

namespace App\Concerns;

use Illuminate\Support\Str;

trait InteractsWithMingles
{
    public function render(): mixed
    {
        return view('mingle');
    }
}
