<?php

namespace App\Livewire;

use App\Concerns\InteractsWithMingles;
use App\Contracts\HasMingles;
use Livewire\Component;

class Counter extends Component implements HasMingles
{
    use InteractsWithMingles;

    public $count = 1;
    public $message = 'Message in a bottle 🍾';

    public function component(): string
    {
        return 'resources/js/counter/index.js';
    }

    public function doubleIt()
    {
        $this->message = 'Doubled it!';
        $this->count = $this->count * 2;
        return $this->count;
    }
}
