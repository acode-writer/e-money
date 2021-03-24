<?php


namespace App\DataPersister;
use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Transaction;
use App\Service\TransactionService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Mercure\PublisherInterface;
use Symfony\Component\Mercure\Update;


class TransactionDataPersister implements ContextAwareDataPersisterInterface
{
    private $manager;
    private $transactionService;
    private $publisher;
    public function __construct(EntityManagerInterface $manager,TransactionService $transactionService, PublisherInterface $publisher)
    {
        $this->manager = $manager;
        $this->transactionService = $transactionService;
        $this->publisher = $publisher;
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
//            $this->manager->flush();
            $accountId = $data->getAccount()->getId();
            $accountBalance = $data->getAccount()->getBalance();
//            $update = new Update(
//                "make-withdrawal/accounts/".$accountId,
//                 json_encode([
//                    'balance' => $accountBalance,
//                    'latestUpdate' => new \DateTime()
//                 ])
//            );
//
//            dd($this->publisher($update));
        }
        return $data;
    }

    public function remove($data, array $context = [])
    {
        // TODO: Implement remove() method.
    }
}