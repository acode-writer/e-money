<?php


namespace App\DataPersister;


use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Agence;
use App\Service\AgenceService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

class AgenceDataPersister implements ContextAwareDataPersisterInterface
{
    private $request;
    private $agenceService;
    private $manager;

    public function __construct(RequestStack $request, AgenceService $agenceService,
        EntityManagerInterface $manager)
    {
        $this->request = $request;
        $this->agenceService = $agenceService;
        $this->manager = $manager;
    }

    public function supports($data, array $context = []): bool
    {
        return $data instanceof Agence;
    }

    public function persist($data, array $context = [])
    {
        if(isset($context["item_operation_name"]) && $context["item_operation_name"] == "block_user_agence"){
            $id = $this->request->getCurrentRequest()->query->get('id');
            if($id){
                $id = +$id;
                $result = $this->agenceService->blockAUser($id,$data);
                if ($result){
                    $this->manager->flush();
                }
            }
        }
    }

    public function remove($data, array $context = [])
    {
        $users = $data->getUsers()->getValues();
        $data->getAccount()->setStatus(true);
        foreach ($users as $user){
            $user->setStatus(true);
            $data->removeUser($user);
        }
    }
}