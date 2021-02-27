<?php


namespace App\Service;


use App\Entity\Account;
use App\Repository\AccountRepository;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class AccountService
{
    private $tokenStorage;
    private $accountRepository;

    public function __construct(TokenStorageInterface $tokenStorage, AccountRepository $accountRepository)
    {
        $this->tokenStorage = $tokenStorage;
        $this->accountRepository = $accountRepository;
    }

    public function generateAccountNumber()
    {
        $min = 1000000000000000;
        $max = 9999999999999999;
        $accountNumber = "".random_int($min,$max);
        return $accountNumber;
    }

    public function createAccount(Account $data)
    {
        $accountNumber = $this->generateAccountNumber();
        $data->setStatus(false)
            ->setAccountNumber($accountNumber)
            ->setCreatedAt(new \DateTime());
        return $data;
    }

    public function rechargeAccount($data)
    {
        $accountID = $data->getId();
        $account = $this->accountRepository->findOneBy(["id" => $accountID]);
        dd($account);
        $cashier =  $this->tokenStorage->getToken()->getUser();
        $amount = $data->getBalance();
        $balance = $account->getBalance();
        $account->setCashier($cashier)
            ->setBalance($balance + $amount);
        return $account;
    }
}