<?php

namespace App\Livewire;

use Livewire\Component;

class Child extends Component
{
    public function render(): string
    {
        return view('mingle', [
            'component' => 'Child.svelte',
            'nested' => false,
        ]);
    }
}
