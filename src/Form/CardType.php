<?php

namespace App\Form;

use App\Entity\Card\Card;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CardType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', TextType::class)
            ->add('project', TextType::class)
            ->add('priority', TextType::class)
            ->add('assignee', TextType::class)
            ->add('dueDate', TextType::class, ['property_path' => 'due_date'])
            ->add('category', TextType::class)
            ->add('description', TextType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Card::class,
            'csrf_protection' => false,
        ]);
    }
}
