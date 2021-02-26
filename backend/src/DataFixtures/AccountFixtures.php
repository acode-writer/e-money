<?php

namespace App\DataFixtures;

use App\Entity\Account;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AccountFixtures extends Fixture implements FixtureGroupInterface, DependentFixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $row = 5;
        for ($i = 0; $i < $row; $i++){
            $account = new Account();
            $account->setStatus(false)
                ->setBalance(750000.0)
                ->setAccountNumber($faker->bankAccountNumber)
                ->setAgence($this->getReference($i));
            $manager->persist($account);
            $this->setReference('account'.$i,$account);
        }
        $manager->flush();
    }

    public function getDependencies()
    {
        return  array(
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
