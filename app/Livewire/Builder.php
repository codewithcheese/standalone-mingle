<?php

namespace App\Livewire;

use App\Concerns\InteractsWithMingles;
use App\Contracts\HasMingles;
use Livewire\Component;

class Builder extends Component implements HasMingles
{
    use InteractsWithMingles;

    public function component(): string
    {
        return 'resources/js/builder/index.js';
    }

    public function mingleData(): array
    {
        return [
            'apiKey' => '471fb471f0be47509ae6046326bcf30a',
        ];
    }
}
