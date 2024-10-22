# AppPowerBi

##  1 - S'inscrire sur le Microsoft Azure et récupérer tenantId(Identifiant de location) de l'organisation(entreprise)

##  2 -  Créer votre application client azure et configurer
 Authentification et approbation de l'application (spa).
   * Ajout des urls de redirection de l'application(SPA) qui doit être authenfiéé -> (Auhenfication)
   * Ajouter et approuver les autorisations aux services( Dans notre cas, on accorde les accès aux ressources(scopes) de l'application powerbi) ->(Api autorisées)
   * Créer un secret pour la configuration si nécessaire(dans notre cas pas nécessaire) ->(certificats & secrets)

## 3 - Créer votre dataset(Model) s'il n'existe pas, qui servira de créer les rapports powerbi
 * Créer votre rapport
 
# Angular
## 1 - Configuration de l'application client en Angular(spa)
##### Authentification 
Mettre à jour les clés suivantes qui se trouve dans le fichier de configuration :
     tenantId
    - redirectUri: url de redirection de l'application angular, en local (https:localhost:4200) ou url correspondant
    - clientId
   Run `npm install & ng serve`

##### Intégration powerbi pour le repport
   Mettre à jour les clés suivantes dans les composants  angular extension(ts)
    - datasetId
    - reportId
    - urlReport(ne change pas)
## NB:
  La configuration d'affichage de powerbi peut changer en fonction de type de configuration, il faut donc l'adapter à vos besoin! [Voir la documentation power bi](https://learn.microsoft.com/fr-fr/javascript/api/overview/powerbi/).
# pwb-git-action-frontend
