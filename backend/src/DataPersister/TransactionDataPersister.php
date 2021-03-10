<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Transaction;
use App\Service\TransactionService;
use Doctrine\ORM\EntityManagerInterface;


class TransactionDataPersister implements ContextAwareDataPersisterInterface
{
    private $manager;
    private $transactionService;
    public function __construct(EntityManagerInterface $manager,TransactionService $transactionService)
    {
        $this->manager = $manager;
        $this->transactionService = $transactionService;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Transaction;
    }

    public function persist($data, array $context = [])
    {
//        if (isset($context["collection_operation_name"]) && $context["collection_operation_name"] == "make_a_deposit" ){
//            $data = $this->transactionService->makeDepositTransaction($data);
//            $this->manager->persist($data);
//            $this->manager->flush();
//        }
       if (isset($context['item_operation_name']) && $context['item_operation_name'] == "make_withdrawal"){
            $data = $this->transactionService->makeWithdrawalTransaction($data);
            $this->manager->flush();
        }
        return $data;
    }

    public function remove($data, array $context = [])
    {
        // TODO: Implement remove() method.
    }
}