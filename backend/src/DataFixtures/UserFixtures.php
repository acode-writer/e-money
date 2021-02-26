<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture implements FixtureGroupInterface, DependentFixtureInterface
{
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $usersReference = [];
        $faker = Factory::create('fr_FR');
        $roles = ["ADMIN_AGENCE","ADMIN_SYSTEM","USER_AGENCE","CASHIER"];
        $row = 5;
        foreach ($roles as $role){
            $usersReference[] = $this->getReference($role);
        }
        foreach ($usersReference as $item){
            for ($i = 0; $i < $row; $i++){
                $user = new User();
                $label = $item->getLabel();
                $user->setStatus(false)
                    ->setPhoneNumber($faker->phoneNumber)
                    ->setFirstname($faker->firstName)
                    ->setEmail($faker->email)
                    ->setLastname($faker->lastName)
                    ->setRoles($item->getLabel())
                    ->setPassword($this->encoder->encodePassword($user,$label))
                    ->setRole($item);
                if ( $label == "USER_AGENCE" || $label == "ADMIN_AGENCE"){
                    $agence = $this->getReference($i);
                    $user->setAgence($agence);
                }elseif ($label == "CASHIER"){
                    $account = $this->getReference('account'.$i);
                    $user->addAccount($account);
                }
                $manager->persist($user);
            }
        }
        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            RoleFixtures::class,
            AgenceFixtures::class,
        );
    }

    public static function getGroups(): array
    {
        return  array(
            'creation'
        );
    }
}
