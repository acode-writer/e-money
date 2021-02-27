<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=150, nullable=true)
     */
    private $firstname;

    /**
     * @ORM\Column(type="string", length=75, nullable=true)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="boolean")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Agence::class, inversedBy="users")
     */
    private $agence;

    /**
     * @ORM\ManyToOne(targetEntity=Role::class, inversedBy="users")
     */
    private $role;

    /**
     * @ORM\OneToMany(targetEntity=Account::class, mappedBy="cashier")
     */
    private $accounts;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="deposit")
     */
    private $depositTransactions;

    /**
     * @ORM\OneToMany(targetEntity=Transaction::class, mappedBy="withdrawal")
     */
    private $withdrawalTransactions;


    public function __construct()
    {
        $this->accounts = new ArrayCollection();
        $this->transactions = new ArrayCollection();
        $this->depositTransactions = new ArrayCollection();
        $this->withdrawalTransactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        return array_unique($roles);
    }

    public function setRoles(string $roles): self
    {
        $this->roles[] = "ROLE_".$roles;
        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getAgence(): ?Agence
    {
        return $this->agence;
    }

    public function setAgence(?Agence $agence): self
    {
        $this->agence = $agence;

        return $this;
    }

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): self
    {
        $this->role = $role;

        return $this;
    }

    /**
     * @return Collection|Account[]
     */
    public function getAccounts(): Collection
    {
        return $this->accounts;
    }

    public function addAccount(Account $account): self
    {
        if (!$this->accounts->contains($account)) {
            $this->accounts[] = $account;
            $account->setCashier($this);
        }

        return $this;
    }

    public function removeAccount(Account $account): self
    {
        if ($this->accounts->removeElement($account)) {
            // set the owning side to null (unless already changed)
            if ($account->getCashier() === $this) {
                $account->setCashier(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getDepositTransactions(): Collection
    {
        return $this->depositTransactions;
    }

    public function addDepositTransaction(Transaction $depositTransaction): self
    {
        if (!$this->depositTransactions->contains($depositTransaction)) {
            $this->depositTransactions[] = $depositTransaction;
            $depositTransaction->setDeposit($this);
        }

        return $this;
    }

    public function removeDepositTransaction(Transaction $depositTransaction): self
    {
        if ($this->depositTransactions->removeElement($depositTransaction)) {
            // set the owning side to null (unless already changed)
            if ($depositTransaction->getDeposit() === $this) {
                $depositTransaction->setDeposit(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Transaction[]
     */
    public function getWithdrawalTransactions(): Collection
    {
        return $this->withdrawalTransactions;
    }

    public function addWithdrawalTransaction(Transaction $withdrawalTransaction): self
    {
        if (!$this->withdrawalTransactions->contains($withdrawalTransaction)) {
            $this->withdrawalTransactions[] = $withdrawalTransaction;
            $withdrawalTransaction->setWithdrawal($this);
        }

        return $this;
    }

    public function removeWithdrawalTransaction(Transaction $withdrawalTransaction): self
    {
        if ($this->withdrawalTransactions->removeElement($withdrawalTransaction)) {
            // set the owning side to null (unless already changed)
            if ($withdrawalTransaction->getWithdrawal() === $this) {
                $withdrawalTransaction->setWithdrawal(null);
            }
        }

        return $this;
    }


}
