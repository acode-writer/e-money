<?php


namespace App\Controller;


use ApiPlatform\Core\Validator\ValidatorInterface;
use App\Repository\ClientRepository;
use App\Service\TransactionService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

class ClientController extends AbstractController
{
    private $manager;
    private $serializer;
    private $validator;
    public function __construct(EntityManagerInterface $manager, SerializerInterface $serializer, ValidatorInterface $validator)
    {
        $this->manager = $manager;
        $this->serializer = $serializer;
        $this->validator = $validator;
    }

    public function getClientByNic($nic,ClientRepository $clientRepository)
    {
        $client = $clientRepository->findOneBy(["nicNumber" => $nic]);
        return $this->json($client, Response::HTTP_OK);
    }

    public function makeDeposit(Request $request, TransactionService $transactionService)
    {
        $data = $request->getContent();
        dd($data);
        $transaction = $this->serializer->deserialize($data,'App\Entity\Transaction','json',["groups"=>["make_deposit:write"]]);
        $transaction = $transactionService->makeDepositTransaction($transaction);
        $errors = $this->validator->validate($transaction);
        if (!$errors){
            $this->manager->persist($transaction);
            $this->manager->flush();
            return $this->json($transaction,Response::HTTP_CREATED);
        }
        return $this->json($errors,Response::HTTP_BAD_REQUEST);
    }
}