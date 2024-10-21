<?php

namespace App\Livewire;

use Livewire\Component;

class Submit extends Component
{

    public $title = 'Title';
    public $content = 'Content';

    public function save()
    {

    }

    public function render(): string
    {
        return view('mingle', [
            'component' => 'Submit.svelte',
        ]);
    }
}
