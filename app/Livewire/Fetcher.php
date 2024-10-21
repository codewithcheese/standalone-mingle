<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Component;

class Fetcher extends Component
{
    public $counter = 0;

    public function render(): View
    {
        return view('mingle', ['component' => 'Fetcher.svelte']);
    }
}
