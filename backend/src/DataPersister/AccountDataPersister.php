<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Account;
use App\Service\AccountService;
use Doctrine\ORM\EntityManagerInterface;

class AccountDataPersister implements ContextAwareDataPersisterInterface
{
    private $accountService;
    private $manager;

    public function __construct(AccountService $accountService, EntityManagerInterface $manager)
    {
        $this->accountService = $accountService;
        $this->manager = $manager;
    }

    public function supports($data, array $context = []): bool
    {
        return  $data instanceof Account;
    }

    public function persist($data, array $context = [])
    {
        if(isset($context["collection_operation_name"]) && $context["collection_operation_name"] == "create_account"){
            $data = $this->accountService->createAccount($data);
            $this->manager->persist($data);
            $this->manager->flush();
        }elseif (isset($context["item_operation_name"]) && $context["item_operation_name"] == "recharge_account"){
            $data = $this->accountService->rechargeAccount($data);
            dd($data);
        }
    }

    public function remove($data, array $context = [])
    {
        // TODO: Implement remove() method.
    }
}