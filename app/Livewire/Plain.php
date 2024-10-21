<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Component;

class Plain extends Component
{
    public $counter = 0;

    public function increment()
    {
        $this->counter++;
    }

    public function render(): View
    {
        return view('mingle', [
            'component' => 'Plain.svelte',
        ]);
    }
}
