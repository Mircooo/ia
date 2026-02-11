# CLAUDE.md — GARDE-FOU ABSOLU

**LIS CE FICHIER AVANT CHAQUE ACTION. PAS DE NÉGOCIATION.**

---

## LA RÈGLE D'OR

```
TU NE FAIS QUE CE QU'ON TE DEMANDE.
TU N'INVENTES RIEN.
TU NE "AMÉLIORES" RIEN.
TU NE REFACTORES RIEN.
```

Si on te demande de changer une couleur, tu changes UNE couleur. Pas deux. Pas "et j'ai aussi optimisé X".

---

## AVANT TOUTE MODIFICATION

### 1. Sync obligatoire (si repo git)
```bash
git pull origin main
```

### 2. Build check
```bash
pnpm build
```
Si ça build pas AVANT ta modif, signale-le. Ne code pas sur une base cassée.

### 3. Comprendre avant d'agir
- LIS le fichier concerné EN ENTIER
- COMPRENDS ce qu'il fait
- PUIS seulement modifie

---

## ARCHITECTURE DU PROJET

```
src/
├── app/App.tsx              ← CHEF D'ORCHESTRE (ne touche PAS sans demander)
├── components/
│   ├── features/            ← Composants métier (BootScreen, Slide...)
│   │   └── index.ts         ← Barrel export
│   ├── layout/              ← Structure (Header, Stage, Stepper...)
│   │   └── index.ts         ← Barrel export
│   └── ui/                  ← UI réutilisables (Background...)
│       └── index.ts         ← Barrel export
├── constants/               ← Valeurs centralisées
│   └── theme.ts             ← Couleurs, tailles, durées
├── data/                    ← Données statiques
│   └── sections.ts          ← Contenu des slides
├── hooks/                   ← Logique extraite
│   ├── useKeyboard.ts       ← Navigation clavier
│   └── useTimer.ts          ← Gestion du temps
├── types/                   ← Types TypeScript
├── utils/                   ← Fonctions utilitaires
│   └── audio.ts             ← Sons
└── main.tsx                 ← Point d'entrée (NE TOUCHE PAS)
```

---

## IMPORTS — UTILISE LES ALIAS

```tsx
// CORRECT
import { Header, Stage } from '@components/layout';
import { useKeyboard } from '@hooks';
import { COLORS } from '@constants';

// INTERDIT
import Header from '../../../components/layout/Header';
import { COLORS } from '../../constants/theme';
```

**Aliases disponibles :**
- `@` → src/
- `@components` → src/components/
- `@hooks` → src/hooks/
- `@constants` → src/constants/
- `@utils` → src/utils/
- `@data` → src/data/
- `@styles` → src/styles/

---

## CE QUE TU NE FAIS JAMAIS

| Action | Pourquoi c'est interdit |
|--------|------------------------|
| Ajouter des dépendances | Demande d'abord |
| Modifier App.tsx sans permission | C'est le coeur, un bug = site mort |
| Modifier main.tsx | Point d'entrée critique |
| Créer des fichiers non demandés | Bloat inutile |
| Renommer des fichiers existants | Casse les imports partout |
| "Améliorer" du code qui marche | Si c'est pas cassé, touche pas |
| Ajouter des console.log | Dev only, jamais en prod |
| Hardcoder des valeurs | Utilise @constants |
| Inventer des features | Tu n'es pas le product owner |

---

## CE QUE TU FAIS TOUJOURS

| Action | Comment |
|--------|---------|
| Vérifier que ça build | `pnpm build` après chaque modif |
| Utiliser TypeScript correctement | Pas de `any`, pas de `@ts-ignore` |
| Respecter le style existant | Copie le pattern des fichiers voisins |
| Mettre à jour les barrel exports | Si tu crées un composant, ajoute-le à index.ts |
| Garder le scope minimal | 1 demande = 1 modif chirurgicale |

---

## CRÉER UN COMPOSANT (si vraiment demandé)

```
1. Identifier le bon dossier :
   - UI générique → components/ui/
   - Feature métier → components/features/
   - Structure/layout → components/layout/

2. Créer : NomComposant.tsx (PascalCase)

3. Ajouter au barrel : export { NomComposant } from './NomComposant';

4. Importer via alias : import { NomComposant } from '@components/ui';
```

---

## STACK TECHNIQUE

- **React 19** (hooks only, pas de classes)
- **TypeScript** (strict mode)
- **Vite 7** (build tool)
- **Tailwind CSS 3** (utility-first)
- **Lucide React** (icônes)
- **pnpm** (package manager)

---

## CONVENTIONS

### Nommage
- **Composants** : PascalCase (`Header.tsx`, `BootScreen.tsx`)
- **Hooks** : camelCase + "use" (`useKeyboard.ts`, `useTimer.ts`)
- **Utils** : camelCase (`audio.ts`)
- **Constants** : SCREAMING_SNAKE (`COLORS`, `DURATIONS`)
- **Types** : PascalCase (`Section`, `SlideContent`)

### Fichiers
- 1 composant = 1 fichier
- Pas de fichiers > 300 lignes (découpe si besoin)
- Exports nommés uniquement (pas de `export default`)

---

## CHECKLIST AVANT COMMIT

```
[ ] J'ai UNIQUEMENT modifié ce qui était demandé
[ ] Je n'ai RIEN inventé ni "amélioré"
[ ] pnpm build passe sans erreur
[ ] Pas de any ni @ts-ignore
[ ] Imports via aliases (@components, @hooks...)
[ ] Barrel exports mis à jour si nouveau fichier
[ ] Pas de console.log
[ ] Pas de valeurs hardcodées
```

---

## SI TU DOUTES

```
DEMANDE.

"Je vais modifier X pour faire Y, ça te va ?"

C'est 10x mieux que de faire une connerie
et de devoir rollback.
```

---

## RAPPEL FINAL

Tu es un **chirurgien**, pas un **bulldozer**.

Précision > Vitesse
Demander > Deviner
Minimal > Maximal
Existant > Nouveau

**Un site qui marche > Un site "amélioré" qui crash.**

---

*Version: 1.0 | Projet: conf-ia | Stack: React 19 + TS + Vite 7 + Tailwind 3*
