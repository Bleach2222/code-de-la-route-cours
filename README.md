# Génération du fichier Markdown final pour le cours "Risques et Dangers"

content_risques_final = """# Module : Les Risques et Dangers Potentiels

## 1. Qu'est-ce qu'un risque ?
Conduire ne consiste pas seulement à déplacer un véhicule. C'est gérer en permanence un environnement incertain.
Un risque est la rencontre entre un danger potentiel (ex: un virage, la pluie) et votre comportement (ex: vitesse inadaptée).

> **L'objectif du conducteur :** Anticiper pour ne jamais se laisser surprendre.

---

## 2. Le Risque lié à la Vitesse

La vitesse est le facteur de risque numéro 1. Elle agit à deux niveaux : elle augmente le risque d'accident et aggrave ses conséquences.

![Illustration de l'effet tunnel selon la vitesse](1_effet_tunnel_vitesse.jpg)

### A. L'Effet Tunnel
Plus vous roulez vite, plus votre cerveau doit traiter d'informations. Pour compenser, il sacrifie la vision périphérique.
* **À l'arrêt :** Champ visuel de 180°.
* **À 100 km/h :** Le champ visuel se réduit à 30° (comme si vous regardiez dans un tunnel). Vous ne voyez plus les dangers venant des côtés (enfants, animaux).

### B. L'Énergie Cinétique
C'est l'énergie accumulée par le véhicule en mouvement. Si vous doublez votre vitesse, l'énergie cinétique est **multipliée par 4**. C'est cette violence qui déforme la carrosserie et blesse les occupants lors d'un choc.

---

## 3. Le Risque lié à la Météo

Les conditions atmosphériques modifient l'adhérence et la visibilité.

### A. La Pluie et l'Aquaplaning
Sur route mouillée, l'adhérence des pneus est réduite de moitié.
Le phénomène d'**aquaplaning** survient lorsqu'une couche d'eau s'insère entre le pneu et la route. Le véhicule ne touche plus le sol et devient incontrôlable (comme une luge).

![Schéma technique de l'aquaplaning](2_aquaplaning_pneu.jpg)

* **La règle :** En cas de pluie, réduisez votre vitesse et augmentez vos distances de sécurité.

### B. Le Brouillard et le Vent de Sable
En Tunisie, le vent de sable peut réduire la visibilité aussi violemment que le brouillard.
* **Comportement :** Allumez vos feux de croisement et vos feux de brouillard. Ne dépassez jamais si vous ne voyez pas loin devant vous.

---

## 4. Le Risque lié au Conducteur : La Distraction

L'ennemi principal de l'attention est le téléphone portable.

![Conducteur distrait par son téléphone](3_distraction_telephone.jpg)

### Pourquoi est-ce interdit ?
Lire un message ou décrocher un appel détourne votre regard de la route pendant plusieurs secondes.
* **À 50 km/h**, en regardant votre téléphone pendant **2 secondes**, vous parcourez **28 mètres** "à l'aveugle".
* **Sanction :** L'usage du téléphone tenu en main est une infraction punie d'une amende, car elle multiplie le risque d'accident par 3.

---

## 5. Le Risque lié aux Autres Usagers

Vous ne conduisez pas seul. L'imprévisibilité des autres est un danger constant.

### Les Angles Morts
Ce sont les zones que vous ne pouvez pas voir, ni directement, ni dans vos rétroviseurs.
Tous les véhicules en ont, mais ceux des poids lourds et des bus sont immenses.

![Schéma des angles morts autour d'une voiture](4_angles_morts_schema.jpg)

> **Règle de survie :** Ne restez jamais à la hauteur de la roue arrière d'un camion ou dans son angle mort. Si vous ne voyez pas les rétroviseurs du chauffeur, il ne vous voit pas.

---

## 6. Le Risque Mécanique : L'État du Véhicule

Un véhicule mal entretenu est une bombe à retardement.

### Les Pneumatiques
Ils sont votre seul point de contact avec la route (une surface équivalente à 4 cartes postales).

![Comparaison pneu neuf vs pneu usé](5_pneu_usure_danger.jpg)

* **Sous-gonflage :** Risque d'éclatement du pneu sur autoroute et augmentation de la consommation de carburant.
* **Usure :** Des pneus lisses ne permettent plus d'évacuer l'eau (risque d'aquaplaning immédiat) et rallongent la distance de freinage.

---

### 📝 En résumé : Les réflexes de sécurité

| Type de Risque | La solution préventive |
| :--- | :--- |
| **Vitesse** | Adapter son allure aux conditions (pas seulement aux panneaux). |
| **Pluie** | Ralentir et augmenter les distances de sécurité (x2). |
| **Distraction** | Téléphone rangé, GPS programmé avant le départ. |
| **Angles Morts** | Tourner la tête avant de changer de file (vision directe). |
| **Pneus** | Vérifier la pression une fois par mois. |

> **Le mot de la fin :** Un bon conducteur n'est pas celui qui sait rattraper un dérapage, c'est celui qui ne se met jamais dans une situation où il doit le faire.
"""

file_path_risques_final = "/mnt/data/Cours_Risques_Dangers_Tunisie_Final.md"
with open(file_path_risques_final, "w") as f:
    f.write(content_risques_final)

file_path_risques_final
