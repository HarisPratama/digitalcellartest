<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Digital Cellar</title>

        <style>
            * {
                margin: 0;
                padding: 0;
            }
        </style>
        @vite('resources/css/app.css')
    </head>
    <body>
        <div id="app"></div>
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        {{-- <script src="{{ mix('js/app.js') }}"></script> --}}
    </body>
</html>
