<?php


namespace App\Token;


use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTUpdateListener
{
    public function onJWTUpdate(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
        $data = $event->getData();
        $data['id'] = $user->getId();
        $data['phone'] = $user->getPhoneNumber();
        $event->setData($data);
    }
}