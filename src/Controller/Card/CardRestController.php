<?php

namespace App\Controller\Card;

use App\Entity\Card\Card;
use App\Form\CardType;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\View\View;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Swagger\Annotations as SWG;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\ApiDoc;

class CardRestController extends AbstractController
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager
    ) {
        $this->entityManager = $entityManager;
    }


    /**
     *  List all cards.
     * @Route("/cards", methods={"GET"})
     * @SWG\Get(
     *     tags={"Cards"},
     *     summary="Get list of cards",
     *     produces={"application/json"},
     *     @SWG\Response(
     *          response=201,
     *          description="Success",
     *          @SWG\Schema(ref=@Model(type=Card::class))
     *      ),
     *      @SWG\Response(
     *          response=400, description="Data invalid"
     *      )
     *  )
     * @param Request $request
     *
     * @return View
     */
    public function getCards(Request $request): View
    {
        $repository = $this->getDoctrine()->getRepository(Card::class);

        $cards = $repository->findAllById();

        /** todo: Make response by status of cards */
//        $statusRequestedCards = $repository->findByStatus(Card::STATUS_REQUESTED);
//
//        $statusInProgressCards = $repository->findByStatus(Card::STATUS_IN_PROGRESS);
//
//        $statusDoneCards = $repository->findByStatus(Card::STATUS_DONE);

        return new View($cards

        /** todo: Make response by status of cards */
//        , array(
//            'statusRequested' => $statusRequestedCards,
//            'statusInProgress' => $statusInProgressCards,
//            'statusDone' => $statusDoneCards
//        )
        );
    }

    /**
     *  Create.
     * @Route("/cards", methods={"POST"})
     * @SWG\Post(
     *     tags={"Cards"},
     *     summary="Create card",
     *     produces={"application/json"},
     *      @SWG\Parameter(
     *         name="body",
     *         in="body",
     *          @Model(type=CardType::class)
     *     ),
     *     @SWG\Response(
     *          response=201,
     *          description="Success",
     *          @SWG\Schema(ref=@Model(type=Card::class))
     *      ),
     *      @SWG\Response(
     *          response=400, description="Data invalid"
     *      )
     *  )
     * @param Request $request
     *
     * @return View|JsonResponse
     */
    public function createCard(Request $request) : View
    {

        $data = json_decode(
            $request->getContent(),
            true
        );

        $form = $this->createForm(CardType::class, new Card());

        $form->submit($data);

        if (false !== $form->isValid()) {

            $card = $form->getData();

            $card->setStatus(Card::STATUS_REQUESTED);

            $this->entityManager->persist($card);
            $this->entityManager->flush();

            return new View($card);
        }

        return new View(
            [
                'status' => 'error',
            ]
        );


    }

    /**
     *  Get.
     * @Route("/cards/{id}", methods={"GET"})
     * @SWG\Get(
     *     tags={"Cards"},
     *     summary="Get single card",
     *     produces={"application/json"},
     *     @SWG\Response(
     *          response=200,
     *          description="Success",
     *          @SWG\Schema(ref=@Model(type=Card::class))
     *      ),
     *      @SWG\Response(
     *          response=404, description="Data invalid"
     *      )
     *  )
     * @param $id
     *
     * @return View
     */
    public function getCard($id): View
    {
        $card = $this->getDoctrine()->getRepository(Card::class)->find($id);


        return new View($card, http_response_code(200));

    }

    /**
     *  Edit.
     * @Route("/cards/{id}", methods={"PUT"})
     * @SWG\Put(
     *     tags={"Cards"},
     *     summary="Edit card",
     *     produces={"application/json"},
     *      @SWG\Parameter(
     *          parameter="id",
     *          name="Card",
     *          in="body",
     *          description="Card",
     *          type="string",
     *          @Model(type=CardType::class)
     *     ),
     *     @SWG\Response(
     *          response=201,
     *          description="Success",
     *          @SWG\Schema(ref=@Model(type=Card::class))
     *      ),
     *      @SWG\Response(
     *          response=400, description="Data invalid"
     *      )
     *  )
     * @param $id
     * @param Request $request
     *
     * @return View|JsonResponse
     */
    public function editCard(Request $request, $id): View
    {

        $card = $this->getDoctrine()->getRepository(Card::class)->find($id);

        if(!$card) {
            return new View(
                [
                    'status' => 'error',
                ]
            );
        }

        $data = json_decode(
            $request->getContent(),
            true
        );

        $form = $this->createForm(CardType::class, $card);

        $form->submit($data);

        if (false === $form->isValid()) {
            return new View(
                [
                    'status' => 'error',
                ]
            );
        }

        $this->entityManager->persist($card);
        $this->entityManager->flush();

        return new View($card);

    }

    /**
     *  Patch.
     * @Route("/cards/{id}", methods={"PATCH"})
     * @SWG\Patch(
     *     tags={"Cards"},
     *     summary="Update status of card",
     *     produces={"application/json"},
     *     @SWG\Response(
     *          response=204,
     *          description="Success"
     *      ),
     *      @SWG\Response(
     *          response=400, description="Data invalid"
     *      )
     *  )
     * @param $id
     * @param Request $request
     *
     * @return View|JsonResponse
     */
    public function updateCardStatus(Request $request, string $id)
    {
        $card = $this->getDoctrine()->getRepository(Card::class)->find($id);

        $statusRequested = $request->request->get('status');

        $form = $this->createForm(CardType::class, $card);

        if($statusRequested === '0') {
            $form->submit($card->setStatus(Card::STATUS_REQUESTED));
        }

        if ($statusRequested === '1') {
            $form->submit($card->setStatus(Card::STATUS_IN_PROGRESS));
        }

        if ($statusRequested === '2') {
            $form->submit($card->setStatus(Card::STATUS_DONE));
        }

        $this->entityManager->persist($card);
        $this->entityManager->flush();



        return new View($card);


    }

    /**
     *  Delete.
     * @Route("/cards/{id}", methods={"DELETE"})
     * @SWG\Delete(
     *     tags={"Cards"},
     *     summary="Delete card",
     *     produces={"application/json"},
     *     @SWG\Response(
     *          response=201,
     *          description="Success",
     *          @SWG\Schema(ref=@Model(type=Card::class))
     *      ),
     *      @SWG\Response(
     *          response=400, description="Data invalid"
     *      )
     *  )
     * @param $id
     *
     * @return View
     */
    public function deleteCard($id): View
    {
        $card = $this->getDoctrine()->getRepository(Card::class)->find($id);

        $this->entityManager->remove($card);
        $this->entityManager->flush();

        return new View('Card deleted', http_response_code(200));

    }
}
