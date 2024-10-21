<?php

namespace App\Livewire;

use App\Concerns\InteractsWithMingles;
use App\Contracts\HasMingles;
use Livewire\Component;

class Submit extends Component implements HasMingles
{
    use InteractsWithMingles;

    public $title = 'Title';
    public $content = 'Content';

    public function component(): string
    {
        return 'resources/js/submit';
    }

    public function save()
    {

    }
}
