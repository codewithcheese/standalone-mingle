<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Component;

class BladeClick extends Component
{
    public $count = 0;

    public function mount(int $count)
    {
        $this->count = $count;
    }

    public function increment()
    {
        $this->count++;
    }

    public function render(): string
    {
        return <<<'HTML'
            <div></div>
        HTML;
    }
}
