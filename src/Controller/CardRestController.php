<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class CardRestController extends AbstractController
{
    /**
     * @Route("/card/rest", name="card_rest")
     */
    public function index()
    {
        return $this->render('card_rest/index.html.twig', [
            'controller_name' => 'CardRestController',
        ]);
    }
}
