<?php


namespace App\Service;




use App\Entity\Agence;
use App\Repository\UserRepository;

class AgenceService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function blockAUser(int $userId,Agence $agence)
    {
        $user = $this->userRepository->findOneBy(["id" => $userId]);
        if($agence->getUsers()->contains($user)){
            $user->setStatus(true);
            return $user;
        }
        return false;
    }
}