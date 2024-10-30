<?php

namespace App\Livewire;

use Illuminate\View\View;
use Livewire\Component;

class Submit extends Component
{

    public $title = 'Title';
    public $content = 'Content';

    public function save()
    {

    }

    public function render(): View
    {
        return view('mingle', [
            'component' => 'Submit.svelte',
        ]);
    }
}
