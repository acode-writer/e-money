<?php


namespace App\Service;


use App\Repository\TransactionRepository;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class TransactionService
{
    private $tokenStorage;
    private $validator;
    private $transactionRepository;
    public function __construct(TokenStorageInterface $tokenStorage, ValidatorInterface $validator,
        TransactionRepository $transactionRepository)
    {
        $this->tokenStorage = $tokenStorage;
        $this->validator = $validator;
        $this->transactionRepository = $transactionRepository;
    }

    public function makeDepositTransaction($data)
    {
        $amount = $data->getAmount();
        $fees = $this->calculateFees($amount);
        $stateFees = $this->calculatePerPercent($fees,40);
        $systemFees = $this->calculatePerPercent($fees,30);
        $rest = $fees - ($stateFees + $systemFees);
        $ttc = $amount + $fees;
        $depositFees = $this->calculatePerPercent($rest,10);
        $whoMakeDeposit = $this->tokenStorage->getToken()->getUser();
        $accountAmount = $data->getAccount()->getBalance();
        $data->getAccount()->setBalance($accountAmount - $ttc);
        $code = $this->genearateTransactionCode();
        $depositAt = new \DateTime();
        $data->setDeposit($whoMakeDeposit)
            ->setFees($fees)
            ->setDepositFees($depositFees)
            ->setSytemFees($systemFees)
            ->setTransfertCode($code)
            ->setDepositAt($depositAt)
            ->setStateFees($stateFees);
        $errors = $this->validator->validate($data);
        return count($errors) ? $errors : $data;
    }

    public function makeWithdrawalTransaction($data)
    {
        $transfertCode = $data->getTransfertCode();
        $transaction = $this->transactionRepository->findOneBy(["transfertCode" => $transfertCode]);
        if ($transaction){
            $fees = $transaction->getFees();
            $stateFees = $transaction->getStateFees();
            $systemFees = $transaction->getSytemFees();
            $rest = $fees - ($stateFees + $systemFees);
            $withdrawalFees = $this->calculatePerPercent($rest,20);
            $withdrawal = $this->tokenStorage->getToken()->getUser();
            $accountBalance = $transaction->getAccount()->getBalance();
            $amount = $transaction->getAmount();
            $data->setWithdrawal($withdrawal)
                ->setWithdrawalFees($withdrawalFees)
                ->setWithdrewAt(new \DateTime())
                ->setAmount(0)
                ->getAccount()->setBalance($accountBalance + $amount);
            $errors = $this->validator->validate($data);
            return count($errors) ? $errors : $data;
        }
    }

    public function genearateTransactionCode()
    {
        $code = "".random_int(100000000,999999999);
        $code = str_split($code,3);
        $code = implode('-',$code);
        return $code;
    }

    public function calculateFees($price)
    {
        $fees = 0;
        switch ($price){
            case $price >= 0 && $price <= 5000:
                $fees = 425;
                break;
            case $price > 5000 && $price <= 10000:
                $fees = 850;
                break;
            case $price > 10000 && $price <= 15000:
                $fees = 1250;
                break;
            case $price > 15000 && $price <= 20000:
                $fees = 1695;
                break;
            case $price > 20000 && $price <= 50000:
                $fees = 2500;
                break;
            case $price > 50000 && $price <= 60000:
                $fees = 3000;
                break;
            case $price > 60000 && $price <= 75000:
                $fees = 4000;
                break;
            case $price > 75000 && $price <= 120000:
                $fees = 5000;
                break;
            case $price > 120000 && $price <= 150000:
                $fees = 6000;
                break;
            case $price > 150000 && $price <= 200000:
                $fees = 7000;
                break;
            case $price > 200000 && $price <= 250000:
                $fees = 8000;
                break;
            case $price > 250000 && $price <= 300000:
                $fees = 9000;
                break;
            case $price > 300000 && $price <= 400000:
                $fees = 12000;
                break;
            case $price > 400000 && $price <= 750000:
                $fees = 15000;
                break;
            case $price > 750000 && $price <= 900000:
                $fees = 22000;
                break;
            case $price > 900000 && $price <= 1000000:
                $fees = 25000;
                break;
            case $price > 1000000 && $price <= 1125000:
                $fees = 27000;
                break;
            case $price > 1125000 && $price <= 1400000:
                $fees = 30000;
                break;
            case $price > 1400000 && $price <= 2000000:
                $fees = 35000;
                break;
            case $price > 2000000 :
                $fees = $price * 0.02;
                break;
        }
        return $fees;
    }

    public function calculatePerPercent($fees,$percent)
    {
        return ($fees * $percent) / 100;
    }

}