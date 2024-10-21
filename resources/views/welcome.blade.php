@extends('app')

@section('content')
    <nav>
        <a href="/builder" wire:navigate>Builder</a>
        <a href="/stream" wire:navigate>Stream</a>
    </nav>
    <div>
        <livewire:counter/>
    </div>
    <div>
        <livewire:counter/>
    </div>
    <div>
        <livewire:click/>
    </div>
    <div>
        <livewire:submit/>
    </div>
@endsection
