<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Lara Vue</title>
		<link rel="icon" type="image/png" href="/logo.png">
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700&display=swap">

		<link rel="stylesheet" href="{{ asset('css/antd.css') }}">
    </head>
    <body class="light_theme">
        <div id="app"></div>
        <script>
            window.config = {
				'appLoading': true
            };
        </script>
        <script src="{{ asset(mix('js/app.js')) }}"></script>
    </body>
</html>
