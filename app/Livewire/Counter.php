<?php

namespace App\Livewire;

use Livewire\Component;

class Counter extends Component
{

    public $count = 1;
    public $message = 'Message in a bottle 🍾';

    public function doubleIt()
    {
        $this->message = 'Doubled it!';
        $this->count = $this->count * 2;
    }

    public function render(): string
    {
        return view('mingle', [
            'component' => 'Counter.svelte',
        ]);
    }
}
