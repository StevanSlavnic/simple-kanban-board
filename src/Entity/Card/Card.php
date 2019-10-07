<?php

namespace App\Entity\Card;

//use ApiPlatform\Core\Annotation\ApiResource;
use App\Entity\Traits\TimestampableEntity;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;

/**
 * @JMS\ExclusionPolicy("all")
 * @ORM\Table(name="card")
 * @ORM\Entity(repositoryClass="App\Repository\CardRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Card
{

    public const STATUS_REQUESTED = 0;
    public const STATUS_IN_PROGRESS = 1;
    public const STATUS_DONE = 2;

    /**
     * Timestampable behavior
     */
    use TimestampableEntity;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @JMS\Expose()
     */
    private $id;

    /**
     * @JMS\Expose()
     * @ORM\Column(type="string", length=255)
     */
    private $title;

    /**
     * @JMS\Expose()
     * @ORM\Column(type="string", length=255)
     */
    private $project;

    /**
     * @JMS\Expose()
     * @ORM\Column(type="string", length=255)
     */
    private $priority;

    /**
     * @JMS\Expose()
     * @ORM\Column(type="string", length=255)
     */
    private $assignee;

    /**
     * @JMS\Expose()
     * @ORM\Column(type="string", length=255)
     */
    private $dueDate;

    /**
     * @JMS\Expose()
     * @ORM\Column(type="string", length=255)
     */
    private $category;

    /**
     * @JMS\Expose()
     * @ORM\Column(type="string", length=255)
     */
    private $description;

    /**
     * @JMS\Expose()
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getProject(): ?string
    {
        return $this->project;
    }

    public function setProject(string $project): self
    {
        $this->project = $project;

        return $this;
    }

    /**
     * @JMS\VirtualProperty()
     *
     * @JMS\Expose()
     *
     */
    public function getProjectName(): ?string
    {
        $json = file_get_contents('../frontend/src/shared/json/projects.json');
        $projects = json_decode($json);
        foreach ($projects as $project) {
            if ($project->value == $this->getProject()) {
                return $project->label;
            }
        }

        return null;
    }

    public function getPriority(): ?string
    {
        return $this->priority;
    }

    public function setPriority(string $priority): self
    {
        $this->priority = $priority;

        return $this;
    }

    /**
     * @JMS\VirtualProperty()
     * @JMS\Expose()
     *
     */
    public function getPriorityName(): ?string
    {


        if($this->getPriority() == 'high') {
            return 'High';
        } elseif ($this->getPriority() == 'medium') {
            return 'Medium';
        } else {
            return 'Low';
        }


    }

    public function getAssignee(): ?string
    {
        return $this->assignee;
    }

    public function setAssignee(string $assignee): self
    {
        $this->assignee = $assignee;

        return $this;
    }

    /**
     * @JMS\VirtualProperty()
     * @JMS\Expose()
     *
     */
    public function getAssigneeName(): ?string
    {
        $json = file_get_contents('../frontend/src/shared/json/assignee.json');
        $assignees = json_decode($json);
        foreach ($assignees as $assignee) {
            if ($assignee->value == $this->getAssignee()) {
                return $assignee->label;
            }
        }

        return null;
    }

    public function getDueDate(): ?string
    {
        return $this->dueDate;
    }

    public function setDueDate(string $dueDate): self
    {
        $this->dueDate = $dueDate;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(string $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @JMS\VirtualProperty()
     *
     * @JMS\Expose()
     *
     */
    public function getCategoryName(): ?string
    {
        $json = file_get_contents('../frontend/src/shared/json/category.json');
        $categories = json_decode($json);
        foreach ($categories as $category) {
            if ($category->value == $this->getCategory()) {
                return $category->label;
            }
        }

        return null;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
}