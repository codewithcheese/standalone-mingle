<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Livewire\Mechanisms\HandleComponents\ComponentContext;
use Livewire\Drawer\Utils;
use Livewire\Mechanisms\HandleComponents\HandleComponents;
use function Livewire\trigger;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::match(['get', 'post'], '/mount', function (Request $request) {

    $name = 'BladeClick';
    $data = $request->json()->all();
    if (isset($data['params'])) {
        $params = $data['params'];
    } else {
        $params = ['count' => 0];
    }
    $key = null;
    $parent = null;


    $component = app('livewire')->new($name);
    $context = new ComponentContext($component, mounting: true);
    $context->memo['path'] = 'api/mount';
    $context->memo['method'] = "GET";
    $context->memo['children'] = [];
    $context->memo['scripts'] = [];
    $context->memo['assets'] = [];
    $context->memo['errors'] = [];
    $context->memo['locale'] = "en";
    $snapshot = app(HandleComponents::class)->snapshot($component, $context);
    return ['component' => $component, 'snapshot' => $snapshot];
});

