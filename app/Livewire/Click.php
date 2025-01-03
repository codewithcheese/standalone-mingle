<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Component;

class Click extends Component
{

    public $count = 0;

    public function increment()
    {
        $this->count++;
    }

    public function render(): View
    {
        return view('mingle', [
            'component' => 'Click.svelte',
        ]);
    }
}
