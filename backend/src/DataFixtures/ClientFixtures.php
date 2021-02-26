<?php

namespace App\DataFixtures;

use App\Entity\Client;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class ClientFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager)
    {

        $faker = Factory::create('fr_FR');
        $row = 10;
        for ($i = 0; $i < $row; $i++){
            $client = new Client();
            $client->setPhoneNumber($faker->phoneNumber)
                ->setFullname($faker->name)
                ->setNicNumber($faker->creditCardNumber);
            $manager->persist($client);
        }
        $manager->flush();
    }

    public static function getGroups(): array
    {
        return  array(
            'creation'
        );
    }
}
