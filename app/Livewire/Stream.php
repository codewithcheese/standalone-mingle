<?php

namespace App\Livewire;

use App\Concerns\InteractsWithMingles;
use App\Contracts\HasMingles;
use Livewire\Component;

class Stream extends Component implements HasMingles
{
    use InteractsWithMingles;

    public $start = 3;

    public function begin()
    {
        $this->start = 3;
        while ($this->start >= 0) {
            // Stream the current count to the browser...
            $this->stream(
                to: 'count',
                content: $this->start,
                replace: true,
            );

            // Pause for 1 second between numbers...
            sleep(1);

            // Decrement the counter...
            $this->start = $this->start - 1;
        };
    }


    public function component(): string
    {
        return 'resources/js/stream';
    }
}
