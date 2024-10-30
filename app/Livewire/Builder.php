<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Component;

class Builder extends Component
{
    public $apiKey = '471fb471f0be47509ae6046326bcf30a';

    public function render(): View
    {
        return view('mingle', [
            'component' => 'Builder.svelte',
        ]);
    }
}
