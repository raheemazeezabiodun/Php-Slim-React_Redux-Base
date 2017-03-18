<?php

$app->get('/api/v1/demo/', function ($request, $response, $args) {
    $this->logger->info("'/Get' route");
    return $response->getBody()->write(PhpSlimReactReduxModel::all()->toJson());
});

$app->post('/api/v1/demo/', function($request, $response) {
   $this->logger->info("Create '/Post' route");
   $data = $request->getParsedBody();
   $newEntry = new PhpSlimReactReduxModel();
   $newEntry->first_name = $data['first_name'];
   $newEntry->last_name = $data['last_name'];
   $newEntry->age = $data['age'];
   $newEntry->others = $data['others'];
   $newEntry->save();

   return $response->withStatus(201)->getBody()->write($newEntry->toJson());
});



