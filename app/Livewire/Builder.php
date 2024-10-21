<?php

namespace App\Livewire;

use Livewire\Component;

class Builder extends Component
{
    public $apiKey = '471fb471f0be47509ae6046326bcf30a';

    public function render(): string
    {
        return view('mingle', [
            'component' => 'resources/js/builder',
        ]);
    }
}
