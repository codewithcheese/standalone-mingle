<?php

namespace App\Contracts;

interface HasMingles
{
    public function component(): string;

    public function mingleData(): array;
}
