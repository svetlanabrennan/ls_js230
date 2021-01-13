const linkedOptions = {
  classifications: {
    Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
    'Warm-blooded': ['Bear', 'Whale', 'Ostrich'],
    'Cold-blooded': ['Salmon', 'Turtle'],
    Mammal: ['Bear', 'Whale'],
    Bird: ['Ostrich'],
    Classifications: ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  },
  animals: {
    Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Turtle: ['Vertebrate', 'Cold-blooded'],
    Whale: ['Vertebrate', 'Warm-blooded', 'Mammal'],
    Salmon: ['Vertebrate', 'Cold-blooded'],
    Ostrich: ['Vertebrate', 'Warm-blooded', 'Bird'],
    Animals: ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird'],
  },
};

const animalClassifications = document.querySelector('#animal-classifications');
const animals = document.querySelector('#animals');
const clearFiltersBtn = document.querySelector('#clear');
let animalClassificationsValue;
let animalsValue;

function setOptions({ options }, filters) {
  options.length = 0;
  filters.forEach((value, index) => {
    options[index] = new Option(value)
  });
}

function setDefault(event) {
  event.preventDefault();
  setOptions(animalClassifications, ['Classifications', 'Vertebrate', 'Warm-blooded', 'Cold-blooded', 'Mammal', 'Bird']);
  setOptions(animals, ['Animals', 'Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich']);
}

animalClassifications.addEventListener('change', event => {
  animalClassificationsValue = animalClassifications.options[animalClassifications.selectedIndex].value
  setOptions(animals, linkedOptions['classifications'][animalClassificationsValue])
});

animals.addEventListener('change', event => {
  animalsValue = animals.options[animals.selectedIndex].value
  setOptions(animalClassifications, linkedOptions['animals'][animalsValue])
});

clearFiltersBtn.addEventListener('click', setDefault);