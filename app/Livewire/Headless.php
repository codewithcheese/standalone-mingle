<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Component;

class Headless extends Component
{
    public $count = 0;
    public $ids = [];

    public function increment()
    {
        $this->count++;
        $this->ids[] = $this->count;
    }

    public function pop()
    {
        array_pop($this->ids);
    }

    public function render(): View
    {
        return view('livewire/count', ['ids' => $this->ids]);
    }
}
