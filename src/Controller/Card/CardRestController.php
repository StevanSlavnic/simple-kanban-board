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
     * @return JsonResponse
     */
    public function getCards(Request $request): JsonResponse
    {
        $repository = $this->getDoctrine()->getRepository(Card::class);

        $cards = $repository->findAll();

        return new JsonResponse(json_encode($cards));
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
     * @return JsonResponse
     */
    public function createCard(Request $request): JsonResponse
    {

        $data = json_decode(
            $request->getContent(),
            true
        );

        $form = $this->createForm(CardType::class, new Card());

        $form->submit($data);

        if (false === $form->isValid()) {
            return new JsonResponse(
                [
                    'status' => 'error',
                ]
            );
        }

        $card = $form->getData();

        $card->setStatus(Card::STATUS_REQUESTED);

        $this->entityManager->persist($card);
        $this->entityManager->flush();

        return new JsonResponse($data);

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
     * @return JsonResponse
     */
    public function editCard(Request $request, $id): JsonResponse
    {

        $card = $this->getDoctrine()->getRepository(Card::class)->find($id);

        if(!$card) {
            return new JsonResponse(
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
            return new JsonResponse(
                [
                    'status' => 'error',
                ]
            );
        }

        $this->entityManager->persist($card);
        $this->entityManager->flush();

        return new JsonResponse($data);

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
     * @return JsonResponse
     */
    public function updateCardStatus(Request $request, string $id): JsonResponse
    {
        $card = $this->getDoctrine()->getRepository(Card::class)->find($id);
        $form = $this->createForm(CardType::class, $card);
        $form->submit($card->setStatus(Card::STATUS_IN_PROGRESS), false);

//        if (false === $form->isValid()) {
//            return JsonResponse::create('No card', 400);
//        }
        $this->entityManager->persist($card);
        $this->entityManager->flush();

        return new JsonResponse($card);
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
     * @return JsonResponse
     */
    public function deleteCard($id): JsonResponse
    {
        $card = $this->getDoctrine()->getRepository(Card::class)->find($id);

        $this->entityManager->remove($card);
        $this->entityManager->flush();

        return new JsonResponse('', http_response_code(200));

    }
}
