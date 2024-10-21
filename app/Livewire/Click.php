<?php

namespace App\Livewire;

use App\Concerns\InteractsWithMingles;
use App\Contracts\HasMingles;
use Livewire\Component;

class Click extends Component implements HasMingles
{
    use InteractsWithMingles;

    public $count = 0;

    public function component(): string
    {
        return 'resources/js/click';
    }

    public function increment()
    {
        $this->count++;
    }
}
