# Document conception.

## I. User Stories V1

### Visiteur

1. En tant que visiteur, je peux créer un compte afin de me connecter. ✔
2. En tant que visiteur, je peux me connecter afin d'accéder au chat. ✔

### Utilisateur

1. En tant qu'utilisateur, je peux accéder au menu de l'application afin de choisir si je veux créer une salon, rejoindre un salon, consulter les salons où je suis déjà présent ou accéder à mes informations personnelles. ✔
2. En tant qu'utilisateur, je peux créer un salon, afin de pouvoir inviter des amis dans ce dernier.
3. En tant qu'utilisateur, je peux me déconnecter de l'appli. ✔
4. En tant qu'utilisateur, je peux modifier mon pseudonyme et mon mot de passe. ✔
5. En tant qu'utilisateur, je peux accéder à la page d'oublie de mot de passe, afin de m'envoyer un mail d'oublie de mot de passe.
6. En tant qu'utilisateur, je peux accéder au menu des salons que j'ai rejoins, afin de choisir celui que je veux rejoindre.

### Utilisateur de salon

1. En tant qu'utilisateur de salon, je peux envoyer des messages dans un salon afin de discuter avec les personnes présentes.
2. En tant qu'utilisateur de salon, je peux quitter le salon afin de revenir au menu.
3. En tant qu'utilisateur de salon, je peux me déconnecter du salon définitivement.
4. En tant qu'utilisateur de salon, je peux envoyer des émoticones.
5. En tant qu'utilisateur de salon, je peux consulter les règles de comportement (charte) des salons.

### Créateur de salon

1. En tant que créateur de salon, je peux modérer le chat afin de supprimer les messages qui ne respectent pas la charte.
2. En tant que créateur de salon, je peux donner des droits de modérateurs à d'autres utilisateurs.
3. En tant que créateur de salon, je peux supprimer mon salon.

### Modérateur de salon

1. En tant que modérateur de salon, je peux modérer le chat afin de supprimer les messages qui ne respectent pas la charte.

## II. Technologies

Front-end => React.js / Sass.
Back-end => Socket.io / Node.js.

## III. Todo List


|Todo|In progress|Done
| ------|-----|-----|
|Création de compte|✔|✔|
|Connexion à son compte|✔|✔|
|Message de succès lors de la création de compte|✔|✔|
|Message d'erreur lors de l'inscription (ex: erreur sur un champs)|✔|✔|
|Message d'erreur qui s'affiche sur une petite popup pour la connexion / inscription|✔|✔|
|Amélioration de la validation des champs lors de la création de compte|✔||
|Page mon compte|✔||
|Dashboard|✔|✔|
|Page 404|✔|✔|
|Création d'un salon|✔|✔|
|Rejoindre un salon|✔|✔|
|Envoie de message|✔|✔|
|Page de Chat|✔||
|Page d'accueil|✔||


