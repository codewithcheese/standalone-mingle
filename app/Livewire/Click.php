<?php

namespace App\Livewire;

use Livewire\Component;

class Click extends Component
{

    public $count = 0;
    
    public function increment()
    {
        $this->count++;
    }

    public function render(): string
    {
        return view('mingle', [
            'component' => 'resources/js/click',
        ]);
    }
}
