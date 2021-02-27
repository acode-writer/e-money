<?php

namespace App\Controller\Admin;

use App\Entity\Account;
use App\Entity\Agence;
use App\Entity\Client;
use App\Entity\Role;
use App\Entity\Transaction;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    /**
     * @Route("/admin", name="admin_dashboard")
     */
    public function index(): Response
    {
        $routeBuilder = $this->get(AdminUrlGenerator::class);

        return $this->redirect($routeBuilder->setController(RoleCrudController::class)->generateUrl());
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Backend');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::section('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Roles', 'fas fa-list', Role::class);
        yield MenuItem::linkToCrud('Users', 'fas fa-users', User::class);
        yield MenuItem::linkToCrud('Account', 'fas fa-credit-card', Account::class);
        yield MenuItem::linkToCrud('Transactions', 'fas fa-money-check', Transaction::class);
        yield MenuItem::linkToCrud('Agences', 'fas fa-university', Agence::class);
        yield MenuItem::linkToCrud('Clients', 'fas fa-users', Client::class);
    }
}
