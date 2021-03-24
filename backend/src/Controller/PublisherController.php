<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;
use Symfony\Component\Routing\Annotation\Route;

class PublisherController extends AbstractController
{

    public function index(PublisherInterface $publisher): Response
    {
        $update = new Update(
            "make-withdrawal/accounts/2",
            json_encode([
                'balance' => 446000,
                'latestUpdate' => new \DateTime()
            ])
        );
        $publisher($update);
        return $this->render('publisher/index.html.twig', [
            'controller_name' => 'PublisherController',
        ]);
    }
}
