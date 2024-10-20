<?php

namespace App\Livewire;

use App\Concerns\InteractsWithMingles;
use App\Contracts\HasMingles;
use Livewire\Component;

class Counter extends Component implements HasMingles
{
    use InteractsWithMingles;

    public function component(): string
    {
        return 'resources/js/counter/index.js';
    }

    public function mingleData(): array
    {
        return [
            'message' => 'Message in a bottle 🍾',
        ];
    }

    public function doubleIt($amount)
    {
        return $amount * 2;
    }
}
