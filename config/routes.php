<?php

$app->get('/create/', function ($request, $response) {
    return $this->renderer->render($response, 'index.phtml');
});

$app->get('/read/', function($request, $response){
    return $this->renderer->render($response, 'index.phtml');
});


