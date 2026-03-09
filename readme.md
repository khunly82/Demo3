# Rappel Tableau


- Instancier un tableau
```js
const t = [];
const t2  = new Array();
```

- Instancier un tableau avec des valeurs
```js
const t = [1,2,3];
```

- Ajouter un élément dans un tableau
```js
const t = [1,2,3];
// ajouter à la fin
t.push(4); // [1,2,3,4];

// ajouter au début
t.unshift(0); // [0,1,2,3,4]; 
```

- Rétirer un/des élément(s) dans un tableau
```js
const t = [1,2,3,4,5,6];

// rétirer à la fin
t.pop(); // [1,2,3,4,5];

// rétirer au début
t.shift(); // [2,3,4,5];

// rétirer au début n'importe où 
t.splice(1 /* indice */, 2 /* nombre */); // [2,5];
```

- Copier un tableau
```js
const t = [1,2,3];
const t2 = [...t];

// copie en profondeur
const t3 = structuralClone(t);
```

- Filtrer et créer une nouvelle ref
```js
const t = ['Khun', 'Alain', 'Kevin', 'Quentin'];

const t2 = t.filter(t => t.startsWith('K')); // ['Khun', 'Kevin']
``` 

- Transformer et créer une nouvelle ref
```js
const t = ['Khun', 'Alain', 'Kevin', 'Quentin'];
const t2 = t.map(item => item.toUpperCase()); // ['KHUN', 'ALAIN', 'KEVIN', 'QUENTIN']
```

- Trier

```js
const t = ['Khun', 'Alain', 'Kevin', 'Quentin'];
t.sort((item1, item2) => item1.toLocaleCompare(item2)); // ['Alain', 'Kevin', 'Khun', 'Quentin']
```

- Trier et créer une nouvelle ref

```js
const t = [1, 42, 17, 14];
const t2 = t.toSorted((item1, item2) => item1 - item2); // [1, 14, 17, 42]
```


# Rappel Objet

- Instanciation
```js
// instanciation d'un objet vide
const myObject = {}; 

// instanciation avec des valeurs
const person = { id: 1, nom: 'LY', prenom: 'Khun' };

// objets impriqués (nested)
const product = { nom: 'Coca', price: 1.05, description: {
    fr: 'Boisson sucrée au gout de cola',
    en: 'Soft Drink with cola flavour'
} };
```

- Récupération et modification des propriétés 
```js
console.log(product.nom); // Coca;

product.nom = 'Coca Cola'; // { nom: 'Coca Cola', ... }
```

- Protection d'un objet
```js
// empéche l'ajout de nouvelles propriétés dans l'objet 
Object.seal(myObj);

// empéche toute modification de l'objet
Object.freeze(myObj);
```

- Copier un objet
*Comme pour les tableaux, les objets sont des références*
```js
// spread operator
const copy = { ...myObj };
```