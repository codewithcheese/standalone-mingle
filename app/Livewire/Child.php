<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Component;

class Child extends Component
{
    public function render(): View
    {
        return view('mingle', [
            'component' => 'Child.svelte',
            'nested' => false,
        ]);
    }
}
