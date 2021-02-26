<?php

namespace App\DataFixtures;

use App\Entity\Agence;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AgenceFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');
        $agenceItem = 5;
        for($i = 0; $i < $agenceItem; $i++){
            $agence = new Agence();
            $agence->setPhoneNumber($faker->phoneNumber)
                ->setAddress($faker->address)
                ->setLatitude($faker->latitude)
                ->setLongitude($faker->longitude);
            $manager->persist($agence);
            $this->setReference($i,$agence);
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
