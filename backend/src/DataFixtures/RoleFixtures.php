<?php

namespace App\DataFixtures;

use App\Entity\Role;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Persistence\ObjectManager;

class RoleFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager)
    {
        $roles = ["ADMIN_AGENCE","ADMIN_SYSTEM","USER_AGENCE","CASHIER"];
        foreach ($roles as $role){
            $profil = new Role();
            $profil->setLabel($role);
            $manager->persist($profil);
            $this->addReference($role,$profil);
        }
        $manager->flush();
    }

    public static function getGroups(): array
    {
        return array(
            "creation"
        );
    }
}
