<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Component;

class Headless extends Component
{
    public $count = 0;

    public function increment()
    {
        $this->count++;
    }

    public function render(): View
    {
        return view('livewire/count');
    }
}
